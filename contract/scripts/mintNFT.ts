import { ethers } from 'hardhat'
const ContractJson = require('../artifacts/contracts/NFT.sol/NFT.json')

const abi = ContractJson.abi

const { ALCHEMY_API_KEY, PRIVATE_KEY, NFT_CONTRACT_ADDRESS } = process.env

async function main() {
  const alchemy = new ethers.providers.AlchemyProvider(
    'maticmum',
    ALCHEMY_API_KEY,
  )
  if (!PRIVATE_KEY) {
    throw new Error('')
  }
  const signer = new ethers.Wallet(PRIVATE_KEY, alchemy)

  if (!NFT_CONTRACT_ADDRESS) {
    throw new Error('')
  }
  const nftContract = new ethers.Contract(NFT_CONTRACT_ADDRESS, abi, signer)
  const tokenUri =
    'https://gateway.pinata.cloud/ipfs/QmaPCwYBbeyxV1avWxyP6xMX58RDBpwfMXU6oFK3487Y9g'

  let nftTxn = await nftContract.mintNFT(signer.address, tokenUri)
  await nftTxn.wait()
  console.log(
    `NFT Minted! Check it out at: https://goerli.etherscan.io/tx/${nftTxn.hash}`,
  )
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
