import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { clerkMiddleware } from "@clerk/nextjs/server";

const shouldBypass =
  process.env.NODE_ENV !== "production" &&
  process.env.CLERK_BYPASS_MIDDLEWARE === "true";

const handler = clerkMiddleware();

export default function middleware(req: NextRequest, event: NextFetchEvent) {
  if (shouldBypass) {
    return NextResponse.next();
  }

  return handler(req, event);
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
