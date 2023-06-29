'use client'

import { userIsOwner, userIsVoter } from "@/utils";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const Headers = () => {
    const { address, isConnected } = useAccount()
    const [isVoter, setIsVoter] = useState(false)
    const [isOwner, setIsOwner] = useState(false)

    useEffect(() => {
        if (isConnected) {
            userIsVoter(address as `0x${string}`)
                .then(isVoter => setIsVoter(isVoter))
                .catch(() => setIsVoter(false))
            
                
            userIsOwner(address as `0x${string}`)
                .then(isOwner => setIsOwner(isOwner))
                .catch(() => setIsOwner(false))
        }
    }, [address, isConnected])

    return (
        <header className="bg-gray-950 text-gray-100 border-gray-500 border-b">
            <nav className="mx-auto flex justify-between items-center text-center p-4">
                <Link className="w-1/3 text-lg font-bold hover:text-indigo-500" href="/">Home</Link>

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