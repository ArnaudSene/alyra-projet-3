'use client'

import { WorkflowStatus, proposalsRegistrationStartedStatus, votingSessionStartedStatus } from "@/constants"
import { useWorkflowStatusContext } from "@/context/workflowStatus"
import { useEffect, useState } from "react"

import Link from "next/link"

const VoterActionMenu = () => {
    const { workflowStatus } = useWorkflowStatusContext()

    const [isProposalsRegistration, setIsProposalsRegistration] = useState(false)
    const [isVotingSession, setIsVotingSession] = useState(false)

    useEffect(() => {
        setIsProposalsRegistration(WorkflowStatus[workflowStatus] === proposalsRegistrationStartedStatus)
        setIsVotingSession(WorkflowStatus[workflowStatus] === votingSessionStartedStatus)
    }, [workflowStatus])

    return ((isProposalsRegistration || isVotingSession) &&
        <div className="flex flex-row justify-center text-lg">
            <h2 className="font-bold pr-3 text-indigo-500 underline">
                Action Available:
            </h2>

            <Link className="font-semibold hover:text-indigo-500 hover:font-bold" href="/voters">
                {isProposalsRegistration ? 'Add your proposals' : 'Vote Now'}
            </Link>
        </div>
    )
}
export default VoterActionMenu