'use client'

import { WorkflowStatus, proposalsRegistrationStartedStatus, votingSessionStartedStatus } from "@/constants"
import { useWorkflowStatusContext } from "@/context/workflowStatus"
import { useEffect, useState } from "react"

import Link from "next/link"
import AppButton from "../AppButton"

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
            <Link href="/voters">
                <AppButton title="Action Available:" description={isProposalsRegistration ? 'Add your proposals' : 'Vote Now'}/>
            </Link>
        </div>
    )
}
export default VoterActionMenu