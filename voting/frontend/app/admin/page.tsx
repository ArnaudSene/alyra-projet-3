"use client"

import IsConnected from "@/components/IsConnected"
import WinningProposal from "@/components/WinningProposal"
import VoterManager from "@/components/admin/VoterManager"
import WorkflowManager from "@/components/admin/WorkflowManager"

import { WorkflowStatus, registeringVotersStatus, votesTalliedStatus } from "@/constants"
import { useWorkflowStatusContext } from "@/context/workflowStatus"
import { getWorkflowStatus } from "@/utils"
import { useEffect } from "react"

const Admin = () => {
  const { workflowStatus, setWorkflowStatus } = useWorkflowStatusContext()

  useEffect(() => {
    getWorkflowStatus().then(
      id => setWorkflowStatus(id)
    ).catch(err => console.log(err))
  }, [workflowStatus])

  return (
    <IsConnected asOwner={true}>
      <WorkflowManager />

      {WorkflowStatus[workflowStatus] === votesTalliedStatus && <WinningProposal />}
      {WorkflowStatus[workflowStatus] === registeringVotersStatus && <VoterManager />}
    </IsConnected>
  )
}

export default Admin