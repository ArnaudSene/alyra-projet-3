'use client'

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import {ActionMenu} from "@/components/home/ActionMenu";
import {WorkflowStepperManager} from "@/components/home/WorkflowStepperManager";

export default function Home() {
  const { isConnected } = useAccount()

  return (
    <div>
        {!isConnected ? (
            <>
                <div className="mx-auto w-3/4 rounded h-auto min-h-[50px] text-center bg-gray-800 text-zinc-200 shadow-lg drop-shadow-lg border-gray-800 border">
                    <div className="p-6 font-semibold text-xl">
                    <   h1>Login</h1>
                    </div>
                </div>

                <div className="mx-auto h-auto min-h-[50px] pt-6">
                    <ConnectButton />
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
