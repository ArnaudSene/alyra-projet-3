"use client"

import { writeContractByFunctionName } from "@/utils"
import { useToast } from "@chakra-ui/react"
import { votingSessionStartedStatus, WorkflowStatus } from "@/constants"
import { useWorkflowStatusContext } from "@/context/workflowStatus"
import { useSelectProposalContext } from "@/context/SelectProposal"
import { useState } from "react"

import GetProposalsList from "@/components/voters/GetProposalsList"
import Loader from "../Loader"

const SendVote = () => {
    const { workflowStatus } = useWorkflowStatusContext()
    const { id } = useSelectProposalContext()

    const [loading, setLoading] = useState(false)
    const [hasVoted, setHasVoted] = useState(false)

    const toast = useToast()

    const submitVote = () => {
        if (id.trim().length <= 0) {
            toast({
                title: 'Invalid Vote',
                description: 'Vote can\'t be empty',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        } else {
            setLoading(true)
            setHasVoted(true)
            writeContractByFunctionName('setVote', id).then(
                () => toast({
                    title: 'Voted!',
                    description: `Your vote has been sent. Thank you.`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
            ).catch(
                err => {
                    setHasVoted(true)
                    toast({
                        title: 'Unknown error',
                        description: err.message,
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                    })
                }
            ).finally(() => setLoading(false))
        }
    }

    return (
        <Loader isLoading={loading}>
            <section className="m-2 mx-auto w-3/4 p-4 mb-4 text-sm rounded h-auto bg-gradient-to-r from-indigo-100 to-indigo-200 text-gray-900 shadow-lg drop-shadow-lg border-indigo-600 border">

                <GetProposalsList />

                {!hasVoted && WorkflowStatus[workflowStatus] === votingSessionStartedStatus &&
                    <form className="flex flex-col">
                        <div className="p-2 w-3/4 mx-auto m-1 border-t border-indigo-300 py-2">
                            <button className="w-full content-center bg-green-500 hover:bg-green-400 text-gray-900 hover:text-gray-700 font-semibold text-lg py-6 px-4 rounded-lg disabled:bg-gray-400"
                                type="button"
                                onClick={() => submitVote()}
                                disabled={id === '' || loading}
                            >
                                {id === '' ? 'Select a proposal' : 'Submit vote for the selected proposal'}
                            </button>
                        </div>
                    </form>
                }
            </section>
        </Loader>
    )
}
export default SendVote;