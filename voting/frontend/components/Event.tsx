'use client'

import { abi, contractAddress } from "@/constants"
import { useState } from "react"
import { Log } from "viem"
import { useContractEvent } from "wagmi"

const Event = ({ name }: { name: string }) => {
    const [logs, setLogs] = useState<Log[]>()

    useContractEvent({
        address: contractAddress,
        abi: abi,
        eventName: name,
        listener(log) {
            setLogs(log)
        },
    })

    return (
        <>
            {logs && logs.length > 0 &&
                <div role="alert" className="mx-auto w-3/4 p-4 mb-4 text-sm rounded h-auto bg-gradient-to-r from-indigo-100 to-indigo-200 text-gray-900 shadow-lg drop-shadow-lg border-indigo-600 border">
                    <div className="p-4 font-bold text-lg text-center">Last {name} log</div>

                    <ul>
                        <li className="pb-1">Address: {logs[0].address}</li>
                        <li className="pb-1">BlockHash: {logs[0].blockHash}</li>
                        <li className="pb-1">BlockNumber: {logs[0].blockNumber?.toString()}</li>
                        <li className="pb-1">Data: {logs[0].data}</li>
                        <li className="pb-1">Log Index: {logs[0].logIndex}</li>
                        <li className="pb-1">Removed: {logs[0].removed ? 'Yes' : 'No'}</li>
                        <li className="pb-1">Topics: {logs[0].topics}</li>
                        <li className="pb-1">Transaction Hash: {logs[0].transactionHash}</li>
                        <li className="pb-1">Transaction Index: {logs[0].transactionIndex}</li>
                    </ul>
                </div>
            }
        </>
    )
}
export default Event