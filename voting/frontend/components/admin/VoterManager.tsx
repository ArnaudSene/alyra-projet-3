"use client"

import { useEffect, useState } from "react";
import { client, writeContractByFunctionName } from "@/utils"
import { parseAbiItem } from "viem";
import { ListItem, UnorderedList } from "@chakra-ui/react";
import { VoterRegistered } from "@/constants";

const VoterManager = () => {
    const validAddress = new RegExp("^0x[a-fA-F0-9]{40}$")

    const [newVoter, setNewVoter] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [depositEvents, setDepositEvents] = useState<`0x${string}`[]>([])

    const getEvents = async () => {
        const depositLogs = await client.getLogs({
            event: parseAbiItem(VoterRegistered),
            fromBlock: 0n
        })
        setDepositEvents(depositLogs.map(log => log.args.voterAddress as `0x${string}`))
    }

    const addVoter = async () => {
        setError('')
        setSuccess('')

        if (!validAddress.test(newVoter)) {
            setError('Invalid etherum address');
        } else {
            writeContractByFunctionName('addVoter', newVoter).then(
                hash => setSuccess(hash)
            ).catch(
                err => setError(err.message)
            )
        }
    }

    useEffect(() => {
        const getVoterRegistered = async () => await getEvents()
        getVoterRegistered()
    }, [success])

    return (
        <section className="mx-auto w-3/4 rounded h-auto bg-gradient-to-r from-indigo-900 to-indigo-600 text-indigo-100 shadow-lg">
            <div className="flex justify-between p-3">
                <div className="m-auto w-3/4">
                    <input type="text" onChange={e => setNewVoter(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-700 focus:border-indigo-700 block w-full p-2" placeholder="Voter address" />
                </div>

                <div className="m-auto w-1/4 text-center">
                    <button onClick={() => addVoter()} className="content-center bg-indigo-950 hover:bg-indigo-900 text-white font-semibold py-2 px-4 rounded-full">
                        Add Voter
                    </button>
                </div>
            </div>

            {success && <div className="text-green-600 font-semibold p-4 text-center">Voter added with success ! Transaction: {success}</div>}
            {error && <div className="text-red-600 font-semibold p-4 text-center">{error}</div>}

            <div className="m-auto w-3/4">
                <h3 className="font-bold text-lg text-center mb-3">Voter's Address Registered</h3>

                <UnorderedList>
                    {depositEvents.map((voter, i) => <ListItem key={i}>{voter}</ListItem>)}
                </UnorderedList>
            </div>
        </section>
    )
}
export default VoterManager;