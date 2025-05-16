import { NextResponse, NextRequest } from "next/server";
import { get } from "@vercel/edge-config";

export const config = {
  matcher: [
    "/((?!maintenance|api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|logo.png).*)",
  ],
};

export async function middleware(req: NextRequest) {
  try {
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
  }
}
