import { env } from "process";

export const API_BASE_URL = "https://api.oanke.com/api";
export const API_GENERAL_BASE_URL = env.API_GENERAL_BASE_URL || "http://localhost:9093/api";
export const API_AUTH_BASE_URL = env.API_AUTH_BASE_URL || "http://localhost:9090/api/auth";
