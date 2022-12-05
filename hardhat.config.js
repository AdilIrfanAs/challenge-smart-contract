require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

module.exports = {
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: "https://goerli.infura.io/v3/",
      accounts: [process.env.PK]
    }
  },
  etherscan: {
    apiKey: process.env.BSCSCAN_API_KEY // etherscan
    
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