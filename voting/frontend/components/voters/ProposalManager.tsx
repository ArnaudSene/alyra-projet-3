"use client"

import { WorkflowStatus, proposalsRegistrationStartedStatus, votingSessionStartedStatus } from "@/constants"
import { useWorkflowStatusContext } from "@/context/workflowStatus"

import SendVote from "./SendVote"
import SendProposal from "./SendProposal"
import { useEffect } from "react"
import { getWorkflowStatus } from "@/utils"
import {useAccount} from "wagmi";

const ProposalManager = () => {
    const { address } = useAccount()
    const { workflowStatus, setWorkflowStatus } = useWorkflowStatusContext()

    useEffect(() => {
        getWorkflowStatus(address as `0x${string}`).then(
            id => setWorkflowStatus(id)
        ).catch(err => console.log(err))
    }, [workflowStatus])

    if (WorkflowStatus[workflowStatus] === proposalsRegistrationStartedStatus) return <SendProposal/>
    if (WorkflowStatus[workflowStatus] === votingSessionStartedStatus) return <SendVote/>
}
export default ProposalManager;