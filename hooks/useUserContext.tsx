import { getItem, setItem } from "expo-secure-store";
import { createContext, useState } from "react";

interface IToken {
    access_token: string,
}

interface IUserContext{
    setToken: React.Dispatch<React.SetStateAction<IToken | undefined>>;
    token: IToken | undefined;
}

export const UserContext = createContext<IUserContext>({
    token: undefined,
    setToken: ()=>{},
});


export function useUserContext(){
    const getToken = ()=>{
        const tokenString = getItem('token');
        const userToken = tokenString? JSON.parse(tokenString) : undefined;
        return userToken;
    }

    const [token, setToken] = useState<IToken | undefined>(getToken());

    const saveToken = (userToken : React.SetStateAction<IToken | undefined>)=>{
        setItem('token',JSON.stringify(userToken));
        setToken(userToken);
    }

    return {token, setToken: saveToken};
}