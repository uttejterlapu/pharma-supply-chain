const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  
  // Replace with your deployed contract address
  const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
  
  // ABI of the contract
  const contractABI = [
    "function addDrug(string memory _name, string memory _manufacturer, uint256 _manufactureDate, uint256 _expiryDate) public",
    "function transferOwnership(uint256 _drugId, address _newOwner) public",
    "function drugs(uint256) view returns (string memory, string memory, uint256, uint256, address)",
    "function drugCounter() view returns (uint256)",
    "event DrugAdded(uint256 drugId, string name, string manufacturer)",
    "event OwnershipTransferred(uint256 drugId, address newOwner)"
  ];
  
  // Create a contract instance
  const contract = new ethers.Contract(contractAddress, contractABI, deployer);

  // Example of adding a drug
  try {
    const tx = await contract.addDrug(
      "Aspirin",
      "PharmaCo",
      Math.floor(Date.now() / 1000), // Current timestamp
      Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60 // One year from now
    );
    await tx.wait(); // Wait for the transaction to be mined
    console.log("Drug added successfully.");
  } catch (error) {
    console.error("Error adding drug:", error);
  }

  // Example of transferring ownership
  try {
    // Assuming drug ID 1 and a new owner address (update with actual values)
    const newOwnerAddress = "0x1234567890abcdef1234567890abcdef12345678";
    const drugId = 1; // Update with actual drug ID
    const tx = await contract.transferOwnership(drugId, newOwnerAddress);
    await tx.wait(); // Wait for the transaction to be mined
    console.log("Ownership transferred successfully.");
  } catch (error) {
    console.error("Error transferring ownership:", error);
  }

  // Example of fetching a drug's details
  try {
    const drugId = 1; // Update with actual drug ID
    const drug = await contract.drugs(drugId);
    console.log(`Drug details: Name: ${drug[0]}, Manufacturer: ${drug[1]}, Manufacture Date: ${new Date(drug[2] * 1000)}, Expiry Date: ${new Date(drug[3] * 1000)}, Current Owner: ${drug[4]}`);
  } catch (error) {
    console.error("Error fetching drug details:", error);
  }

  // Example of getting the drug counter
  try {
    const count = await contract.drugCounter();
    console.log(`Total drugs added: ${count}`);
  } catch (error) {
    console.error("Error fetching drug counter:", error);
  }
}

// Run the script and handle errors
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
