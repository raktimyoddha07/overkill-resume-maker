import path from "path";

export function getUploadsDir(): string {
  const envPath = process.env.UPLOADS_DIR;
  if (envPath) {
    if (path.isAbsolute(envPath)) {
      return envPath;
    }
    return path.join(process.cwd(), envPath);
  }
  return path.join(process.cwd(), "uploads");
}
