"use client"

import { useState } from "react"
import { readContractByFunctionName } from "@/utils"
import { Voter } from "@/interfaces/Voter"
import { useToast } from "@chakra-ui/react"
import { useAccount } from "wagmi"

const GetVoter = () => {
    const { address } = useAccount()
    const validAddress = new RegExp("^0x[a-fA-F0-9]{40}$")
    const [voterAddress, setVoterAddress] = useState('')
    const [voter, setVoter] = useState<Voter>()
    const toast = useToast()

    const getVoter = async () => {

        if (!validAddress.test(voterAddress)) {
            toast({
                title: 'Invalid ethereum address.',
                description: `address ${voterAddress}.`,
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        } else {
            readContractByFunctionName<Voter>('getVoter', address as `0x${string}`, voterAddress).then(
                voter => {
                    setVoter(voter)
                    setVoterAddress('')
                }
            ).catch(
                err => toast({
                    title: 'Unable getting voter information',
                    description: err.message,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            )
        }
    }

    return (
        <section className="mx-auto w-3/4 rounded h-auto bg-gradient-to-r from-indigo-900 to-indigo-800 text-indigo-100 shadow-lg drop-shadow-lg border-indigo-600 border">
            <div className="flex justify-between p-3">
                <input
                    type="text"
                    onChange={e => setVoterAddress(e.target.value)}
                    value={voterAddress}
                    className="w-full mr-3 p-2 leading-tight focus:outline-none bg-indigo-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-700 focus:border-indigo-900"
                    placeholder="Voter address"
                />

                <button
                    onClick={() => getVoter()}
                    className="min-w-[15%] content-center bg-indigo-950 hover:bg-indigo-100 hover:text-gray-900 text-white font-semibold py-2 px-4 rounded-lg"
                >
                    Get Voter
                </button>
            </div>

            {voter && <table className="table-auto m-auto">
                <thead>
                    <tr>
                        <th className="pt-2 pb-2 pr-5 pl-5">Has Voted</th>
                        <th className="pt-2 pb-2 pr-5 pl-5">Registered</th>
                        <th className="pt-2 pb-2 pr-5 pl-5">Voted Proposal</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="pt-2 pb-2 pr-5 pl-5 text-center">{voter.hasVoted ? 'Yes' : 'No'}</td>
                        <td className="pt-2 pb-2 pr-5 pl-5 text-center">{voter.isRegistered ? 'Yes' : 'No'}</td>
                        <td className="pt-2 pb-2 pr-5 pl-5 text-center">
                            {/* @TODO: redirect to the proposal */}
                            {voter.votedProposalId || 'Not voted yet'}
                        </td>
                    </tr>
                </tbody>
            </table>}
        </section>
    )
}

export default GetVoter;