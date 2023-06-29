import { abi, contractAddress } from "@/constants"
import { Voter } from "@/interfaces/Voter"
import { readContract, prepareWriteContract, writeContract } from "@wagmi/core"
import { BaseError, ContractFunctionRevertedError } from "viem"

export const userIsOwner = async (address: `0x${string}`): Promise<boolean> => {
    return readContractByFunctionName<`0x${string}`>('owner').then(
        hash => hash === address
    ).catch(() => false)
}

export const userIsVoter = async (address: `0x${string}`): Promise<boolean> => {
    return readContractByFunctionName<Voter>('getVoter', address).then(
        data => data && data.isRegistered
    ).catch(() => false)
}

export const readContractByFunctionName = async <T>(functionName: string, ...args: `0x${string}`[]|string[]): Promise<T> => {
    try {
        const data: Promise<T>|unknown = await readContract({
            address: contractAddress,
            abi: abi,
            functionName: functionName,
            args: args
        })

        return data as T
      } catch (err) {
        throw formattedError(err)
      }
}

export const writeContractByFunctionName = async (functionName: string, ...args: `0x${string}`[]|string[]): Promise<`0x${string}`> => {
    try {
        const { request } = await prepareWriteContract({
            address: contractAddress,
            abi: abi,
            functionName: functionName,
            args: args
        })

        const { hash } = await writeContract(request)
        
        return hash
    } catch (err) {
        throw formattedError(err)
    }
}

const formattedError = (err: any) => {
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

    throw new Error(err.message)
}