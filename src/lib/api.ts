export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.canpoli.dev";

export const API_BASE_HOST = API_BASE_URL.replace(/^https?:\/\//, "");

export const representativesLookupUrl = (lat: string, lng: string) =>
  `${API_BASE_URL}/v1/representatives/lookup?lat=${lat}&lng=${lng}`;
