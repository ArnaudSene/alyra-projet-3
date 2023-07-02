"use client"

import { getContractEvents, GetProposals } from "@/utils"
import { useEffect, useState } from "react"
import { useAccount } from "wagmi";
import { votingSessionStartedStatus, WorkflowStatus } from "@/constants";
import { useWorkflowStatusContext } from "@/context/workflowStatus";
import { useSelectProposalContext } from "@/context/SelectProposal";

const GetProposalsList = ({addNewProposal}: {addNewProposal?: boolean}) => {

    const { address } = useAccount()
    const [proposals, setProposals] = useState<string[]>([])
    const { workflowStatus } = useWorkflowStatusContext()
    const [title, setTitle] = useState("List of proposals")
    const { setDescription, setId} = useSelectProposalContext()

    const GetListOfProposals = () => {
        getContractEvents().then(events => {
            let data: string[] = []

            for (let i = 0; i < events.length; i++) {
                GetProposals(address as `0x${string}`, i)
                    .then(
                        proposal => {
                            data = [...data, proposal.description]
                        })
                    .catch(err => console.log("err => " + err))
                    .finally(() => {
                        setProposals(data)
                    })
            }
        })
    }

    useEffect(() => {
        console.log("triggered by => " + addNewProposal)
        GetListOfProposals()
        if (WorkflowStatus[workflowStatus] === votingSessionStartedStatus) setTitle("Select your proposal and vote")
    }, [workflowStatus, addNewProposal])

    const onSelect = (index: string, description: string) => {
        setDescription(description)
        setId(index)
    }

    return (<>
        <div className="p-4 font-bold text-xl text-center">{title}</div>
        <div className="flex flex-col">
            {proposals.length > 0 &&
                proposals?.map((description, index) => (
                    <div className="p-1 w-3/4 mx-auto ">

                        <button
                            className="w-full content-center bg-indigo-950 hover:bg-indigo-400 hover:text-gray-900 text-white font-semibold rounded-lg py-5 px-4 "
                            id={index.toString()}
                            onClick={() => onSelect(index.toString(), description)} type="button" >
                            {description}
                        </button>

                    </div>
                ))}
        </div>
    </>);
}

export default GetProposalsList

