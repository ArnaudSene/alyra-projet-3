"use client"

import {getContractEvents, GetProposals, writeContractByFunctionName} from "@/utils"
import {useEffect, useState} from "react"
import {useToast} from "@chakra-ui/react";
import {useAccount} from "wagmi";
import {votingSessionStartedStatus, WorkflowStatus} from "@/constants";
import {useWorkflowStatusContext} from "@/context/workflowStatus";
import {useWinningProposalContext} from "@/context/WinningProposal";

const SendVote = ({ newProposal } : {newProposal?: boolean }) => {
    const { workflowStatus } = useWorkflowStatusContext()
    const {proposal, setProposal } = useWinningProposalContext()
    const { address } = useAccount()
    const toast = useToast()
    const [value, setValue] = useState('1')
    const [proposals, setProposals] = useState<string[]>([])
    const [description, setDescription] = useState("")
    const [title, setTitle] = useState("List of proposals")

    const GetProposalsList = () => {
        getContractEvents().then(events => {
            let data: string[] = []

            for (let i = 0; i < events.length; i++) {
                GetProposals(address as `0x${string}`, i)
                    .then(
                        proposal => {
                            data = [...data, proposal.description]
                        })
                    .catch(err => console.log("err => " + err))
                    .finally(() => {
                        setProposals(data)
                    })
            }
        })
    }

    useEffect(() => {
        GetProposalsList()
        if (WorkflowStatus[workflowStatus] === votingSessionStartedStatus) setTitle("Select your proposal and vote")
    }, [workflowStatus, newProposal])

    const onSelect = (index: string, description: string) => {
        setValue(index)
        setDescription(description)
    }

    const submitVote = () => {
        if (value.trim().length <= 0) {
            toast({
                title: 'Invalid Vote',
                description: 'Vote can\'t be empty',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        } else {
            writeContractByFunctionName('setVote', value).then(
                () => toast({
                    title: 'Voted!',
                    description: `Your vote has been sent. Thank you.`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
            ).catch(
                err => toast({
                    title: 'Unknown error',
                    description: err.message,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            )
        }
    }

    return (
        <>
            <section className="m-2 mx-auto w-3/4 p-4 mb-4 text-sm rounded h-auto bg-gradient-to-r from-indigo-100 to-indigo-200 text-gray-900 shadow-lg drop-shadow-lg border-indigo-600 border">
                <div className="p-4 font-bold text-xl text-center">{title}</div>


                <div className="flex flex-col">
                    {proposals.length > 0 &&
                        proposals?.map((description, index) => (
                            <div className="p-2 w-3/4 mx-auto m-1 ">

                                <button
                                    className="w-full content-center bg-indigo-950 hover:bg-indigo-400 hover:text-gray-900 text-white font-semibold rounded-lg py-6 px-4 "
                                    id={index.toString()}
                                    onClick={() => onSelect(index.toString(), description)} type="button" >
                                    {description}
                                </button>

                            </div>
                        ))}
                </div>

                {WorkflowStatus[workflowStatus] === votingSessionStartedStatus &&
                    <form className="flex flex-col">
                        <div className="p-2 w-3/4 mx-auto m-1 border-t border-indigo-300 py-2">
                            <button className="w-full content-center bg-rose-400 hover:bg-rose-500 hover:text-gray-900 text-indigo-100 font-semibold text-lg py-6 px-4 rounded-lg"
                                    type="button"
                                    onClick={() => submitVote()}
                            >Click to confirm your choice:  {description}
                            </button>
                        </div>
                    </form>
                }


            </section>
        </>
    );
}
export default SendVote;