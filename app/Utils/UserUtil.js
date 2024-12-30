import { signIn } from "next-auth/react";

export async function loginUser(email, password) {
  try {
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      return { status: false, message: data.message || "Login failed" };
    }
    const { userId, loginId, name, role } = data.data;
    await signIn("credentials", {
      userId,
      loginId,
      name,
      email,
      role,
      redirect: true,
      callbackUrl: "/dashboard",
    });
    return { status: true, message: "User signed in successfully" };
  } catch (error) {
    console.error("Error logging in user:", error);
    return { status: false, message: "Internal server error" };
  }
}
