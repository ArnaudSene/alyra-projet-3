'use client'

import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"
import { AppLogo } from "../AppLogo"

const Headers = () => {
    const { isConnected } = useAccount()

    return (
        <header className="bg-gray-950 text-gray-100 border-gray-500 border-b">
            <nav className="mx-auto flex justify-between text-center p-4">
                <div className="w-1/3">
                    <AppLogo size="xl"/>
                </div>

                <div className="w-1/3"></div>
                
                {isConnected && <div className="w-1/3"><ConnectButton /></div>}
            </nav>
        </header>
    )
}
export default Headers;