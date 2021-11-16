const { expect } = require("chai");

/* Get the Wallet Address */
require('dotenv').config();
const MY_WALLET = process.env.MY_WALLET;

const needsInfura = process.env.npm_config_argv &&
      process.env.npm_config_argv.includes('MY_WALLET');

if ((!MY_WALLET) && needsInfura) {
  console.error('Please set a wallet address.');
  process.exit(0);
}

/**
 * Tests
 */
describe("WhiteWolf", function() {
  it("It should deploy the contract, mint a token, and match the expected name & symbol", async function() {
    const WWOLF = await ethers.getContractFactory("WhiteWolf");
    const whiteWolf = await WWOLF.deploy(MY_WALLET);
    await whiteWolf.deployed();
    expect(await whiteWolf.name()).to.equal("WhiteWolf");
    expect(await whiteWolf.symbol()).to.equal("WWOLF");
  });
});
