require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    hardhat: {},
    // Configure other networks like Ganache or Ethereum Mainnet/Testnets here
  },
  // Optional: Add an etherscan API key for contract verification
  etherscan: {
    apiKey: "process.env.ETHERSCAN_API_KEY"
  }
};
