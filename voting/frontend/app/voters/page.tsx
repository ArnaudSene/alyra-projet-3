"use client";

import IsConnected from "@/components/IsConnected"
import Loader from "@/components/Loader"
import GetVoter from "@/components/voters/GetVoter"
import ProposalManager from "@/components/voters/ProposalManager"

import { WorkflowStatus, votesTalliedStatus } from "@/constants"
import { SelectProposalContextProvider } from "@/context/SelectProposal"
import { useWorkflowStatusContext } from "@/context/workflowStatus"
import { userHasVoted } from "@/utils"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useAccount } from "wagmi"


export default function Voters() {
  const { workflowStatus } = useWorkflowStatusContext()
  const { address } = useAccount()
  const [voted, setVoted] = useState(false)
  const { push } = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (WorkflowStatus[workflowStatus] === votesTalliedStatus) push('/')
    
    userHasVoted(address as `0x${string}`).then(
      voted => setVoted(voted)
    ).catch(err => console.log(err))
    .finally(() => setLoading(false))
  }, [workflowStatus])

  return (
    <Loader isLoading={loading}>
      <IsConnected asVoter={true}>
        <GetVoter />
        <SelectProposalContextProvider>
          <ProposalManager hasVoted={voted} />
        </SelectProposalContextProvider>
      </IsConnected>
    </Loader>
  )
}
