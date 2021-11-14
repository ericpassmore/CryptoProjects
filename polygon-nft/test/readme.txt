
From
https://medium.com/pinata/how-to-create-layer-2-nfts-with-polygon-and-ipfs-aef998ff8ef2

switch to hardhat network comment out following 4 lines
matic: {
  url: "https://rpc-mumbai.maticvigil.com",
  accounts: [PRIVATE_KEY]
}

Run Test in Memory
npx hardhat test

switch back to matic network and uncomment four lines
matic: {
  url: "https://rpc-mumbai.maticvigil.com",
  accounts: [PRIVATE_KEY]
}

Deploy the contract
npx hardhat run scripts/deploy-script.js --network matic

mint
npx hardhat run scripts/mint-script.js --network matic

Find Owners
npx hardhat run scripts/get-token-script.js --network matic
