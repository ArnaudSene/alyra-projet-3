"use client"

import {getContractEvents, GetProposals, readContractByFunctionName} from "@/utils"
import {useEffect, useState} from "react"
import {UnorderedList, useToast} from "@chakra-ui/react";
import {useAccount} from "wagmi";
import {Proposal} from "@/interfaces/Voter";

const ProposalEvents = () => {
    const { address, isConnected } = useAccount()
    const [success, setSuccess] = useState('')
    const toast = useToast()

    useEffect(() => {
        getProposal()
    }, [])

    // const GetProposals = async (logId: number): Promise<Proposal> => {
    //     return readContractByFunctionName<Proposal>('getOneProposal', address as `0x${string}`, logId).then(
    //         proposal => proposal
    //     ).catch(
    //         err => console.log(err.message)
    //     )
    // }

    const getProposal = () => {
        setSuccess('')

        getContractEvents().then(
            logs => {
                setSuccess("ok")
                toast({
                    title: 'Proposals list successfully retrieved.',
                    description: "",
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
                console.log("proposal logs => " + logs[0].args.proposalId)
                console.log("proposal logs length => " + logs.length)
                console.log("proposal logs last => " + logs[logs.length -1].args.proposalId)

                for(let i=0; i < logs.length; i++) {
                    GetProposals(address as `0x${string}`, i).then(
                        proposal => {
                            console.log("proposal description => " + proposal.description)
                            console.log("proposal voteCount => " + proposal.voteCount)
                        }

                    )

                    console.log("proposal logs => " +i + "  "  + logs[i].args.proposalId)
                }
            }
        ).catch(
            err => toast({
                title: 'Unable to retrieve proposals list',
                description: err.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        )

    }

    return (
        <>
            <div className="m-2 mx-auto w-3/4 p-4 mb-4 text-sm rounded h-auto bg-gradient-to-r from-indigo-100 to-indigo-200 text-gray-900 shadow-lg drop-shadow-lg border-indigo-600 border"
            >
                <div className="p-4 font-bold text-lg text-center">Proposals list</div>

            </div>
        </>

    );
}
export default ProposalEvents;