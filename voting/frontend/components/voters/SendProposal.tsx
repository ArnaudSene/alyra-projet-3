"use client"

import { writeContractByFunctionName } from "@/utils"
import { useState } from "react"
import { useToast } from "@chakra-ui/react"
import Event from "../Event"

const SendProposal = () => {
    const [proposal, setProposal] = useState('')
    const toast = useToast()

    const submitProposal = () => {
        if (proposal.trim().length <= 0) {
            toast({
                title: 'Invalid proposal.',
                description: 'Proposal can\'t be empty',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        } else {
            writeContractByFunctionName('addProposal', proposal).then(
                () => toast({
                    title: 'Proposal successfully added.',
                    description: `proposal: ${proposal}.`,
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
            <h2 className="font-bold text-lg text-center mb-3">Send a Proposal</h2>
            <form className="w-full m-auto p-3 pr-3">
                <div className="flex items-center border-b border-indigo-300 py-2">
                    <textarea className="w-full mr-3 p-2 leading-tight focus:outline-none bg-indigo-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-700 focus:border-indigo-900"
                        name="proposal"
                        required
                        placeholder="Describe you're proposal..."
                        value={proposal}
                        onChange={e => setProposal(e.target.value)}
                    />

                    <button className="content-center bg-indigo-950 hover:bg-indigo-100 hover:text-gray-900 text-white font-semibold py-2 px-4 rounded-lg"
                        type="button"
                        onClick={() => submitProposal()}
                    >
                        Send Proposal
                    </button>
                </div>
            </form>
        </section>

        <Event name='ProposalRegistered'></Event>
    </>);
}
export default SendProposal;