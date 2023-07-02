import { ethers } from "hardhat";

async function main() {
  const Voting = await ethers.deployContract("Voting");
  await Voting.waitForDeployment();
  const latestBlock = await ethers.provider.getBlock("latest")

  console.log(
      `Voting deployed to ${Voting.target} at block ${latestBlock?.number}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});