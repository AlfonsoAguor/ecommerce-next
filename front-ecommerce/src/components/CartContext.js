import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

export function CartContextProvider({children}){

    /* Si el codigo se esta ejecutando en el navegador, se asgina a ls el valor del localstorage, si no el objeto vacio */
    const ls = typeof window !== "undefined" ? window.localStorage : {};
    const [cartProduct, setCartProduct] = useState([]);

    useEffect(() => {
        if(cartProduct.length > 0){
            ls?.setItem('cart', JSON.stringify(cartProduct));
        }
    }, [cartProduct]);

    useEffect(() => {
        if (ls && ls.getItem('cart')){
            setCartProduct(JSON.parse(ls.getItem('cart')));
        }
    }, []);

    function addProduct(productId){
        setCartProduct( prev => [...prev, productId]);
    }

    function removeProduct(productId){
        setCartProduct(prev => {
            const pos = prev.indexOf(productId);
            if (pos !== -1){
                return prev.filter((value, index) => index !== pos);
            }
            return prev;
        });
    }

    function clearCart() {
        setCartProduct([]);
        ls?.removeItem("cart");
      }

    return(
        <CartContext.Provider value={{cartProduct, setCartProduct, addProduct, removeProduct, clearCart}}>
            {children}
        </CartContext.Provider>
    );
}