import { createContext, useState } from "react";

export const UserContext = createContext({});

export function useUserContext(){
    const [token, setToken] = useState(true);

    return {token, setToken};
}