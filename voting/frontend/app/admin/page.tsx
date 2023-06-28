"use client";

import { useAccount } from "wagmi";
import { prepareWriteContract, readContract, writeContract } from "@wagmi/core";
import { useEffect, useState } from "react";
import { abi, contractAddress } from "@/constants";
import { BaseError, ContractFunctionRevertedError } from "viem";

const Admin = () => {
  const { address, isConnected } = useAccount()
  const [owner, setOwner] = useState(null)
  const [winningProposalID, setWinningProposalID] = useState(null)
  const [workflowStatus, setWorkflowStatus] = useState(0)
  const [voter, setVoter] = useState('')
  const [error, setError] = useState('');
  const [sucess, setSucess] = useState('');

  const WorkflowStatus: string[] = [
    "RegisteringVoters",
    "ProposalsRegistrationStarted",
    "ProposalsRegistrationEnded",
    "VotingSessionStarted",
    "VotingSessionEnded",
    "VotesTallied"
  ]

  const readContractByFunctionName = async (functionName: string): Promise<any> => {
    return await readContract({
      address: contractAddress,
      abi: abi,
      functionName: functionName,
    });
  }

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

  const addVoter = async () => {
    const validAddress = new RegExp("^0x[a-fA-F0-9]{40}$")
    setError('')
    setSucess('')

    if (!validAddress.test(voter)) {
      setError('Invalid etherum address');
    } else {
      try {
        const { request } = await prepareWriteContract({
          address: contractAddress,
          abi: abi,
          functionName: 'addVoter',
          args: [voter]
        })

        const { hash } = await writeContract(request)
        setSucess(hash)
      } catch (err: any) {
        if (err instanceof BaseError) {
          // Option 1: checking the instance of the error
          if (err.cause instanceof ContractFunctionRevertedError) {
            const cause: ContractFunctionRevertedError = err.cause
            setError(cause.data?.errorName ?? 'Unkown error');
          }

          // Option 2: using `walk` method from `BaseError`
          const revertError: any = err.walk(err => err instanceof ContractFunctionRevertedError)
          if (revertError) {
            setError(revertError.data?.message ?? 'Unkown error');
          }
        }
      }
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
    <div className="flex flex-col space-y-2 mt-5 mx-auto max-w-screen-lg">
      {isConnected ? (
        isOwner() ? (
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
              <div className="mx-auto w-3/4 rounded h-auto bg-gradient-to-r from-lime-300 to-lime-200 text-blue-gray-700 shadow-lg">
                <div className="flex justify-between p-3">
                  <div className="m-auto w-1/4">
                    Add voter
                  </div>

                  <div className="m-auto w-2/4">
                    <input type="text" onChange={e => setVoter(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-700 focus:border-yellow-700 block w-full p-2" placeholder="Voter address" />
                  </div>

                  <div className="m-auto w-1/4 text-center">
                    <button onClick={() => addVoter()} className="content-center bg-yellow-700 hover:bg-yellow-900 text-white font-semibold py-2 px-4 rounded-full">
                      Add Voter
                    </button>
                  </div>
                </div>
                {error && <div className="text-red-800 font-semibold p-4 text-center">{error}</div>}
                {sucess && <div className="text-green-600 font-semibold p-4 text-center">
                  Voter added with sucess ! Transaction: {sucess}
                </div>}
              </div>
            ) : (<></>)}

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
        )
      ) : (
        <div className="mx-auto w-3/4 rounded h-auto min-h-[50px] text-center bg-gradient-to-r from-indigo-950 to-rose-600 text-zinc-200 shadow-lg">
          <div className="p-6 font-semibold text-md">
            Please connect your Wallet.
          </div>
        </div>
      )}
    </div>
  )
}

export default Admin