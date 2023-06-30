"use client"

import {useEffect, useState} from "react"
import {readContractByFunctionName, writeContractByFunctionName} from "@/utils";
import {useWorkflowStatusContext} from "@/context/workflowStatus";
import VoterManager from "@/components/admin/VoterManager";
import Event from "@/components/Event";
import {useToast} from "@chakra-ui/react";
import {useAccount} from "wagmi";

const WorkflowManager = () => {
    const { address, isConnected } = useAccount()
    const [success, setSuccess] = useState('')
    const { workflowStatus, setWorkflowStatus} = useWorkflowStatusContext()
    const toast = useToast()

    const WorkflowStatus: string[] = [
        "RegisteringVoters",
        "ProposalsRegistrationStarted",
        "ProposalsRegistrationEnded",
        "VotingSessionStarted",
        "VotingSessionEnded",
        "VotesTallied"
    ]

    useEffect(() => {
        getWorkflowStatus()
    }, [success])

    const updateWorkflowStatus = (funcName: string) => {
        setSuccess('')

        writeContractByFunctionName(funcName).then(
            hash => {
                setSuccess(hash)
                toast({
                    title: 'Workflow status updated.',
                    description: `with status: ${funcName}.`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
            }
        ).catch(
            err => toast({
                title: "Unable to update the workflow status",
                description: err.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        )
    }

    const getWorkflowStatus = async () => {
        readContractByFunctionName<number>('workflowStatus', address as `0x${string}`).then(
            id => setWorkflowStatus(id)
        ).catch(
            err => console.log(err.message)
        )
    }

    return (
        <>
            <div className="mx-auto w-3/4 rounded h-auto bg-gradient-to-r from-indigo-900 to-indigo-800 text-indigo-100 shadow-lg drop-shadow-lg border-indigo-600 border">
                <div className="p-4 font-bold text-md">
                    WorkflowStatus : {WorkflowStatus[workflowStatus]}
                </div>
            </div>

            {WorkflowStatus[workflowStatus] === "RegisteringVoters" && <VoterManager /> }

            {WorkflowStatus[workflowStatus] !== "VotesTallied" &&

                <div className="mx-auto w-3/4 rounded h-auto bg-gradient-to-r from-indigo-900 to-indigo-800 text-indigo-100 shadow-lg drop-shadow-lg border-indigo-600 border">
                    <div className="p-4">

                        {WorkflowStatus[workflowStatus] === "RegisteringVoters" &&
                            <button
                                onClick={() => updateWorkflowStatus("startProposalsRegistering")}
                                className="bg-indigo-950 hover:bg-indigo-100 hover:text-gray-900 text-white font-semibold py-2 px-4 rounded-lg"
                            >Start Proposals Registering</button>
                        }

                        {WorkflowStatus[workflowStatus] === "ProposalsRegistrationStarted" &&
                            <button
                                onClick={() => updateWorkflowStatus("endProposalsRegistering")}
                                className="bg-indigo-950 hover:bg-indigo-100 hover:text-gray-900 text-white font-semibold py-2 px-4 rounded-lg"
                            >End Proposals Registering</button>
                        }

                        {WorkflowStatus[workflowStatus] === "ProposalsRegistrationEnded" &&
                            <button
                                onClick={() => updateWorkflowStatus("startVotingSession")}
                                className="bg-indigo-950 hover:bg-indigo-100 hover:text-gray-900 text-white font-semibold py-2 px-4 rounded-lg"
                            >Start voting session</button>
                        }

                        {WorkflowStatus[workflowStatus] === "VotingSessionStarted" &&
                            <button
                                onClick={() => updateWorkflowStatus("endVotingSession")}
                                className="bg-indigo-950 hover:bg-indigo-100 hover:text-gray-900 text-white font-semibold py-2 px-4 rounded-lg"
                            >End voting session</button>
                        }

                        {WorkflowStatus[workflowStatus] === "VotingSessionEnded" &&
                            <button
                                onClick={() => updateWorkflowStatus("tallyVotes")}
                                className="bg-indigo-950 hover:bg-indigo-100 hover:text-gray-900 text-white font-semibold py-2 px-4 rounded-lg"
                            >Tally votes</button>
                        }
                    </div>

                </div>
            }

            <Event name='WorkflowStatusChange'></Event>
        </>
    )
}
export default WorkflowManager