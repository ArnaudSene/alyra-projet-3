"use client"

import {useState} from "react"
import {readContractByFunctionName, writeContractByFunctionName} from "@/utils";
import {useWorkflowStatusContext} from "@/context/workflowStatus";
import VoterManager from "@/components/admin/VoterManager";
import Event from "@/components/Event";

const WorkflowManager = () => {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const { workflowStatus, setWorkflowStatus} = useWorkflowStatusContext()

    const WorkflowStatus: string[] = [
        "RegisteringVoters",
        "ProposalsRegistrationStarted",
        "ProposalsRegistrationEnded",
        "VotingSessionStarted",
        "VotingSessionEnded",
        "VotesTallied"
    ]

    const updateWorkflowStatus = (funcName: string) => {
        setError('')
        setSuccess('')

        writeContractByFunctionName(funcName).then(
            hash => {
                setSuccess(hash)
                getWorkflowStatus()
            }
        ).catch(
            err => setError(err.message)
        )
    }

    const getWorkflowStatus = async () => {
        readContractByFunctionName<number>('workflowStatus').then(
            id => setWorkflowStatus(id)
        ).catch(
            err => console.log(err.message)
        )
    }

    return (
        <>
            <div className="mx-auto w-3/4 rounded h-auto bg-gradient-to-r from-indigo-900 to-indigo-600 text-indigo-100 shadow-lg">
                <div className="p-4">
                    WorkflowStatus : {WorkflowStatus[workflowStatus]}
                </div>
            </div>

            {WorkflowStatus[workflowStatus] === "RegisteringVoters" ? (<VoterManager />) : (<></>)}

            {WorkflowStatus[workflowStatus] !== "VotesTallied" ? (

                <div className="mx-auto w-3/4 rounded h-auto bg-gradient-to-r from-indigo-900 to-indigo-600 text-indigo-100 shadow-lg">
                    <div className="p-4">

                        {WorkflowStatus[workflowStatus] === "RegisteringVoters" ? (
                            <button
                                onClick={() => updateWorkflowStatus("startProposalsRegistering")}
                                className="content-center bg-indigo-950 hover:bg-indigo-900 text-white font-semibold py-2 px-4 rounded-full"
                            >Start Proposals Registering</button>
                        ) : (<></>)}

                        {WorkflowStatus[workflowStatus] === "ProposalsRegistrationStarted" ? (
                            <button
                                onClick={() => updateWorkflowStatus("endProposalsRegistering")}
                                className="content-center bg-indigo-950 hover:bg-indigo-900 text-white font-semibold py-2 px-4 rounded-full"
                            >End Proposals Registering</button>
                        ) : (<></>)}

                        {WorkflowStatus[workflowStatus] === "ProposalsRegistrationEnded" ? (
                            <button
                                onClick={() => updateWorkflowStatus("startVotingSession")}
                                className="content-center bg-indigo-950 hover:bg-indigo-900 text-white font-semibold py-2 px-4 rounded-full"
                            >Start voting session</button>
                        ) : (<></>)}

                        {WorkflowStatus[workflowStatus] === "VotingSessionStarted" ? (
                            <button
                                onClick={() => updateWorkflowStatus("endVotingSession")}
                                className="content-center bg-indigo-950 hover:bg-indigo-900 text-white font-semibold py-2 px-4 rounded-full"
                            >End voting session</button>
                        ) : (<></>)}

                        {WorkflowStatus[workflowStatus] === "VotingSessionEnded" ? (
                            <button
                                onClick={() => updateWorkflowStatus("tallyVotes")}
                                className="content-center bg-indigo-950 hover:bg-indigo-900 text-white font-semibold py-2 px-4 rounded-full"
                            >Tally votes</button>
                        ) : (<></>)}
                    </div>

                </div>
            ) : (<></>)}

            {success && <div className="text-green-600 font-semibold p-4 text-center">Workflow status updated! Transaction: {success}</div>}
            {error && <div className="text-red-800 font-semibold p-4 text-center">{error}</div>}

            <Event name='WorkflowStatusChange'></Event>
        </>
    )
}
export default WorkflowManager