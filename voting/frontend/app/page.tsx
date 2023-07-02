'use client'

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import {ActionMenu} from "@/components/home/ActionMenu";
import {WorkflowStepperManager} from "@/components/home/WorkflowStepperManager";
import {TitleHeader} from "@/components/TitleHeader";

export default function Home() {
  const { isConnected } = useAccount()

  return (
    <div>
        {!isConnected ? (
            <>
                <TitleHeader/>
                <div className="mx-auto w-1/2 rounded h-auto min-h-[50px] text-center bg-gray-800 text-zinc-200 shadow-lg drop-shadow-lg border-gray-800 border">

                    <p className="py-6">Please connect to wallet to access myVote</p>


                    <div className="flex flex-col w-1/4 mx-auto m-1 py-6">
                        <ConnectButton />
                    </div>
                </div>
            </>
        ) : (
            <>
                <WorkflowStepperManager />
                <div className="flex flex-col space-y-2 mx-auto max-w-screen-lg">
                <ActionMenu/>
                </div>
            </>
        )}
      </div>
  )
}
