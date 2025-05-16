import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { get } from "@vercel/edge-config";

/* export const config = {
  matcher: [
    "/((?!maintenance|_next|favicon.ico).*)",
  ],
}; */

export async function middleware(req: NextRequest) {
  try {
    const isInMaintenanceMode = await get<boolean>("maintenance");

    if (isInMaintenanceMode) {
      return NextResponse.redirect(new URL("/maintenance", req.url));
    } else return NextResponse.redirect(new URL("/maintenance", req.url));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error message:", error.message);
    } else {
      console.error("Unknown error:", error);
    }
  }
}

export const config = {
  matcher: "/portfolio:path*",
};
