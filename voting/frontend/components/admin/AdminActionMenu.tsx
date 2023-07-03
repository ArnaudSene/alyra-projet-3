'use client'

import { WorkflowStatus, proposalsRegistrationEndedStatus, proposalsRegistrationStartedStatus, registeringVotersStatus, votesTalliedStatus, votingSessionEndedStatus, votingSessionStartedStatus } from "@/constants"
import { useWorkflowStatusContext } from "@/context/workflowStatus"
import { useEffect, useState } from "react"

import Link from "next/link"

const AdminActionMenu = () => {
    const { workflowStatus } = useWorkflowStatusContext()
    const [linkTitle, setLinkTitle] = useState('')

    useEffect(() => {
        switch (WorkflowStatus[workflowStatus]) {
            case registeringVotersStatus: setLinkTitle('Start Proposal Registration')
                break
            case proposalsRegistrationStartedStatus: setLinkTitle('End Proposal Registration')
                break
            case proposalsRegistrationEndedStatus: setLinkTitle('Start Voting Session')
                break
            case votingSessionStartedStatus: setLinkTitle('End Voting Session')
                break
            case votingSessionEndedStatus: setLinkTitle('Tails Vote')
                break
        }
    })

    return (
        <div className="flex flex-row justify-center text-center text-lg pt-5">
            {WorkflowStatus[workflowStatus] !== votesTalliedStatus && <>
                <h3 className="font-bold pr-3 text-indigo-500 underline">
                    Next Step:
                </h3>

                <Link className="font-semibold hover:text-indigo-500 hover:font-bold" href="/admin">
                    {linkTitle}
                </Link>
            </>}
        </div>
    )
}
export default AdminActionMenu