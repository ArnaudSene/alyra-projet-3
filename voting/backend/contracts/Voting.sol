// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title A voting system
 * @author Arnaud SENE & Alexandre Caliaro
 * @notice This contract allows voters to make a vote
 * Owner is able to add voters, start/end proposal registration, start/end vote session, tally votes
 *
 * Voters are able to add proposals, vote for proposals
 *
 * This contract is only for exercise
 */
contract Voting is Ownable {

    /**
     * @notice Winning proposal id
     */
    uint public winningProposalID;

    /// @dev A structure that define a voter
    struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint votedProposalId;
    }

    /// @dev A structure that de fine a proposal
    struct Proposal {
        string description;
        uint voteCount;
    }

    /// @dev An enum of workflow status used during vote process
    enum  WorkflowStatus {
        RegisteringVoters,
        ProposalsRegistrationStarted,
        ProposalsRegistrationEnded,
        VotingSessionStarted,
        VotingSessionEnded,
        VotesTallied
    }

    /// @notice Represent the current workflow status
    WorkflowStatus public workflowStatus;

    /// @dev Stores Proposal structs
    Proposal[] proposalsArray;

    /// @dev Stores Voter structs
    mapping (address => Voter) voters;

    /**
     * @notice An event is emitted when the voter is registered
     * @param voterAddress The Voter address
     */
    event VoterRegistered(address voterAddress);

    /**
     * @notice An event is emitted when the workflow status is modified
     * @param previousStatus The previous workflow status
     * @param newStatus The new workflow status
     */
    event WorkflowStatusChange(WorkflowStatus previousStatus, WorkflowStatus newStatus);

    /**
     * @notice An event is emitted when a proposal is registered
     * @param proposalId The Proposal id
     */
    event ProposalRegistered(uint proposalId);

    /**
     * @notice An event is emitted when a vote is registered
     * @param voter The Voter address
     */
    event Voted (address voter, uint proposalId);

    /// @notice A modifier to restrict actions only for voters
    modifier onlyVoters() {
        require(voters[msg.sender].isRegistered, "You're not a voter");
        _;
    }

    /**
     * @notice Get voter's information by his address
     * Only voters are able to get this information
     *
     * @param _addr The Voter address
     * @return Voter The Voter struct
     */
    function getVoter(address _addr) external onlyVoters view returns (Voter memory) {
        return voters[_addr];
    }

    /**
     * @notice Get a proposal by his id
     * Only voters are able to get this information
     *
     * @param _id The Proposal id
     * @return Proposal The Proposal
     */
    function getOneProposal(uint _id) external onlyVoters view returns (Proposal memory) {
        return proposalsArray[_id];
    }

    /**
     * @notice Add (register) a voter
     * A voter will be able to add and vote for proposal
     * Only Owner is able to add voters
     * Only when workflow status is RegisteringVoters
     * Only for new voter
     *
     * An event VoterRegistered is emitted when a voter is registered
     *
     * @param _addr The Voter address
     */
    function addVoter(address _addr) external onlyOwner {
        require(workflowStatus == WorkflowStatus.RegisteringVoters, 'Voters registration is not open yet');
        require(voters[_addr].isRegistered != true, 'Already registered');

        voters[_addr].isRegistered = true;
        emit VoterRegistered(_addr);
    }

    /**
     * @notice Add a new proposal
     * Only Voters are able to add proposals
     * Only when workflow status is ProposalsRegistrationStarted
     * Unable to add an empty proposal
     *
     * An event ProposalRegistered is emitted when a proposal is added
     *
     * @param _desc The Proposal description
     */
    function addProposal(string calldata _desc) external onlyVoters {
        require(workflowStatus == WorkflowStatus.ProposalsRegistrationStarted, 'Proposals are not allowed yet');
        require(keccak256(abi.encode(_desc)) != keccak256(abi.encode("")), 'Vous ne pouvez pas ne rien proposer'); // facultatif

        Proposal memory proposal;
        proposal.description = _desc;
        proposalsArray.push(proposal);
        emit ProposalRegistered(proposalsArray.length-1);
    }

    /**
     * @notice Vote for a proposal
     * Only Voters are able to vote
     * Only when workflow status is VotingSessionStarted
     * The Proposal must exist
     *
     * An event Voted is emitted when a vote has been done
     *
     * @param _id The Proposal id
     */
    function setVote(uint _id) external onlyVoters {
        require(workflowStatus == WorkflowStatus.VotingSessionStarted, 'Voting session havent started yet');
        require(voters[msg.sender].hasVoted != true, 'You have already voted');
        require(_id < proposalsArray.length, 'Proposal not found'); // pas obligé, et pas besoin du >0 car uint

        voters[msg.sender].votedProposalId = _id;
        voters[msg.sender].hasVoted = true;
        proposalsArray[_id].voteCount++;

        emit Voted(msg.sender, _id);
    }

    /**
     * @notice Start the proposal registration session
     * Only Owner is able to start the session
     * Only when workflow status is RegisteringVoters
     *
     * @dev The first proposal is set as GENESIS
     *
     * An event WorkflowStatusChange is emitted when the session has been started
     */
    function startProposalsRegistering() external onlyOwner {
        require(workflowStatus == WorkflowStatus.RegisteringVoters, 'Registering proposals cant be started now');
        workflowStatus = WorkflowStatus.ProposalsRegistrationStarted;

        Proposal memory proposal;
        proposal.description = "GENESIS";
        proposalsArray.push(proposal);

        emit WorkflowStatusChange(WorkflowStatus.RegisteringVoters, WorkflowStatus.ProposalsRegistrationStarted);
    }

    /**
     * @notice Stop the proposal registration session
     * Only Owner is able to stop the session
     * Only when workflow status is ProposalsRegistrationStarted
     *
     * An event WorkflowStatusChange is emitted when the session has been stopped
     */
    function endProposalsRegistering() external onlyOwner {
        require(workflowStatus == WorkflowStatus.ProposalsRegistrationStarted, 'Registering proposals havent started yet');
        workflowStatus = WorkflowStatus.ProposalsRegistrationEnded;
        emit WorkflowStatusChange(WorkflowStatus.ProposalsRegistrationStarted, WorkflowStatus.ProposalsRegistrationEnded);
    }

    /**
     * @notice Start the voting session
     * Only Owner is able to start the session
     * Only when workflow status is ProposalsRegistrationEnded
     *
     * An event WorkflowStatusChange is emitted when the session has been started
     */
    function startVotingSession() external onlyOwner {
        require(workflowStatus == WorkflowStatus.ProposalsRegistrationEnded, 'Registering proposals phase is not finished');
        workflowStatus = WorkflowStatus.VotingSessionStarted;
        emit WorkflowStatusChange(WorkflowStatus.ProposalsRegistrationEnded, WorkflowStatus.VotingSessionStarted);
    }

    /**
     * @notice Stop the voting session
     * Only Owner is able to stop the session
     * Only when workflow status is VotingSessionStarted
     *
     * An event WorkflowStatusChange is emitted when the session has been stopped
     */
    function endVotingSession() external onlyOwner {
        require(workflowStatus == WorkflowStatus.VotingSessionStarted, 'Voting session havent started yet');
        workflowStatus = WorkflowStatus.VotingSessionEnded;
        emit WorkflowStatusChange(WorkflowStatus.VotingSessionStarted, WorkflowStatus.VotingSessionEnded);
    }

    /**
     * @notice Tally votes
     * Only Owner is able to tally the votes
     * Only when workflow status is VotingSessionEnded
     *
     * An event WorkflowStatusChange is emitted when the tally has been done
     */
    function tallyVotes() external onlyOwner {
        require(workflowStatus == WorkflowStatus.VotingSessionEnded, "Current status is not voting session ended");
        uint _winningProposalId;
        for (uint256 p = 0; p < proposalsArray.length; p++) {
            if (proposalsArray[p].voteCount > proposalsArray[_winningProposalId].voteCount) {
                _winningProposalId = p;
            }
        }
        winningProposalID = _winningProposalId;

        workflowStatus = WorkflowStatus.VotesTallied;
        emit WorkflowStatusChange(WorkflowStatus.VotingSessionEnded, WorkflowStatus.VotesTallied);
    }
}