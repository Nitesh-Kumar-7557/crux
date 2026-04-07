import { jwtDecode } from "jwt-decode";
import { jwtPayload } from "../_types/jwt";


export const useUser = ()=>{
    if (typeof window === "undefined") return null;
    const token = localStorage.getItem("access_token");
    if(!token) return null;

    try{
        const user = jwtDecode(token) as jwtPayload
        if (user.exp * 1000 < Date.now()) {
            localStorage.removeItem("access_token");
            return null;
        }
        return user;
    }
    catch (err){
        return null
    }
}