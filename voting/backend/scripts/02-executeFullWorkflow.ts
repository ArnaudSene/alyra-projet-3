import { ethers } from "hardhat"

async function main() {
    const [owner] = await ethers.getSigners()
    const Voting = await ethers.getContractFactory("Voting")
    let voting = await Voting.connect(owner).deploy()
    await voting.waitForDeployment()
    const smartContractAddress = await voting.getAddress()

    // maxSigners:  max signers minus owner
    // 0 => means all signers
    // 5 => the 5 first signers
    const maxSigners = 5
    const accounts: any[] = []
    const proposalTemplate = "Proposal number "

    // voters accounts
    await ethers.getSigners()
      .then( signers => {
          for (let i = 1; i < signers.length; i++) {
              if (maxSigners > 0 && i > maxSigners) break
              accounts.push(signers[i])
          }
      })

    // Add Voters
    console.log(`Add ${accounts.length} voters`)
    for (let i = 0; i < accounts.length; i++) {
        // Add Voters
        await voting.addVoter(accounts[i].address)
        console.log("Add voter: " + accounts[i].address)

        // Get Voters
        const voter = await voting.connect(accounts[i]).getVoter(accounts[i].address as any)
        console.log(`voter info: \n\taccount: ${accounts[i].address}\n\tisRegistered: ${voter.isRegistered}\n\thasVoted: ${voter.hasVoted}\n\tvotedProposalId: ${voter.votedProposalId}`)
    }

    // Move next status to allow adding proposal by voters
    console.log("Move next status to allow adding proposal by voters")
    await voting.startProposalsRegistering()

    // Add Proposals
    for (let i = 0; i < accounts.length; i++) {
        const proposal = `${proposalTemplate} ${i.toString()}`

        await voting.connect(accounts[i]).addProposal(proposal)

        // get proposal information
        const proposalInfo = await voting.connect(accounts[i]).getOneProposal(i)
        console.log(`Proposal info: \n\tdescription: ${proposalInfo.description},\n\tvoteCount: ${proposalInfo.voteCount}`)
    }

    // Move next status to allow voting by voters
    console.log("Move next status to allow voting by voters")
    await voting.endProposalsRegistering()
    await voting.startVotingSession()

    // Vote
    console.log("vote for proposals")
    for (let i = 0; i < accounts.length; i++) {
        await voting.connect(accounts[i]).setVote(i)
    }

    // Move next status to close vote session
    console.log("Move next status to close vote session")
    await voting.endVotingSession()
    await voting.tallyVotes()

    // Resume
    console.log("\nResume\n\tSmart contract address: " + smartContractAddress)
    accounts.map((account) => console.log(`\taccount: ${account.address}`))
}

main().catch((error) => {
  console.error("error => " + error)
  process.exitCode = 1
});