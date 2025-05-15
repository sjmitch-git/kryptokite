import { NextRequest, NextResponse } from "next/server";
import { get } from "@vercel/edge-config";

export const config = {
  matcher: [
    /*
     * Match all pages and API routes except:
     * - The maintenance page (`/maintenance`)
     */
    "/((?!maintenance|_next|favicon.ico|sw.js).*)",
  ],
};

export async function middleware(req: NextRequest) {
  try {
    const isInMaintenanceMode = await get<boolean>("maintenance");

    if (isInMaintenanceMode) {
      const maintenanceUrl = req.nextUrl.clone();
      maintenanceUrl.pathname = "/maintenance";
      return NextResponse.rewrite(maintenanceUrl);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error message:", error.message);
    } else {
      console.error("Unknown error:", error);
    }
  }
}
