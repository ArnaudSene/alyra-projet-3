# Changelog

## 0.12.0 (2023-06-30)

### feat: Refactoring + Implement Send vote

- Add Proposal interface
- Refactor the ProposalManager in SendProposal and SendVote
- Implement SendVote
- Refactor admin page with new WinningProposal component
- Refactor WorkflowManager
- Fix the refresh of WorkflowStatus

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