"use client"

import IsConnected from "@/components/IsConnected"
import WinningProposal from "@/components/WinningProposal"
import VoterManager from "@/components/admin/VoterManager"
import WorkflowManager from "@/components/admin/WorkflowManager"

import { WorkflowStatus, registeringVotersStatus, votesTalliedStatus } from "@/constants"
import { useWorkflowStatusContext } from "@/context/workflowStatus"
import { getWorkflowStatus } from "@/utils"
import { useEffect } from "react"
import {useAccount} from "wagmi";
import Event from "@/components/Event";
import {WorkflowStepperManager} from "@/components/home/WorkflowStepperManager";

const Admin = () => {
  const { address } = useAccount()
  const { workflowStatus, setWorkflowStatus } = useWorkflowStatusContext()

  useEffect(() => {
    getWorkflowStatus(address as `0x${string}`).then(
      id => setWorkflowStatus(id)
    ).catch(err => console.log(err))
  }, [workflowStatus])

  return (
    <IsConnected asOwner={true}>
        <WorkflowStepperManager />
        <WorkflowManager />

        <div className="mx-auto w-3/4">
            {WorkflowStatus[workflowStatus] === votesTalliedStatus && <WinningProposal />}
        </div>

        {WorkflowStatus[workflowStatus] === registeringVotersStatus && <VoterManager />}

        <div className="mt-2">
            <Event name='VoterRegistered'></Event>
            <Event name='WorkflowStatusChange'></Event>
        </div>

    </IsConnected>
  )
}

export default Admin