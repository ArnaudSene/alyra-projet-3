"use client"

import { WorkflowStatus, proposalsRegistrationStartedStatus, votingSessionStartedStatus } from "@/constants"
import { useWorkflowStatusContext } from "@/context/workflowStatus"
import { useEffect } from "react"
import { getWorkflowStatus } from "@/utils"
import { useAccount } from "wagmi"

import SendProposal from "./SendProposal"
import SendVote from "@/components/voters/SendVote"
import Event from "../Event"
import GetProposalsList from "./GetProposalsList"

const ProposalManager = ({ hasVoted }: { hasVoted?: boolean }) => {
    const { address } = useAccount()
    const { workflowStatus, setWorkflowStatus } = useWorkflowStatusContext()

    useEffect(() => {
        getWorkflowStatus(address as `0x${string}`).then(
            id => setWorkflowStatus(id)
        ).catch(err => console.log(err))
    }, [workflowStatus])

    if (WorkflowStatus[workflowStatus] === proposalsRegistrationStartedStatus) return <>
        <SendProposal />
        <Event name='ProposalRegistered'></Event>
    </>

    if (WorkflowStatus[workflowStatus] === votingSessionStartedStatus) {
        if (!hasVoted) return <>
            <SendVote />
            <Event name='Voted'></Event>
        </>

        else return <section className="m-2 mx-auto w-3/4 p-4 mb-4 text-sm rounded h-auto bg-gradient-to-r from-indigo-100 to-indigo-200 text-gray-900 shadow-lg drop-shadow-lg border-indigo-600 border">
            <GetProposalsList />
        </section>
    }
}
export default ProposalManager;