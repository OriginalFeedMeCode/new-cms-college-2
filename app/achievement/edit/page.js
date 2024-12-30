"use client";
import { useRouter } from "next/navigation";

export default function EditA() {
  const router = useRouter();
  router.push("/achievement");
}
