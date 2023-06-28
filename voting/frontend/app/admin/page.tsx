"use client";
import {Button, Input} from "@chakra-ui/react"
import {useAccount} from "wagmi";
import {prepareWriteContract, readContract, writeContract} from "@wagmi/core";
import {useEffect, useState} from "react";
import {abi, contractAddress} from "@/constants";

const Admin = () => {
    const { address, isConnected } = useAccount()
    const [owner, setOwner] = useState(null)
    const [winningProposalID, setWinningProposalID] = useState(null)
    const [workflowStatus, setWorkflowStatus] = useState(0)
    const [voter, setVoter] = useState("")
    const [addressErr, setAddressErr] = useState(false);

    const WorkflowStatus: string[] = [
        "RegisteringVoters",
        "ProposalsRegistrationStarted",
        "ProposalsRegistrationEnded",
        "VotingSessionStarted",
        "VotingSessionEnded",
        "VotesTallied"
    ]

    const readContractByFunctionName = async (_functionName: string): Promise<any> => {
      return await readContract({
          address: contractAddress,
          abi: abi,
          functionName: _functionName,
      });
    }

    const getOwner = async () => {
        try {
          const data = readContractByFunctionName('owner')
          setOwner(data.toString())
        } catch (err: any) {
          console.log(err.message)
        }
    }

    const getWinningProposalID = async () => {
        try {
          const data = readContractByFunctionName('winningProposalID')
          setWinningProposalID(data.toString())
        } catch (err: any) {
          console.log(err.message)
        }
    }

    const getWorkflowStatus = async () => {
        try {
          const data = readContractByFunctionName('workflowStatus')
          setWorkflowStatus(data.toString())
        } catch (err: any) {
          console.log('error')
          console.log(err.message)
        }
    }

    const addVoter = async () => {
        const validAddress = new RegExp("^0x[a-fA-F0-9]{40}$");
        setAddressErr(false);
  
        if (!validAddress.test(voter)) {
          setAddressErr(true);
        } else {
          try {
              const { request } = await prepareWriteContract({
                  address: contractAddress,
                  abi: abi,
                  functionName: 'addVoter',
                  args: [voter]
              })
              const { hash } = await writeContract(request)
              console.log("add voter => " + hash)
  
          } catch (err: any) {
              console.log(err.message)
          }
        }
    }

    useEffect(() => {
        if(isConnected) {
            getOwner()
            getWinningProposalID()
            getWorkflowStatus()
        }
    }, [isConnected])

    function isOwner(): boolean {
        return owner === address;
    }

    return (
        <div className="flex flex-col space-y-2 mt-5 mx-auto max-w-[740px]">
            {isConnected ? (
                    isOwner() ? (
                        <>
                            <div className="mx-auto w-3/4 rounded h-[80px] bg-gradient-to-r from-indigo-900 to-indigo-600 text-indigo-100 shadow-lg">
                                <div className="flex justify-between pt-2">
                                    <div className="px-4 font-light text-sm">
                                        owner : {owner}
                                    </div>
                                </div>
                                <div className="flex justify-between pb-2">
                                    <div className="px-4 font-light text-sm">
                                        address: {address}
                                    </div>
                                </div>
                            </div>

                            <div className="mx-auto w-3/4 rounded h-[80px] bg-gradient-to-r from-indigo-900 to-indigo-600 text-indigo-100 shadow-lg">
                                <div className="flex justify-between pt-2">
                                    <div className="px-4 font-light text-sm">
                                        winningProposalID : {winningProposalID}
                                    </div>
                                </div>
                            </div>

                            <div className="mx-auto w-3/4 rounded h-[80px] bg-gradient-to-r from-indigo-900 to-indigo-600 text-indigo-100 shadow-lg">
                                <div className="flex justify-between pt-2">
                                    <div className="px-4 font-light text-sm">
                                        WorkflowStatus : {WorkflowStatus[workflowStatus]}
                                    </div>
                                </div>
                            </div>

                            {WorkflowStatus[workflowStatus] === "RegisteringVoters" ? (
                                <div className="mx-auto w-3/4 rounded h-[80px] bg-gradient-to-r from-lime-300 to-lime-200 text-blue-gray-700 shadow-lg">
                                    <div className="flex justify-between pt-2">
                                        <div className="px-4 text-sm">
                                            Add voter
                                        </div>

                                        {addressErr && <p className="text-red-800 font-semibold">Invalid etherum address</p>}

                                        <div className="pl-20 font-light text-sm">
                                            <Input
                                                onChange={e => setVoter(e.target.value)}
                                                placeholder="Voter address"
                                            />
                                        </div>

                                        <div className="px-20 font-light text-sm">
                                            <Button
                                                onClick={() => addVoter()}
                                                color="purple"
                                            >
                                                Add voter's address
                                            </Button>
                                        </div>

                                    </div>
                                </div>
                            ) : ( <></> )}

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
                <div className="mx-auto w-3/4 rounded h-[70px] bg-gradient-to-r from-indigo-950 to-rose-600 text-zinc-200 shadow-lg">
                    <div className="flex py-6">
                        <div className="px-6 font-semibold text-sm">
                            Please connect your Wallet.
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Admin