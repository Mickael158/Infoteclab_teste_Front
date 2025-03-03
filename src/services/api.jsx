import axios from "axios";

// Création d'une instance axios
const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL, // L'URL 
  headers: {
    "Content-Type": "application/json", // le format des données envoyées est du JSON
  },
});

// Ajout d'un interceptor sortantes
api.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Ajout d'un interceptor entrantes
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Vérifie si l'erreur 
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Marque la requête comme retentée

      // Récupération du token de refresh
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const response = await axios.post("/auth/refresh-token", {
            refreshToken,
          });
          const newAccessToken = response.data.accessToken;
          // Sauvegarde le nouveau token dans le localStorage
          localStorage.setItem("accessToken", newAccessToken);

          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          // En cas d'erreur lors du rafraîchissement du token, on supprime les tokens stockés
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          // Redirige l'utilisateur vers la page de login
          window.location.href = "/login";
          // Rejette la promesse avec l'erreur de rafraîchissement
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
