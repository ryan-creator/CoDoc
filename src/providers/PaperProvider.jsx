import React, {createContext, useState} from "react";

const paper = null;

const Provider = ({children}) => {
    const [state, dispatch] = useState(paper);
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext(paper);
export default Provider;