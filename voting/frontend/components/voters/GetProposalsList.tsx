"use client"

import { getProposalsRegisteredEvents, readContractByFunctionName } from "@/utils"
import { useEffect, useState } from "react"
import { useAccount } from "wagmi"
import { votingSessionStartedStatus, WorkflowStatus } from "@/constants"
import { useWorkflowStatusContext } from "@/context/workflowStatus"
import { useSelectProposalContext } from "@/context/SelectProposal"
import { Proposal } from "@/interfaces/Proposal"
import { Text } from "@chakra-ui/react"
import { Voter } from "@/interfaces/Voter"

const GetProposalsList = ({ refresh }: { refresh?: boolean }) => {
    const { address } = useAccount()

    const [proposals, setProposals] = useState<Proposal[]>([])
    const [voter, setVoter] = useState<Voter>()
    const [isVotingSession, setIsVotingSession] = useState(false)

    const { workflowStatus } = useWorkflowStatusContext()
    const { id, setDescription, setId } = useSelectProposalContext()

    const getListOfProposals = async () => {
        getProposalsRegisteredEvents().then(events => {
            let data: Proposal[] = []
            for (let i = 0; i < events.length; i++) {
                readContractByFunctionName<Proposal>('getOneProposal', address as `0x${string}`, i).then(
                    proposal => data = [...data, proposal]
                ).catch(err => console.log(err))
                .finally(() => {
                    setProposals(data)
                })
            }
        })
    }

    useEffect(() => {
        getListOfProposals()
        setIsVotingSession(WorkflowStatus[workflowStatus] === votingSessionStartedStatus)
        readContractByFunctionName<Voter>('getVoter', address as `0x${string}`, address as `0x${string}`).then(
            voter => setVoter(voter)
        ).catch(err => console.log(err))
    }, [workflowStatus, refresh])

    const onSelect = (index: string, description: string) => {
        setDescription(description)
        setId(index)
    }

    const checkSelectedProposal = (index: number): boolean => {
        return (voter?.hasVoted ? index.toString() === voter?.votedProposalId?.toString() : index.toString() === id)
    }

    return (proposals.length > 0 && (<>
        <div className="p-4 font-bold text-xl text-center">
            {!voter?.hasVoted && isVotingSession ? 'Select your proposal and vote' : 'List of proposals'}
        </div>

        {proposals?.map((proposal, index) =>
            <section key={index}>
                <article className={`p-5 flex flex-row ${voter?.hasVoted && checkSelectedProposal(index) ? 'bg-indigo-300' : ''}`}>
                    <div className="w-3/4 mx-auto">
                        <Text className="font-semibold pr-2">Proposal n°{index + 1}:</Text>
                        <Text>{proposal.description}</Text>
                    </div>

                    {isVotingSession &&
                        <button
                            className={`max-h-14 min-w-[15%] my-auto hover:bg-indigo-400 hover:text-gray-900 disabled:text-white text-white font-semibold rounded-lg p-4 ${checkSelectedProposal(index) ? 'bg-indigo-400 disabled:bg-indigo-400' : 'bg-indigo-950 disabled:bg-gray-500'}`}

                            id={index.toString()}
                            onClick={() => onSelect(index.toString(), proposal.description)}
                            type="button"
                            disabled={voter?.hasVoted}
                        >
                            {checkSelectedProposal(index) ? 'Selected Proposal' : 'Select Proposal'}
                        </button>
                    }
                </article>

                <hr className="my-2 border-gray-400" />
            </section>
        )
        }
    </>));
}

export default GetProposalsList

