import { getItem, setItem } from "expo-secure-store";
import { createContext, useState } from "react";

interface IToken {
    access_token: string,
}

interface IUserContext{
    setToken: React.Dispatch<React.SetStateAction<IToken | null | undefined>> | null;
    token: IToken | null;
}

export const UserContext = createContext<IUserContext>({
    token: null,
    setToken: null,
});


export function useUserContext(){
    const getToken = ()=>{
        const tokenString = getItem('token');
        const userToken = tokenString? JSON.parse(tokenString) : null;
        return userToken;
    }

    const [token, setToken] = useState<IToken | null | undefined>(getToken());

    const saveToken = (userToken : IToken)=>{
        setItem('token',JSON.stringify(userToken));
        setToken(userToken);
    }

    return {token, setToken: saveToken};
}