import { registerOTel } from "@vercel/otel";

import { APP_NAME } from "./lib/constants";

export function register() {
  registerOTel(APP_NAME);
}
