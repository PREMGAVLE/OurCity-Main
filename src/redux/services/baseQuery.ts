import { getAuthToken } from "@/utills/auth";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const baseQuery = fetchBaseQuery({
  baseUrl: "https://jsonplaceholder.typicode.com",
  prepareHeaders: (headers) => {
    const token = getAuthToken();

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    // Add custom headers
    headers.set("Content-Type", "application/json");
    headers.set("Custom-Header", "MyCustomValue");

    return headers;
  },
});