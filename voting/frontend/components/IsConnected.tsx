import { ReactNode } from "react"
import { useAccount } from "wagmi"
import {ConnectButton} from "@rainbow-me/rainbowkit";

const IsConnected = ({ children }: { children: ReactNode }) => {
    const { isConnected } = useAccount()

    return (
        <>
            {isConnected ? children : (
                <>
                    <div className="mx-auto w-3/4 rounded h-auto min-h-[50px] text-center bg-gradient-to-r from-rose-700 to-rose-600 text-zinc-200 shadow-lg drop-shadow-lg border-gray-800 border">
                        <div className="p-6 font-semibold text-md">
                            Admin area is restricted !
                        </div>
                    </div>
                    <div className="mx-auto h-auto min-h-[50px] pt-6">
                        <ConnectButton />
                    </div>
                </>
            )}
        </>
    )
}
export default IsConnected