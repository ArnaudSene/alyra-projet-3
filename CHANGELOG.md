# Changelog

## [0.19.0] (2023-07-03)

### feat: Update design

- Update design
  - Add ChakraUI Theme
  - Implement an AppButton
  - Change Stepper emoji

---

## [0.18.0] (2023-07-03)

### feat: Add scripts 

- 01 Deploy smart contract
- 02 Execute full workflow
- 03 Add voters
- 04 Add voters and proposals
- 05 Add voters, proposals and votes

---

## [0.17.0] (2023-07-03)

### feat: Implementation of WinningProposal + Fixes of PR#22

- Refactor codes of many components
- Implements all fixes for PR#22
- Implement WinningProposal

---

## [0.16.0] (2023-07-02)

### feat: Update smart contrat for winningProposal

- Add `getWinningProposal`, a new public method to get the winning proposal 
- Restricted to status as `VotesTallied`
- Update the `winningProposalID` variable to private

---

## [0.15.0] (2023-07-02)

### feat: Refacto home page

- Align Wallet button + title on home page
- Component for title

---

## [0.14.1] (2023-07-02)

### fix: Chakra bug with attributes in Stepper + Context Proposal 

- Chakra bug with attributes in Stepper
  - gap & _horizontal unrecognized 
- Add a context for proposals. It aims to select a proposal to be submit for vote 

---

## [0.14.0] (2023-07-02)

### feat: Stepper/ListProposals/SendVote...

- Add a stepper to follow the workflow status
- Add list of proposal and select to submit a vote
- Remove the text inside an input after submit
- Fix some minors issues

---

## 0.13.0 (2023-06-30)

### fix: Add Loader component + fix on sepolia

- Add Loader component
- Some fixes on sepolia

---

## 0.12.0 (2023-06-30)

### feat: Refactoring + Implement Send vote

- Add Proposal interface
- Refactor the ProposalManager in SendProposal and SendVote
- Implement SendVote
- Refactor admin page with new WinningProposal component
- Refactor WorkflowManager
- Fix the refresh of WorkflowStatus

## 0.11.1 (2023-06-30)

### fix: readContract needs address as params 

- readContractByFunctionName receive a new mandatory parameter
  - readContract function has an optional parameter `account`. Unfortunately the request fails If this parameter is excluded
  - https://viem.sh/docs/contract/readContract.html#account-optional

---

## 0.11.0 (2023-06-29)

### style: chakra-ui toast + css update

- Use chakra-ui toast component for success/error info
- Update RainbowKit style
- Update CSS style

---

## 0.10.0 (2023-06-29)

### feat: Manage past event logs

- Manage past event logs for add voters

---

## 0.9.0 (2023-06-29)

### feat: Manage workflow status 

- New component to manage workflow status
- Add context for workflow status 

---

## 0.8.0 (2023-06-29)

### style: Update CSS design

- Switch to `darkmode` body
- Update headers component style

---

## 0.7.0 (2023-06-29)

### feat: Set restriction for Admin & Voter section

- Set Admin restriction Header menu
- Set Voter restriction Header menu
- Set Admin restriction on admin page
- Set Voter restriction on voter page

---

## 0.6.0 (2023-06-29)

### feat: Add ProposalManager

- Voter can add a proposal
- Event added when adding proposal
- Minor fix on `writeContractByFunctionName` utils function return type

---

## 0.5.0 (2023-06-28)

### feat: Add Components + Voter feature

- Add Event, IsConnected, GetVoter and VoterManager components
- Add Voter interface
- Implement @/utils for utils functions
- Implement feat for voters
- getVoter

---

## 0.4.0 (2023-06-28)

### feat: Add admin + owner pages

- Add admin and owner pages
- implement feat for admin
  - check if user is the owner
  - get winningProposalID
  - get WorkflowStatus
  - add a voter

---

## 0.3.0 (2023-06-27)

### feat: Add .env + projectId

- Add .env.development
- Add .env.production
- set projectId

---

## 0.2.0 (2023-06-22)

### feat: Add NatSpec for Voting

- Add NatSpec for Voting Smart Contract

---

## 0.1.0 (2023-06-22)

### feat: Manage environment variable

- manage projectId through environment variable
- manage test network for development

---

## 0.1.0 (2023-06-22)

### feat: Init project 

- Init project with 
  - NEXT.js
  - Hardhat
  - RainbowKit
  - Wagmi
- Setup RainbowKit with first button
- Add Voting.sol Smart Contract + deploy script

---