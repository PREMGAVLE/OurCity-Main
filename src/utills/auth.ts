export const getAuthToken = (): string => {
    return localStorage.getItem("authToken") || "";
  };