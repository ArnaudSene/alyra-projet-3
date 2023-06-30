'use client'

import { userIsOwner, userIsVoter } from "@/utils"
import { useRouter } from "next/navigation"
import { ReactNode, useEffect, useState } from "react"
import { useAccount } from "wagmi"

const IsConnected = ({ children, asOwner, asVoter }: {
    children: ReactNode,
    asOwner?: boolean,
    asVoter?: boolean
}) => {
    const { address, isConnected } = useAccount()
    const [isOwner, setIsOwner] = useState(false)
    const [isVoter, setIsVoter] = useState(false)  
    const { push } = useRouter()

    useEffect(() => {
        if (isConnected) {
            if (asOwner) userIsOwner(address as `0x${string}`).then(
                isOwner => {
                    if (!isOwner && asOwner) push('/')
                    else setIsOwner(isOwner)
                }
            ).catch(() => push('/'))

            if (asVoter) userIsVoter(address as `0x${string}`).then(
                isVoter => {
                    if (!isVoter && asVoter) push('/')
                    else setIsVoter(isVoter)
                }
            ).catch(() => push('/'))
        } else push('/')
    }, [address, isConnected])

    return (
        (isConnected && ((isVoter && asVoter) || (isOwner && asOwner))) ? children : (
            <div className="mx-auto w-3/4 rounded h-auto min-h-[50px] text-center bg-gradient-to-r from-rose-700 to-rose-600 text-zinc-200 shadow-lg drop-shadow-lg border-gray-800 border">
                <div className="p-6 font-semibold text-md">
                    {!isConnected && 'Please connect your Wallet !'}
                    {isConnected && asVoter && !isVoter && 'Voters area is restricted !'}
                    {isConnected && asOwner && !isOwner && 'Admin area is restricted !'}
                </div>
            </div>
        )
    )
}
export default IsConnected