'use client'

import { readContractByFunctionName } from "@/utils";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Voter } from "@/interfaces/Voter";

const Headers = () => {
    const { address, isConnected } = useAccount()
    const [isVoter, setIsVoter] = useState(false)

    useEffect(() => {if (isConnected) getIsVoter()}, [isConnected])

    const getIsVoter = async () => {
        setIsVoter(false)
        readContractByFunctionName<Voter>('getVoter', address as `0x${string}`).then(
            (data: Voter) => {
                if (data && data.isRegistered) setIsVoter(true)
            }
        ).catch(
            err => console.log(err.message)
        )
    }

    return (
        <header className="bg-gray-700 text-gray-100">
            <nav className="container mx-auto flex justify-between items-center text-center p-4">
                <Link className="text-lg font-bold hover:text-indigo-500" href="/">Home</Link>

                <div>
                    <ConnectButton />
                </div>

                <div>
                    {/* @TODO Block if admin */}
                    <Link className="p-2 font-semibold hover:text-indigo-500 hover:font-bold" href="/admin">Admin</Link>
                    {/* @TODO Block if admin */}

                    {isVoter && <Link className="p-2 font-semibold hover:text-indigo-500 hover:font-bold" href="/voters">Voters</Link>}
                </div>
            </nav>
        </header>
    )
}
export default Headers;