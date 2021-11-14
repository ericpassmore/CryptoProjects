const hre = require("hardhat");
async function main() {
  const NFT = await hre.ethers.getContractFactory("MyFirstNFT");
  const CONTRACT_ADDRESS = "0x8c6F8eaE7b80D5AE59c6bEA39B2DaF5A8531d452"
  const contract = NFT.attach(CONTRACT_ADDRESS);
  const owner = await contract.ownerOf(1);
  console.log("Owner:", owner);
  const uri = await contract.tokenURI(1);
  console.log("URI: ", uri);
}
main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});
