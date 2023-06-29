'use client'

import { abi, contractAddress } from "@/constants"
import { useState } from "react"
import { Log } from "viem"
import { useContractEvent } from "wagmi"

const Event = ({ name }: any) => {
    const [logs, setLogs] = useState<Log[]>()

    useContractEvent({
        address: contractAddress,
        abi: abi,
        eventName: name,
        listener(l) {
            setLogs(l)
        },
    })

    return (
        <>
            {logs && logs.length > 0 &&
                <div className="mx-auto w-3/4 p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                    <div className="font-bold text-lg text-center">Last {name} log</div>
                    {logs?.map((log) =>
                        <ul>
                            <li className="pb-1">Address: {log.address}</li>
                            <li className="pb-1">BlockHash: {log.blockHash}</li>
                            <li className="pb-1">BlockNumber: {log.blockNumber?.toString()}</li>
                            <li className="pb-1">Data: {log.data}</li>
                            <li className="pb-1">Log Index: {log.logIndex}</li>
                            <li className="pb-1">Removed: {log.removed ? 'Yes' : 'No'}</li>
                            <li className="pb-1">Topics: {log.topics}</li>
                            <li className="pb-1">TransactionHash: {log.transactionHash}</li>
                            <li className="pb-1">TransactionIndex: {log.transactionIndex}</li>
                        </ul>
                    )}
                </div>
            }
        </>
    )
}
export default Event