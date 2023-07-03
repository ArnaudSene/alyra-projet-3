import { ethers } from "hardhat"

async function main() {
  const Voting = await ethers.deployContract("Voting")
  await Voting.waitForDeployment()
  const latestBlock = await ethers.provider.getBlock("latest")

  console.log(`Voting deployed to ${Voting.target} at block ${latestBlock?.number}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
