import fs from "fs";
import puppeteer, { type Browser } from "puppeteer";

let browserInstance: Browser | null = null;

const SYSTEM_CHROME_PATHS = [
  process.env.PUPPETEER_EXECUTABLE_PATH,
  process.env.CHROME_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium-browser",
  "/usr/bin/chromium",
].filter((value): value is string => Boolean(value));

function resolveChromeExecutable(): string | undefined {
  for (const candidate of SYSTEM_CHROME_PATHS) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }
  return undefined;
}

async function launchBrowser(): Promise<Browser> {
  const launchOptions = {
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  };

  try {
    return await puppeteer.launch(launchOptions);
  } catch (error) {
    const executablePath = resolveChromeExecutable();
    if (!executablePath) {
      throw error;
    }

    return puppeteer.launch({
      ...launchOptions,
      executablePath,
    });
  }
}

export async function getBrowser(): Promise<Browser> {
  if (browserInstance?.connected) {
    return browserInstance;
  }

  if (browserInstance) {
    try {
      await browserInstance.close();
    } catch {
      // ignore stale instance cleanup errors
    }
    browserInstance = null;
  }

  browserInstance = await launchBrowser();
  return browserInstance;
}
