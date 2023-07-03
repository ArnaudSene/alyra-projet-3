'use client'

import { WorkflowStatus, proposalsRegistrationEndedStatus, proposalsRegistrationStartedStatus, registeringVotersStatus, votesTalliedStatus, votingSessionEndedStatus, votingSessionStartedStatus } from "@/constants"
import { useWorkflowStatusContext } from "@/context/workflowStatus"
import { useEffect, useState } from "react"

import Link from "next/link"
import AppButton from "../AppButton"

const AdminActionMenu = () => {
    const { workflowStatus } = useWorkflowStatusContext()
    const [linkDescription, setLinkDescription] = useState('')

    useEffect(() => {
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
    }, [workflowStatus])

    return (WorkflowStatus[workflowStatus] !== votesTalliedStatus &&
        <div className="flex flex-row justify-center text-center text-lg pt-5">
            <Link href="/admin">
                <AppButton title="Next Step:" description={linkDescription}/>
            </Link>
        </div>
    )
}
export default AdminActionMenu