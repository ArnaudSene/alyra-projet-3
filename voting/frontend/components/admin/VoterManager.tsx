"use client"

import { useEffect, useState } from "react";
import { client, writeContractByFunctionName } from "@/utils"
import { Log, parseAbiItem } from "viem";
import { ListItem, UnorderedList, useToast } from "@chakra-ui/react";
import { VoterRegistered, abi, contractAddress, genesisBlock } from "@/constants";
import { useContractEvent } from "wagmi";
import Loader from "../Loader";

const VoterManager = () => {
    const validAddress = new RegExp("^0x[a-fA-F0-9]{40}$")

    const [newVoter, setNewVoter] = useState('')
    const [depositEvents, setDepositEvents] = useState<`0x${string}`[]>([])
    const [logs, setLogs] = useState<Log[]>()
    const [loading, setLoading] = useState(true)

    const toast = useToast()

    const getEvents = async () => {
        const depositLogs = await client.getLogs({
            event: parseAbiItem(VoterRegistered),
            fromBlock: BigInt(genesisBlock),
            toBlock: 'latest'
        })
        setDepositEvents(depositLogs.map(log => log.args.voterAddress as `0x${string}`))
    }

    useContractEvent({
        address: contractAddress,
        abi: abi,
        eventName: 'VoterRegistered',
        listener(log) {
            setLogs(log)
        }
    })

    const addVoter = async () => {
        if (!validAddress.test(newVoter)) {
            toast({
                title: 'Invalid ethereum address.',
                description: `address ${newVoter}.`,
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        } else {
            writeContractByFunctionName('addVoter', newVoter).then(
                () => {
                    setLoading(true)
                    toast({
                        title: 'Voter added.',
                        description: `address ${newVoter}.`,
                        status: 'success',
                        duration: 5000,
                        isClosable: true,
                    })
                }
            ).catch(
                err => toast({
                    title: 'Error occured',
                    description: err.message,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            )
        }
    }

    useEffect(() => {
        const getVoterRegistered = async () => await getEvents()
        getVoterRegistered().finally(() => setLoading(false))
    }, [logs])

    return (
        <Loader isLoading={loading}>
            <section className="mt-2 mx-auto w-3/4 rounded h-auto bg-gradient-to-r from-indigo-900 to-indigo-800 text-indigo-100 shadow-lg drop-shadow-lg border-indigo-600 border">
                <div className="flex justify-between p-3">
                    <div className="m-auto w-3/4">
                        <input
                            type="text"
                            onChange={e => setNewVoter(e.target.value)}
                            className="bg-indigo-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-700 focus:border-indigo-900 block w-full p-2"
                            placeholder="Voter address"
                        />
                    </div>

                    <div className="m-auto w-1/4 text-center">
                        <button onClick={() => addVoter()}
                            className="content-center bg-indigo-950 hover:bg-indigo-100 hover:text-gray-900 text-white font-semibold py-2 px-4 rounded-lg"
                        >
                            Add Voter
                        </button>
                    </div>
                </div>

                <div className="m-auto w-3/4">
                    <h3 className="font-bold text-md text-center mb-3">Voter's Address Registered</h3>

                    <UnorderedList>
                        {depositEvents.map((voter, i) => <ListItem key={i}>{voter}</ListItem>)}
                    </UnorderedList>
                </div>
            </section>
        </Loader>
    )
}
export default VoterManager;