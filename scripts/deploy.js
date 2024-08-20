const hre = require("hardhat");

async function main() {
  // Get the deployer account
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Get the contract factory and deploy
  const Token = await hre.ethers.getContractFactory("PharmaSupplyChain");
  const token = await Token.deploy();

  // Wait for the contract to be deployed
  await token.deployed();

  console.log("Contract deployed to address:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
