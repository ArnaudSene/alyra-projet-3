'use client'

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

export default function Home() {
  const { isConnected } = useAccount()

  return (
    <div className="container text-center text-2xl">
      {!isConnected ? (<>
        <h1 className="font-bold">Login</h1>
        <div className="flex justify-center p-5 mt-5">
          <ConnectButton />
        </div>
      </>) : (<h1 className="font-bold">Homepage</h1>)}
    </div>
  )
}
