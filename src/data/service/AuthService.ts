import Cookies from "js-cookie";
import { UserEntity } from "../entity/UserEntity";

class AuthService {
    static async login(name: string, email: string) {
        if (name === '' || email === '') throw Error("name and email are required!");
        try {
            return new UserEntity({ name: name, email: email })
        } catch (error) {
            Cookies.remove("access_token");
            throw error;
        }
    }

    static async logout() {
        window.location.href = window.location.protocol + '//' + window.location.host;
        Cookies.remove("access_token");
    }
}

export { AuthService }