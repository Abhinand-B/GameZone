import axios from "axios";
import BASE_URL from "../config";

const api = axios.create({
    baseURL: `${BASE_URL}/api`,
    withCredentials: true
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    (response) => {
        return response;
    },

    async (error) => {

        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            originalRequest &&
            !originalRequest._retry &&
            !originalRequest.url?.includes("/user/refresh") &&
            !originalRequest.url?.includes("/user/login")
        ) {

            originalRequest._retry = true;

            try {

                const res = await axios.post(
                    `${BASE_URL}/api/user/refresh`,
                    {},
                    {
                        withCredentials: true
                    }
                );

                const newAccessToken = res.data.accesstoken;

                localStorage.setItem("accessToken", newAccessToken);

                originalRequest.headers.Authorization =
                    `Bearer ${newAccessToken}`;

                return api(originalRequest);

            }
            catch (refreshError) {

                localStorage.removeItem("accessToken");
                localStorage.removeItem("username");
                localStorage.removeItem("role");

                window.location.href = "/login";

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;