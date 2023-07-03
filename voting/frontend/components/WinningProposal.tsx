"use client"

import { readContractByFunctionName } from "@/utils"
import { useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Proposal } from "@/interfaces/Proposal"
import { useAccount } from "wagmi"

import IsConnected from "@/components/IsConnected"

const WinningProposal = () => {
    const { address } = useAccount()
    const [proposal, setProposal] = useState<Proposal>()

    const toast = useToast()

    const getWinningProposal = async () => {
        readContractByFunctionName<Proposal>('getWinningProposal', address as `0x${string}`).then(
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

    useEffect(() => {
        getWinningProposal()
    }, [])

    if (proposal !== undefined) return (
        <IsConnected>
            <div className="mx-auto w-1/2 mt-2 px-5 pb-5 text-center rounded-full h-auto bg-gradient-to-r from-indigo-900 to-indigo-600 text-indigo-100 shadow-lg">
                <h2 className="py-3 font-bold text-2xl border-b border-indigo-300 text-indigo-300">Winning Proposal</h2>

                <div className="pt-2 text-lg font-semibold">
                    <p>Votes count: <span className="font-semibold text-rose-300">{proposal ? Number(proposal?.voteCount) : ''}</span></p>
                    <p>Description: {proposal?.description}</p>
                </div>

            </div>
        </IsConnected>
    )
}

export default WinningProposal