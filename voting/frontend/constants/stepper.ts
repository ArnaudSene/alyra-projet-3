const RegisteringVoters: WorkflowStepper = {
    id: 0,
    title: "RegisteringVoters",
    description: "Registering voters session [Admin]",
}

const ProposalsRegistrationStarted: WorkflowStepper = {
    id: 1,
    title: "ProposalsRegistrationStarted",
    description: "Registering proposals session [voters]",
}

const ProposalsRegistrationEnded: WorkflowStepper = {
    id: 3,
    title: "ProposalsRegistrationEnded",
    description: "End of proposal registration",
}
const VotingSessionStarted: WorkflowStepper = {
    id: 4,
    title: "VotingSessionStarted",
    description: "Voting Session [voters]",
}

const VotingSessionEnded: WorkflowStepper = {
    id: 5,
    title: "VotingSessionEnded",
    description: "End of voting session",
}

const VotesTallied: WorkflowStepper = {
    id: 6,
    title: "VotesTallied",
    description: "Votes Tailed",
}

export interface WorkflowStepper {
    id: number
    title: string
    description: string
}

export const WorkflowStatusStepper: WorkflowStepper[] = [
    RegisteringVoters,
    ProposalsRegistrationStarted,
    ProposalsRegistrationEnded,
    VotingSessionStarted,
    VotingSessionEnded,
    VotesTallied
]