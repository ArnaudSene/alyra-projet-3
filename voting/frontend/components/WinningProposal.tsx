"use client"

import IsConnected from "@/components/IsConnected"

import { readContractByFunctionName } from "@/utils"
import { useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Proposal } from "@/interfaces/Proposal"
import {useAccount} from "wagmi";

const WinningProposal = () => {
    const { address } = useAccount()
    const [winningProposalID, setWinningProposalID] = useState<number | null>(null)
    const [proposal, setProposal] = useState<Proposal>()
    const toast = useToast()

    const getWinningProposal = async () => {
        readContractByFunctionName<number>('winningProposalID', address as `0x${string}`).then(
            id => {
                setWinningProposalID(Number(id))

                readContractByFunctionName<Proposal>('getOneProposal', address as `0x${string}`, id).then(
                    proposal => setProposal(proposal)
                ).catch(
                    err => toast({
                        title: 'Unable getting proposal',
                        description: err.message,
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                    })
                )
            }
        ).catch(err => console.log(err.message))
    }

    useEffect(() => {
        getWinningProposal()
    }, [])

    return (winningProposalID !== null ?
        <IsConnected>
            <div className="mx-auto w-3/4 rounded h-auto bg-gradient-to-r from-indigo-900 to-indigo-600 text-indigo-100 shadow-lg p-5">
                <h2 className="font-bold text-lg text-center mb-3">Winning Proposal</h2>

                <p>Proposal id: <span className="font-semibold">{winningProposalID}</span></p>
                <p>Number of vote: <span className="font-semibold text-yellow-500">{proposal ? Number(proposal?.voteCount): 'NaN'}</span></p>
                <p>Description: {proposal?.description}</p>
            </div>
        </IsConnected>
    : <></>)
}

export default WinningProposal