'use client'

import { WorkflowStatus, proposalsRegistrationStartedStatus, votesTalliedStatus, votingSessionStartedStatus } from "@/constants"
import { useWorkflowStatusContext } from "@/context/workflowStatus"
import { useAccount } from "wagmi"
import { useEffect, useState } from "react"
import { userIsOwner, userIsVoter } from "@/utils"

import VoterActionMenu from "@/components/voters/VoterActionMenu"
import Loader from "@/components/Loader"
import AdminActionMenu from "@/components/admin/AdminActionMenu"
import WinningProposal from "@/components/WinningProposal"

export default function Home() {
    const { workflowStatus } = useWorkflowStatusContext()
    const { address, isConnected } = useAccount()
    const [isOwner, setIsOwner] = useState(false)
    const [isVoter, setIsVoter] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        setIsVoter(false)
        setIsOwner(false)
        if (isConnected) {
            userIsOwner(address as `0x${string}`).then(
                isOwner => setIsOwner(isOwner)
            ).catch(err => console.log(err))
                .finally(() =>
                    userIsVoter(address as `0x${string}`).then(
                        isVoter => setIsVoter(isVoter)
                    ).catch(err => console.log(err))
                        .finally(() => setLoading(false))
                )
        }
    }, [address, isConnected, workflowStatus])

    return (
        <Loader isLoading={loading}>
            {WorkflowStatus[workflowStatus] === votesTalliedStatus && <WinningProposal />}

            <div className="flex flex-col space-y-2 mx-auto max-w-screen-lg">

                {isVoter ? WorkflowStatus[workflowStatus] !== proposalsRegistrationStartedStatus &&
                    WorkflowStatus[workflowStatus] !== votingSessionStartedStatus &&
                    WorkflowStatus[workflowStatus] !== votesTalliedStatus
                    ? <h2 className="font-bold text-lg text-center mb-3">No actions available yet for Voters</h2>
                    : <VoterActionMenu />
                : <h2 className="font-bold text-lg text-center mb-3">You're not registered has voter</h2>
                }

                {isOwner && <AdminActionMenu />}
            </div>
        </Loader>
    )
}
