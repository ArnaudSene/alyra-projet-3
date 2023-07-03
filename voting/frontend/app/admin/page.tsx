"use client"

import IsConnected from "@/components/IsConnected"
import Loader from "@/components/Loader"
import VoterManager from "@/components/admin/VoterManager"
import WorkflowManager from "@/components/admin/WorkflowManager"

import { WorkflowStatus, registeringVotersStatus, votesTalliedStatus } from "@/constants"
import { useWorkflowStatusContext } from "@/context/workflowStatus"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const Admin = () => {
  const { workflowStatus } = useWorkflowStatusContext()
  const [loading, setLoading] = useState(true)
  
  const { push } = useRouter()

  useEffect(() => {
    if (WorkflowStatus[workflowStatus] === votesTalliedStatus) push('/')
    setLoading(false)
  }, [workflowStatus])

  return (
    <Loader isLoading={loading}>
      <IsConnected asOwner={true}>
        <WorkflowManager />
        {WorkflowStatus[workflowStatus] === registeringVotersStatus && <VoterManager />}
      </IsConnected>
    </Loader>
  )
}

export default Admin