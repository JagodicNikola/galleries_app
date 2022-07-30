import HttpService from "./HttpService";

class AuthService extends HttpService{
    login = async (credentials) => {
        const {data} = await this.client.post("/auth/login", credentials);
        localStorage.setItem("token", data.token);
        return data;
    };

    logout = async () => {
        await this.client.post("/auth/logout");
        localStorage.removeItem("token");
    };

    register = async (userData) => {
        const {data} = await this.client.post("/auth/register", userData);
        localStorage.setItem("token", data.token);
        return data;
    };

    getActiveUser = async () => {
        const {data} = await this.client.get("/auth/me");
        return data;
    };

}

const authService = new AuthService();
export default authService;