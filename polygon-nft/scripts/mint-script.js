const hre = require("hardhat");
async function main() {
  const NFT = await hre.ethers.getContractFactory("MyFirstNFT");
  const URI = "ipfs://QmYB18VoAbEeAuE5i3wvFjduGXLTfBeXinrb4J1jmdjtK7"
  const WALLET_ADDRESS = "0x2b554887E23670187347380E6C409e428c88B9C3"
  const CONTRACT_ADDRESS = "0x8c6F8eaE7b80D5AE59c6bEA39B2DaF5A8531d452"
  const contract = NFT.attach(CONTRACT_ADDRESS);
  await contract.mint(WALLET_ADDRESS, URI);
  console.log("NFT minted:", contract);
}
main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});
