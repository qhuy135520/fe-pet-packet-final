export { auth as middleware } from "@/auth";

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|img|js|fonts|css/images|public|home|signup|verify-otp-signup|forgot-password|verify-otp-reset|reset-password|$).*)",
  ],
};
