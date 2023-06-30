"use client"

import IsConnected from "@/components/IsConnected"
import WorkflowManager from "@/components/admin/WorkflowManager"
import { readContractByFunctionName } from "@/utils"
import { useEffect, useState } from "react"
import { useAccount } from "wagmi"

const Admin = () => {
  const { address, isConnected } = useAccount()
  const [owner, setOwner] = useState('')
  const [winningProposalID, setWinningProposalID] = useState<number|null>(null)

  const getOwner = async () => {
    readContractByFunctionName<`0x${string}`>('owner').then(
      hash => setOwner(hash)
    ).catch(err => console.log(err.message))
  }

  const getWinningProposalID = async () => {
    readContractByFunctionName<number>('winningProposalID').then(
        id => setWinningProposalID(id)
    ).catch(err => console.log(err.message))
  }

  useEffect(() => {
    if (isConnected) {
      getOwner()
      getWinningProposalID()
    }
  }, [address, isConnected])

  return (
    <IsConnected asOwner={true}>
      <div className="mx-auto w-3/4 rounded h-auto bg-gradient-to-r from-indigo-900 to-indigo-600 text-indigo-100 shadow-lg">
        <div className="p-4">
          <ul className="list-inside list-disc">
            <li>{owner} (Contract's owner)</li>
            <li>{address} (Account address)</li>
          </ul>
        </div>
      </div>

      {winningProposalID &&
        <div className="mx-auto w-3/4 rounded h-auto bg-gradient-to-r from-indigo-900 to-indigo-600 text-indigo-100 shadow-lg">
          <div className="p-4">
            winningProposalID : {winningProposalID}
          </div>
        </div>
      }
      <WorkflowManager />
    </IsConnected>
  )
}

export default Admin