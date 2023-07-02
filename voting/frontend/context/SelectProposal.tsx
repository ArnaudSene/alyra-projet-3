"use client"

import {createContext, ReactNode, useContext, useState} from "react";

interface ISelectProposalProps {
    description: string;
    id: string
    setDescription: (description: string) => void;
    setId: (id: string) => void;
}


const SelectProposalContext = createContext<ISelectProposalProps>({
    description: "",
    id: "",
    setDescription: () => "",
    setId: () => ""
})

export const SelectProposalContextProvider = ({ children }: { children: ReactNode }) => {
    const [description, setDescription] = useState("")
    const [id, setId] = useState("")

    return (

        <SelectProposalContext.Provider value={{
            description: description,
            id: id,
            setDescription: setDescription,
            setId: setId
        }}>
            {children}
        </SelectProposalContext.Provider>
    )
}

export const useSelectProposalContext = () => useContext(SelectProposalContext)
