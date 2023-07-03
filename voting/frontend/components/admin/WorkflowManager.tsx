"use client"

import { useEffect, useState } from "react"
import { getWorkflowStatus, writeContractByFunctionName } from "@/utils";
import { useWorkflowStatusContext } from "@/context/workflowStatus";
import { useToast } from "@chakra-ui/react";
import { WorkflowStatus, abi, contractAddress, proposalsRegistrationEndedStatus, proposalsRegistrationStartedStatus, registeringVotersStatus, votesTalliedStatus, votingSessionEndedStatus, votingSessionStartedStatus } from "@/constants";
import { useContractEvent } from "wagmi";
import { Log } from "viem";
import Loader from "../Loader";
import { useAccount } from "wagmi";
import Event from "../Event";
import AppButton from "../AppButton";

const WorkflowManager = () => {
    const [logs, setLogs] = useState<Log[]>()
    const [loading, setLoading] = useState(true)
    const { address } = useAccount()
    const { workflowStatus, setWorkflowStatus } = useWorkflowStatusContext()
    const toast = useToast()
    const [linkDescription, setLinkDescription] = useState('')

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

        switch (WorkflowStatus[workflowStatus]) {
            case registeringVotersStatus: setLinkDescription('Start Proposal Registration')
                break
            case proposalsRegistrationStartedStatus: setLinkDescription('End Proposal Registration')
                break
            case proposalsRegistrationEndedStatus: setLinkDescription('Start Voting Session')
                break
            case votingSessionStartedStatus: setLinkDescription('End Voting Session')
                break
            case votingSessionEndedStatus: setLinkDescription('Tails Vote')
                break
        }
    }, [logs, workflowStatus])

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
            {WorkflowStatus[workflowStatus] !== votesTalliedStatus &&
                <AppButton className="flex flex-row justify-center text-lg pt-10"
                    title="Next Step:"
                    description={linkDescription}
                    onClick={() => nextWorkflowStatus()}
                />
            }
            <Event name='WorkflowStatusChange'></Event>
        </Loader >
    )
}
export default WorkflowManager