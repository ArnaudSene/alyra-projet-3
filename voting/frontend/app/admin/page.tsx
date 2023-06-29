"use client";

import { useAccount } from "wagmi"
import { useEffect, useState } from "react"
import { readContractByFunctionName } from "@/utils"
import { useRouter } from 'next/navigation';
import IsConnected from "@/components/IsConnected";
import WorkflowManager from "@/components/admin/WorkflowManager";

const Admin = () => {
  const { address, isConnected } = useAccount()
  const { push } = useRouter()
  const [owner, setOwner] = useState('')
  const [winningProposalID, setWinningProposalID] = useState<number|null>(null)
  const [isOwner, setIsOwner] = useState(false)


  const getOwner = async () => {
    readContractByFunctionName<`0x${string}`>('owner').then(
      hash => {
        if (hash !== address) push('/')
        setOwner(hash)
        setIsOwner(hash === address)
    }).catch(() => push('/'))
  }

  const getWinningProposalID = async () => {
    readContractByFunctionName<number>('winningProposalID').then(
        id => setWinningProposalID(id)
    ).catch(
        err => console.log(err.message)
    )
  }

  useEffect(() => {
    if (isConnected) {
      getOwner()
      getWinningProposalID()
    }
  }, [address, isConnected])

  return (
    <div className="flex flex-col space-y-2 mx-auto max-w-screen-lg">
      <IsConnected>
        {isOwner ? (
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

            <WorkflowManager />
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