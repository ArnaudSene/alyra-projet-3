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


    // Resume
    console.log("\nResume\n\tSmart contract address: " + smartContractAddress)
    accounts.map((account) => console.log(`\taccount: ${account.address}`))
}

main().catch((error) => {
  console.error("error => " + error)
  process.exitCode = 1
});