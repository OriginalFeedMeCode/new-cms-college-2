export { default } from "next-auth/middleware";
export const config = {
  matcher: [
    "/dashboard",
    "/users",
    "/users/add-user",
    "/approvals",
    "/achievement",
    "/achievement/add-achievement",
    "/achievement/edit",
  ],
};
