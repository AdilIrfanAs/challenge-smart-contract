require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

module.exports = {
  defaultNetwork: "bsc_testnet",
  networks: {
    hardhat: {},
    bsc_testnet: {
      chainId: 97,
      url: "https://data-seed-prebsc-1-s3.binance.org:8545",
      accounts: [process.env.PK]
    },
    goerli: {
      chainId: 5,
      url: "https://goerli.infura.io/v3/"+process.env.INFURA,
      accounts: [process.env.PK]
    }
  },
  etherscan: {
    apiKey: process.env.BSCSCAN_API_KEY // etherscan
    
  },
  solidity: {
    compilers: [
      {
        version: "0.6.12"
      },
      {
        version: "0.5.16"
      },
      {
        version: "0.5.0"
      },
      {
        version: "0.4.23"
      }
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