require('dotenv').config();
const PRIVATE_KEY = process.env.PRIVATE_KEY;

require("@nomiclabs/hardhat-waffle");

const needsInfura = process.env.npm_config_argv &&
      process.env.npm_config_argv.includes('PRIVATE_KEY');

if ((!PRIVATE_KEY) && needsInfura) {
  console.error('Please set a private key.');
  process.exit(0);
}

/**
 * @type import('hardhat/config').HardhatUserConfig
 * orig
 module.exports = {
   solidity: "0.8.4",
 };
 https://rpc-endpoints.superfluid.dev/mumbai

 */

module.exports = {
  defaultNetwork: "matic",
  networks: {
    hardhat: {
    },
    matic: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [PRIVATE_KEY]
    }
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 20000
  }
}
