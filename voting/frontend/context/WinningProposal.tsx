"use client"

import {createContext, ReactNode, useContext, useState} from "react";
import {Proposal} from "@/interfaces/Proposal";


interface IWinningProposalProps {
    proposal: Proposal;
    setProposal: (proposal: Proposal) => void;
}


const WinningProposalContext = createContext<IWinningProposalProps>({
    proposal: { description: "", voteCount: BigInt(0) },
    setProposal: () => {}
})

export const WinningProposalContextProvider = ({ children }: { children: ReactNode }) => {
    const [proposal, setProposal,] = useState<Proposal>({ description: "", voteCount: BigInt(0) })

    return (

        <WinningProposalContext.Provider value={{
            proposal: proposal,
            setProposal: setProposal,
        }}>
            {children}
        </WinningProposalContext.Provider>
    )
}

export const useWinningProposalContext = () => useContext(WinningProposalContext)
