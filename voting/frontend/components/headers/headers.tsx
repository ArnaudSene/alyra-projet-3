'use client'

import { userIsOwner, userIsVoter } from "@/utils";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccount, useContractEvent } from "wagmi";
import { AppLogo } from "../AppLogo";
import { abi, contractAddress } from "@/constants";

const Headers = () => {
    const { address, isConnected } = useAccount()
    const [isVoter, setIsVoter] = useState(false)
    const [isOwner, setIsOwner] = useState(false)
    const [refresh, setRefresh] = useState(false)

    useContractEvent({
        address: contractAddress,
        abi: abi,
        eventName: 'VoterRegistered',
        listener() {
            setRefresh(true)
        }
    })

    useEffect(() => {
        if (isConnected) {
            userIsVoter(address as `0x${string}`)
                .then(isVoter => setIsVoter(isVoter))
                .catch(() => setIsVoter(false))

            userIsOwner(address as `0x${string}`)
                .then(isOwner => setIsOwner(isOwner))
                .catch(() => setIsOwner(false))
        }
    }, [address, isConnected, refresh])

    return (
        <header className="bg-gray-950 text-gray-100 border-gray-500 border-b">
            <nav className="mx-auto flex justify-between items-center text-center p-4">
                <div className="w-1/3">
                    <AppLogo size="xl"/>
                </div>

                <div className="w-1/3">
                    {isOwner && <Link className="p-2 font-semibold hover:text-indigo-500 hover:font-bold" href="/admin">Admin</Link>}
                    {isVoter && <Link className="p-2 font-semibold hover:text-indigo-500 hover:font-bold" href="/voters">Voters</Link>}
                </div>
                
                {isConnected && <div className="w-1/3"><ConnectButton /></div>}
            </nav>
        </header>
    )
}
export default Headers;