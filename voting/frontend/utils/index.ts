import { abi, contractAddress, network, ProposalsRegistered } from "@/constants"
import { Voter } from "@/interfaces/Voter"
import { readContract, prepareWriteContract, writeContract } from "@wagmi/core"
import { BaseError, ContractFunctionRevertedError, createPublicClient, http, parseAbiItem } from "viem"
import { hardhat, sepolia } from "viem/chains"
import {Proposal} from "@/interfaces/Proposal";

export const getWorkflowStatus = async (address: `0x${string}`): Promise<number> => {
    return readContractByFunctionName<number>('workflowStatus', address )
}

const usedNetwork = () => {
    switch (network) {
        case 'sepolia': return sepolia
        case 'hardhat': return hardhat
    }
}

export const client = createPublicClient({
    chain: usedNetwork(),
    transport: http()
})

export const userIsOwner = async (address: `0x${string}`): Promise<boolean> => {
    return readContractByFunctionName<`0x${string}`>('owner', address).then(
        hash => hash === address
    ).catch(() => false)
}

export const userIsVoter = async (address: `0x${string}`): Promise<boolean> => {
    return readContractByFunctionName<Voter>('getVoter', address, address).then(
        data => data && data.isRegistered
    ).catch(() => false)
}

export const GetProposals = async (address: `0x${string}`, logId: number): Promise<Proposal> => {
    return readContractByFunctionName<Proposal>('getOneProposal', address, logId).then(
        proposal => proposal
    )
}

export const readContractByFunctionName = async <T>(functionName: string, address: `0x${string}`, ...args: `0x${string}`[]|string[]|number[]): Promise<T> => {

    try {
        const data: Promise<T>|unknown = await readContract({
            address: contractAddress,
            abi: abi,
            functionName: functionName,
            account: address,
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

export const getContractEvents = async () => {
    try {
        const logs = await client.getLogs({
            address: contractAddress,
            event: parseAbiItem(ProposalsRegistered),
            fromBlock: 0n,
            toBlock: 'latest'
        })
        console.log("event ProposalsRegistered result => " + logs.length)
        return logs

    } catch (err) {
        throw formattedError(err)
    }
}


const formattedError = (err: any): Error => {
    if (err instanceof BaseError) {
        // Option 1: checking the instance of the error
        if (err.cause instanceof ContractFunctionRevertedError) {
            const cause: ContractFunctionRevertedError = err.cause
            const error = cause.reason ?? 'Unknown error'

            throw new Error(error)
        }

        // Option 2: using `walk` method from `BaseError`
        const revertError: any = err.walk(err => err instanceof ContractFunctionRevertedError)
        if (revertError) {
            const error = revertError.data?.message ?? 'Unknown error'

            throw new Error(error)
        }
    }


    throw new Error(err.message)
}