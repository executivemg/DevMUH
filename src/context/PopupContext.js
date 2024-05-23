"use client"
const { useContext, useState } = require("react");
const { createContext } = require("react");


const PopupContext = createContext()

export const usePopup = () => useContext(PopupContext)

export const PopupProvider = ({ children }) => {

    const [productID, setProductID] = useState(null)
    const [price, setPrice] = useState(0)
    const [variantsDes, setVariantsdes] = useState('')

    const value = {
        productID,
        setProductID,
        price,
        setPrice,
        variantsDes,
        setVariantsdes
    }

    return (
        <PopupContext.Provider value={value}>
            {children}
        </PopupContext.Provider>
    )
}