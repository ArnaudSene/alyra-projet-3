"use client"

import { useEffect, useState } from "react"
import { getWorkflowStatus, writeContractByFunctionName } from "@/utils";
import { useWorkflowStatusContext } from "@/context/workflowStatus";
import { useToast } from "@chakra-ui/react";
import { WorkflowStatus, abi, contractAddress, proposalsRegistrationEndedStatus, proposalsRegistrationStartedStatus, registeringVotersStatus, votesTalliedStatus, votingSessionEndedStatus, votingSessionStartedStatus } from "@/constants";
import { useContractEvent } from "wagmi";
import { Log } from "viem";
import Loader from "../Loader";
import {useAccount} from "wagmi";

const WorkflowManager = () => {
    const [logs, setLogs] = useState<Log[]>()
    const [loading, setLoading] = useState(true)
    const { address } = useAccount()
    const { workflowStatus, setWorkflowStatus } = useWorkflowStatusContext()
    const toast = useToast()

    useContractEvent({
        address: contractAddress,
        abi: abi,
        eventName: 'WorkflowStatusChange',
        listener(log) {
            setLogs(log)
        }
    })

    useEffect(() => {
        getWorkflowStatus(address as `0x${string}`).then(
            id => setWorkflowStatus(id)
        ).catch(err => console.log(err))
        .finally(() => setLoading(false))
    }, [logs])

    const nextWorkflowStatus = () => {
        let funcName = '';
        switch (WorkflowStatus[workflowStatus]) {
            case registeringVotersStatus: funcName = 'startProposalsRegistering'
                break
            case proposalsRegistrationStartedStatus: funcName = 'endProposalsRegistering'
                break
            case proposalsRegistrationEndedStatus: funcName = 'startVotingSession'
                break
            case votingSessionStartedStatus: funcName = 'endVotingSession'
                break
            case votingSessionEndedStatus: funcName = 'tallyVotes'
                break
        }

        writeContractByFunctionName(funcName).then(
            hash => {
                setLoading(true)
                toast({
                    title: 'Workflow status updated.',
                    description: `Transaction: ${hash}`,
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

    return (
        <Loader isLoading={loading}>
            <div className="mt-2 mx-auto w-3/4 rounded h-auto bg-gradient-to-r from-indigo-900 to-indigo-800 text-indigo-100 shadow-lg drop-shadow-lg border-indigo-600 border">
                <div className="p-4 font-bold text-md">
                    Workflow Status : {WorkflowStatus[workflowStatus]}
                </div>
            </div>

            {WorkflowStatus[workflowStatus] !== votesTalliedStatus &&
                <div className="mt-2 p-4 mx-auto w-3/4 rounded h-auto bg-gradient-to-r from-indigo-900 to-indigo-800 text-indigo-100 shadow-lg drop-shadow-lg border-indigo-600 border ">
                    <button onClick={() => nextWorkflowStatus()} className="bg-indigo-950 hover:bg-indigo-100 hover:text-gray-900 text-white font-semibold py-2 px-4 rounded-lg">
                        Next Step: {WorkflowStatus[workflowStatus + 1]}
                    </button>
                </div>
            }

        </Loader>
    )
}
export default WorkflowManager