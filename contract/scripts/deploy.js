const hre = require("hardhat");

async function main() {
  // Fetch the contract to deploy
  const BattleToken = await hre.ethers.getContractFactory("BattleToken");

  // Get the first signer to use as the initial owner
  const [deployer] = await hre.ethers.getSigners();
  
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy the contract with the initial owner address 
  const battleToken = await BattleToken.deploy(deployer.address);

  // Wait for deployment to be mined
  await battleToken.deployTransaction.wait();

  // Log the deployed contract address
}