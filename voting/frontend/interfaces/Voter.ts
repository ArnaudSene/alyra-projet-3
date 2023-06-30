export interface Voter {
    hasVoted: boolean
    isRegistered: boolean
    votedProposalId?: number
}

export interface Proposal {
    description: string;
    voteCount: number;
}