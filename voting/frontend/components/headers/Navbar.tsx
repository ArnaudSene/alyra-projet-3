'use client'

import { userIsOwner, userIsVoter } from "@/utils"
import { useEffect, useState } from "react"
import { useAccount, useContractEvent } from "wagmi"
import { abi, contractAddress } from "@/constants"

import Link from "next/link"

const Navbar = () => {
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
        setIsVoter(false)
        setIsOwner(false)
        if (isConnected) {
            userIsVoter(address as `0x${string}`)
                .then(isVoter => setIsVoter(isVoter))
                .catch(() => setIsVoter(false))

            userIsOwner(address as `0x${string}`)
                .then(isOwner => setIsOwner(isOwner))
                .catch(() => setIsOwner(false))
        }
    }, [address, isConnected, refresh])

    return ((isOwner || isVoter) &&
        <nav className="bg-gray-800 text-gray-100 border-gray-500 border-b p-3 text-center">
            {isOwner && <Link className="p-5 font-semibold hover:text-indigo-500 hover:font-bold" href="/admin">Organizer</Link>}
            {isVoter && <Link className="p-5 font-semibold hover:text-indigo-500 hover:font-bold" href="/voters">Voter</Link>}
        </nav>
    )
}
export default Navbar;