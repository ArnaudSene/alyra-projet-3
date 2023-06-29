"use client"

import { writeContractByFunctionName } from "@/utils"
import { useState } from "react"

const ProposalManager = () => {
    const [proposal, setProposal] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const submitProposal = () => {
        setError('')
        setSuccess('')

        if (proposal.trim().length <= 0) {
            setError('Proposal can\'t be empty')
        } else {
            writeContractByFunctionName('addProposal', proposal).then(
                hash => setSuccess(hash)
            ).catch(
                err => setError(err.message)
            )
        }
    }

    return (
        <section className="m-auto mt-2 w-3/4 rounded h-auto bg-gradient-to-r from-indigo-900 to-indigo-600 text-indigo-100 shadow-lg">
            <form className="w-full max-w-sm m-auto p-3">
                <div className="flex items-center border-b border-indigo-400 py-2">
                    <textarea className="appearance-none bg-transparent border-none w-full text-gray-50 mr-3 py-1 px-2 leading-tight focus:outline-none"
                        name="proposal"
                        required
                        placeholder="Describe you're proposal..."
                        value={proposal}
                        onChange={e => setProposal(e.target.value)}
                    />

                    <button className="flex-shrink-0 bg-indigo-950 hover:bg-indigo-900 font-semibold border border-indigo-400 text-white py-1 px-2 rounded"
                        type="button"
                        onClick={() => submitProposal()}
                    >
                        Send Proposal
                    </button>
                </div>
            </form>

            {success && <div className="text-green-600 font-semibold p-4 text-center">Proposal added with success ! Transaction: {success}</div>}
            {error && <div className="text-red-600 font-semibold p-4 text-center">{error}</div>}
        </section>
    );
}
export default ProposalManager;