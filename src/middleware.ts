import { NextResponse, NextRequest } from "next/server";
import { get } from "@vercel/edge-config";

export const config = {
  matcher: [
    "/((?!maintenance|api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|logo.png|sitemaps/).*)",
  ],
};

export async function middleware(req: NextRequest) {
  try {
    // Get IP and user-agent from request headers
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "";
    const userAgent = req.headers.get("user-agent") || "";

    // Block specific IPs and DataForSeoBot
    if (ip === "98.80.220.72" || ip === "44.221.67.158" || userAgent.includes("DataForSeoBot")) {
      return new NextResponse("Forbidden: Your IP or user-agent is blocked", { status: 403 });
    }

    // Existing maintenance mode check
    const isInMaintenanceMode = await get<boolean>("maintenance");

    if (isInMaintenanceMode) {
      return NextResponse.rewrite(new URL("/maintenance", req.url));
    }

    return NextResponse.next();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error message:", error.message);
    } else {
      console.error("Unknown error:", error);
    }
    // Continue to next middleware even if Edge Config fails
    return NextResponse.next();
  }
}
