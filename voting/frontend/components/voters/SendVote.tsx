"use client"

import { writeContractByFunctionName } from "@/utils"
import { useToast } from "@chakra-ui/react";
import { votingSessionStartedStatus, WorkflowStatus } from "@/constants";
import { useWorkflowStatusContext } from "@/context/workflowStatus";
import GetProposalsList from "@/components/voters/GetProposalsList";
import { useSelectProposalContext } from "@/context/SelectProposal";

const SendVote = () => {
    const { workflowStatus } = useWorkflowStatusContext()
    const toast = useToast()
    const {description, id} = useSelectProposalContext()

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
            writeContractByFunctionName('setVote', id).then(
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

                <GetProposalsList/>

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