import axios from "axios";

export const apiClient = axios.create({
  // Agar browser local chal raha ho to '/api' (jo proxy se chalega), warna live Vercel backend link!
  baseURL:
    window.location.hostname === "localhost"
      ? "/api"
      : "https://backend-beta-eight-20.vercel.app/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    const message =
      err.response?.data?.error?.message || err.message || "Request failed";
    return Promise.reject({
      status: err.response?.status,
      message,
      details: err.response?.data?.error?.details,
      original: err,
    });
  },
);
