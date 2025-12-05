import { Polar } from "@polar-sh/sdk";

// Use sandbox mode when POLAR_SANDBOX_MODE is 'true', otherwise use production
const isSandbox = process.env.POLAR_SANDBOX_MODE === 'true';

export const polarApi = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  server: isSandbox ? "sandbox" : "production",
});

// Log which environment we're using (helpful for debugging)
if (process.env.NODE_ENV !== "production") {
  console.log(`🔧 Polar SDK initialized in ${isSandbox ? 'SANDBOX' : 'PRODUCTION'} mode`);
}
