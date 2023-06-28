"use client";

import { useAccount } from "wagmi"
import { useEffect, useState } from "react"
import { readContractByFunctionName } from "@/utils"

import VoterManager from "@/components/admin/VoterManager"
import IsConnected from "@/components/IsConnected";
import Event from "@/components/Event";

const Admin = () => {
  const { address, isConnected } = useAccount()
  const [owner, setOwner] = useState(null)
  const [winningProposalID, setWinningProposalID] = useState(null)
  const [workflowStatus, setWorkflowStatus] = useState(0)

  const WorkflowStatus: string[] = [
    "RegisteringVoters",
    "ProposalsRegistrationStarted",
    "ProposalsRegistrationEnded",
    "VotingSessionStarted",
    "VotingSessionEnded",
    "VotesTallied"
  ]

  const getOwner = async () => {
    try {
      const data = await readContractByFunctionName('owner')
      setOwner(data.toString())
    } catch (err: any) {
      console.log('Error: ', err.message)
    }
  }

  const getWinningProposalID = async () => {
    try {
      const data = await readContractByFunctionName('winningProposalID')
      setWinningProposalID(data.toString())
    } catch (err: any) {
      console.log('Error: ', err.message)
    }
  }

  const getWorkflowStatus = async () => {
    try {
      const data = await readContractByFunctionName('workflowStatus')
      setWorkflowStatus(data.toString())
    } catch (err: any) {
      console.log('Error: ', err.message)
    }
  }

  useEffect(() => {
    if (isConnected) {
      getOwner()
      getWinningProposalID()
      getWorkflowStatus()
    }
  }, [isConnected])

  function isOwner(): boolean {
    return owner === address;
  }

  return (
    <div className="flex flex-col space-y-2 mx-auto max-w-screen-lg">
      <IsConnected>
        {isOwner() ? (
          <>
            <div className="mx-auto w-3/4 rounded h-auto bg-gradient-to-r from-indigo-900 to-indigo-600 text-indigo-100 shadow-lg">
              <div className="p-4">
                <p>owner : {owner}</p>
                <p>address: {address}</p>
              </div>
            </div>

            <div className="mx-auto w-3/4 rounded h-auto bg-gradient-to-r from-indigo-900 to-indigo-600 text-indigo-100 shadow-lg">
              <div className="p-4">
                winningProposalID : {winningProposalID}
              </div>
            </div>

            <div className="mx-auto w-3/4 rounded h-auto bg-gradient-to-r from-indigo-900 to-indigo-600 text-indigo-100 shadow-lg">
              <div className="p-4">
                WorkflowStatus : {WorkflowStatus[workflowStatus]}
              </div>
            </div>

            {WorkflowStatus[workflowStatus] === "RegisteringVoters" ? (
              <VoterManager />
            ) : (<></>)}

            <Event name='VoterRegistered'></Event>
          </>

        ) : (
          <div className="mx-auto w-3/4 rounded h-[90px] bg-gradient-to-r from-indigo-950 to-rose-600 text-zinc-200 shadow-lg">
            <div className="flex justify-between pt-2">
              <div className="px-4 font-light text-sm">
                You are not the owner !
              </div>
            </div>
            <div className="flex justify-between pt-2">
              <div className="px-4 font-light text-sm">
                The owner is {owner}
              </div>
            </div>
            <div className="flex justify-between pt-2">
              <div className="px-4 font-light text-sm">
                You are {address}
              </div>
            </div>
          </div>
        )}
      </IsConnected>
    </div>
  )
}

export default Admin