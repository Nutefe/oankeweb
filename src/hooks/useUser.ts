"use client";
import { useContext } from "react";
import { AuthContext } from "@/lib/AuthContext";

export function useUser() {
  return useContext(AuthContext);
}
