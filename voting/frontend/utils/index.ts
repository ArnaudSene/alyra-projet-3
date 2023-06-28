import { abi, contractAddress } from "@/constants"
import { readContract, prepareWriteContract, writeContract } from "@wagmi/core"
import { BaseError, ContractFunctionRevertedError } from "viem"
import { useContractEvent } from "wagmi"

export const readContractByFunctionName = async (functionName: string, ...args: any): Promise<any> => {
    return await readContract({
        address: contractAddress,
        abi: abi,
        functionName: functionName,
        args: args
    })
}

export const prepareWriteContractByFunctionName = async (functionName: string, ...args: any): Promise<any> => {
    return await prepareWriteContract({
        address: contractAddress,
        abi: abi,
        functionName: functionName,
        args: args
    })
}

export const writeContractByFunctionName = async (functionName: string, ...args: any): Promise<`0x${string}`| undefined> => {
    try {
        const { request } = await prepareWriteContractByFunctionName(functionName, ...args)
        const { hash } = await writeContract(request)
        
        return hash
    } catch (err: any) {
        if (err instanceof BaseError) {
            // Option 1: checking the instance of the error
            if (err.cause instanceof ContractFunctionRevertedError) {
                const cause: ContractFunctionRevertedError = err.cause
                const error = cause.data?.errorName ?? 'Unkown error'

                throw new Error(error)
            }
    
            // Option 2: using `walk` method from `BaseError`
            const revertError: any = err.walk(err => err instanceof ContractFunctionRevertedError)
            if (revertError) {
                const error = revertError.data?.message ?? 'Unkown error'
                
                throw new Error(error)
            }
        }
    }
}

export const useContractEventByName = (eventName: string): any => {
    useContractEvent({
        address: contractAddress,
        abi: abi,
        eventName: eventName,
        listener(log) {
            return new Promise(() => log)
        },
    })
}