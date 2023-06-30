"use client"

import { useState } from "react";
import { readContractByFunctionName } from "@/utils";
import { Voter } from "@/interfaces/Voter";
import {useToast} from "@chakra-ui/react";

const GetVoter = () => {
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
            readContractByFunctionName<Voter>('getVoter', voterAddress).then(
                voter => setVoter(voter)
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
                <div className="m-auto w-3/4">
                    <input
                        type="text"
                        onChange={e => setVoterAddress(e.target.value)}
                        className="bg-indigo-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-700 focus:border-indigo-900 block w-full p-2"
                        placeholder="Voter address"
                    />
                </div>

                <div className="m-auto w-1/4 text-center">
                    <button
                        onClick={() => getVoter()}
                        className="bg-indigo-950 hover:bg-indigo-100 hover:text-gray-900 text-white font-semibold py-2 px-4 rounded-lg"
                    >
                        Get Voter
                    </button>
                </div>
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