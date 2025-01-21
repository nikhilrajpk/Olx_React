import { useContext, createContext } from "react";


export const UserContext = createContext({
    user : {},
    handleUser : ()=>{},
    isLogged : false,
    handleIsLogged : ()=>{},
})


export const UserProvider = UserContext.Provider;

export default function useUser(){
    return useContext(UserContext)
}
