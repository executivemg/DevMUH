"use client"
import React, { createContext, useState } from "react";

const FilterContext = createContext();

const FilterContextProvider = ({ children }) => {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const providervalues = {
        mobileFiltersOpen,
        setMobileFiltersOpen,
        showSidebar,
        setShowSidebar
    }
    return (
        <FilterContext.Provider value={providervalues}>
            {children}
        </FilterContext.Provider>
    );
};

export { FilterContext, FilterContextProvider };
