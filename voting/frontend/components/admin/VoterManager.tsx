"use client"

import { useState } from "react";
import { writeContractByFunctionName } from "@/utils"

const VoterManager = () => {
    const validAddress = new RegExp("^0x[a-fA-F0-9]{40}$")

    const [newVoter, setNewVoter] = useState('')
    const [error, setError] = useState('')
    const [sucess, setSucess] = useState('')

    const addVoter = async () => {
        setError('')
        setSucess('')

        if (!validAddress.test(newVoter)) {
            setError('Invalid etherum address');
        } else {
            writeContractByFunctionName('addVoter', newVoter).then(
                hash => setSucess(hash as string)
            ).catch(
                err => setError(err.message)
            )
        }
    }

    return (
        <section className="mx-auto w-3/4 rounded h-auto bg-gradient-to-r from-lime-300 to-lime-200 text-blue-gray-700 shadow-lg">
            <div className="flex justify-between p-3">
                <div className="m-auto w-3/4">
                    <input type="text" onChange={e => setNewVoter(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-700 focus:border-yellow-700 block w-full p-2" placeholder="Voter address" />
                </div>

                <div className="m-auto w-1/4 text-center">
                    <button onClick={() => addVoter()} className="content-center bg-yellow-700 hover:bg-yellow-900 text-white font-semibold py-2 px-4 rounded-full">
                        Add Voter
                    </button>
                </div>
            </div>

            {sucess && <div className="text-green-600 font-semibold p-4 text-center">Voter added with sucess ! Transaction: {sucess}</div>}
            {error && <div className="text-red-800 font-semibold p-4 text-center">{error}</div>}
        </section>
    )
}
export default VoterManager;