"use client"

import { writeContractByFunctionName } from "@/utils"
import { useState } from "react"
import { useToast } from "@chakra-ui/react"
import Event from "../Event"

const SendVote = () => {
    const [vote, setVote] = useState('')
    const toast = useToast()

    const submitVote = () => {
        if (vote.trim().length <= 0) {
            toast({
                title: 'Invalid Vote',
                description: 'Vote can\'t be empty',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        } else {
            writeContractByFunctionName('setVote', vote).then(
                () => toast({
                    title: 'Voted',
                    description: `You're vote is registered.`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
            ).catch(
                err => toast({
                    title: 'Unknown error',
                    description: err.message,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            )
        }
    }

    return (<>
        <section className="m-2 mx-auto w-3/4 rounded h-auto bg-gradient-to-r from-indigo-900 to-indigo-800 text-indigo-100 shadow-lg drop-shadow-lg border-indigo-600 border">
            <h2 className="font-bold text-lg text-center mb-3">Vote for a Proposal</h2>
            <form className="w-full m-auto p-3 pr-3">
                <div className="flex justify-center items-center border-b border-indigo-300 py-2">
                    <input className="mr-3 p-2 leading-tight focus:outline-none bg-indigo-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-700 focus:border-indigo-900"
                        name="vote"
                        required
                        type="number"
                        placeholder="Vote for a proposal..."
                        value={vote}
                        onChange={e => setVote(e.target.value)}
                    />

                    <button className="content-center bg-indigo-950 hover:bg-indigo-100 hover:text-gray-900 text-white font-semibold py-2 px-4 rounded-lg"
                        type="button"
                        onClick={() => submitVote()}
                    >
                        Send Vote
                    </button>
                </div>
            </form>
        </section>
        
        <Event name='Voted'></Event>
    </>);
}
export default SendVote;