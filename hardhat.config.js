require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

module.exports = {
  defaultNetwork: "bsc_testnet",
  networks: {
    hardhat: {},
    bsc_testnet: {
      url: "https://data-seed-prebsc-1-s3.binance.org:8545",
      accounts: [process.env.PK]
    }
  },
  etherscan: {
    apiKey: process.env.BSCSCAN_API_KEY // bscscan
    
  },
  solidity: {
    compilers: [
      {
        version: "0.8.9"
      },
    ],
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      },
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 2000000
  }
}