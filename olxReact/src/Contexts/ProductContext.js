import { createContext, useContext } from "react";

export const ProductContext = createContext({
    products : [],
    handleProducts : ()=>{},
    singleProduct : '',
    handleSingleProduct : ()=>{},
});


export const ProductProvider = ProductContext.Provider;


export default function useProduct(){
    return useContext(ProductContext)
}