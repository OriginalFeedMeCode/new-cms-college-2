export { default } from "next-auth/middleware";
export const config = {
  matcher: [
    "/dashboard",
    "/users",
    "/users/:path*",
    "/approvals",
    "/approvals/:path*",
    "/achievement",
    "/achievement/:path*",
    "/news/:path*",
    "/news",
  ],
};
