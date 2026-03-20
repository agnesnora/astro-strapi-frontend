import { strapi } from "@strapi/client";

export const client = strapi({
  baseURL: import.meta.env.STRAPI_URL,
  auth: import.meta.env.STRAPI_API_TOKEN,
});
