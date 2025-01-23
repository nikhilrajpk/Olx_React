import { createContext, useContext } from "react";

export const ProductContext = createContext({
    products : [],
    handleProducts : ()=>{},
    singleProduct : '',
    handleSingleProduct : ()=>{},
    filteredProducts : [],
    handleFilteredProducts : ()=>{},
    searchTerm : '',
    handleSearchTerm : ()=>{},
});


export const ProductProvider = ProductContext.Provider;


export default function useProduct(){
    return useContext(ProductContext)
}