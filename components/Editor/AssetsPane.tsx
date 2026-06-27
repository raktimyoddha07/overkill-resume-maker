"use client";

import { useState, useEffect, useCallback } from "react";
import { Upload, Image as ImageIcon, Copy, Check, Trash2, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

type AssetItem = {
  filename: string;
  url: string;
  size: number;
};

export default function AssetsPane() {
  const [assets, setAssets] = useState<AssetItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const fetchAssets = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/upload");
      if (!res.ok) throw new Error("Failed to fetch assets");
      const data = await res.json();
      setAssets(data.assets || []);
    } catch (error) {
      console.error("Error fetching assets:", error);
      toast.error("Failed to load assets");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setIsUploading(true);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error(`Failed to upload ${file.name}`);
      }
      toast.success("Image uploaded successfully!");
      fetchAssets();
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const copyToClipboard = (text: string, key: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    toast.success(`Copied ${label} to clipboard!`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDelete = async (filename: string) => {
    try {
      const res = await fetch(`/api/upload?filename=${encodeURIComponent(filename)}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      toast.success("Asset deleted");
      fetchAssets();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete asset");
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="flex h-full min-h-0 flex-col bg-background p-4 overflow-auto">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Assets Manager</h3>
          <p className="text-xs text-muted-foreground">
            Upload images to use in your HTML (<code className="text-xs">&lt;img&gt;</code>) or CSS (<code className="text-xs">url()</code>).
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground"
          onClick={fetchAssets}
          title="Refresh assets list"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      {/* Upload Dropzone */}
      <div className="mb-6">
        <label
          htmlFor="asset-upload-input"
          className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 p-6 text-center transition hover:border-primary/50 hover:bg-muted/50 cursor-pointer"
        >
          {isUploading ? (
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
          ) : (
            <Upload className="h-8 w-8 text-muted-foreground mb-2" />
          )}
          <span className="text-xs font-semibold text-foreground">
            {isUploading ? "Uploading file..." : "Click or drag images here to upload"}
          </span>
          <span className="mt-1 text-[11px] text-muted-foreground">
            Supports PNG, JPG, SVG, WebP, GIF & more
          </span>
          <input
            id="asset-upload-input"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleFileUpload(e.target.files)}
            disabled={isUploading}
          />
        </label>
      </div>

      {/* Assets Grid */}
      <div className="flex-1 min-h-0 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">
            Uploaded Assets ({assets.length})
          </span>
        </div>

        {isLoading ? (
          <div className="flex h-32 items-center justify-center">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        ) : assets.length === 0 ? (
          <div className="flex h-32 flex-col items-center justify-center rounded-md border border-dashed text-center p-4">
            <ImageIcon className="h-6 w-6 text-muted-foreground/50 mb-2" />
            <p className="text-xs font-medium text-muted-foreground">No assets uploaded yet</p>
            <p className="text-[11px] text-muted-foreground/70 mt-0.5">
              Uploaded images will be saved in root <code className="text-xs">uploads/</code> folder.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {assets.map((asset) => {
              const htmlTag = `<img src="${asset.filename}" alt="image" />`;
              const cssUrl = `background-image: url('${asset.filename}');`;
              return (
                <Card key={asset.filename} className="overflow-hidden bg-card border-border shadow-sm">
                  <div className="relative aspect-video w-full bg-muted/40 flex items-center justify-center overflow-hidden border-b border-border">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={asset.url}
                      alt={asset.filename}
                      className="max-h-full max-w-full object-contain p-2"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-1.5 right-1.5 h-6 w-6 opacity-80 hover:opacity-100"
                      onClick={() => handleDelete(asset.filename)}
                      title="Delete asset"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  <CardContent className="p-3 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <button
                        className="text-xs font-medium text-primary hover:underline text-left break-all cursor-pointer"
                        title={asset.filename}
                        onClick={() => copyToClipboard(asset.filename, \`name-\${asset.filename}\`, "filename")}
                      >
                        {asset.filename}
                      </button>
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0 shrink-0">
                        {formatFileSize(asset.size)}
                      </Badge>
                    </div>

                    <div className="flex flex-col gap-1 pt-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-[11px] justify-between px-2 font-mono"
                        onClick={() =>
                          copyToClipboard(htmlTag, \`html-\${asset.filename}\`, "HTML <img> tag")
                        }
                      >
                        <span className="truncate">Copy HTML Tag</span>
                        {copiedKey === \`html-\${asset.filename}\` ? (
                          <Check className="h-3 w-3 text-green-500 shrink-0" />
                        ) : (
                          <Copy className="h-3 w-3 text-muted-foreground shrink-0" />
                        )}
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-[11px] justify-between px-2 font-mono"
                        onClick={() =>
                          copyToClipboard(cssUrl, \`css-\${asset.filename}\`, "CSS url()")
                        }
                      >
                        <span className="truncate">Copy CSS url()</span>
                        {copiedKey === \`css-\${asset.filename}\` ? (
                          <Check className="h-3 w-3 text-green-500 shrink-0" />
                        ) : (
                          <Copy className="h-3 w-3 text-muted-foreground shrink-0" />
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
