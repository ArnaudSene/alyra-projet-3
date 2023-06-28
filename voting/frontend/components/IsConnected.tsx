import { useAccount } from "wagmi";

const IsConnected = ({ children }: any) => {
    const { isConnected } = useAccount()

    return (
        <>
            {isConnected ? (
                <>{children}</>
            ) : (
                <div className="mx-auto w-3/4 rounded h-auto min-h-[50px] text-center bg-gradient-to-r from-indigo-950 to-rose-600 text-zinc-200 shadow-lg">
                    <div className="p-6 font-semibold text-md">
                        Please connect your Wallet.
                    </div>
                </div>
            )}
        </>
    )
}
export default IsConnected