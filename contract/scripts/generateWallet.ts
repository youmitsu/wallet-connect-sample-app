import hre from 'hardhat'
const ContractJson = require('../artifacts/contracts/Token.sol/Token.json')

const abi = ContractJson.abi

const { ALCHEMY_API_KEY, PRIVATE_KEY, TOKEN_CONTRACT_ADDRESS } = process.env

async function main() {
  const alchemy = new hre.ethers.providers.AlchemyProvider(
    'maticmum',
    ALCHEMY_API_KEY,
  )
  if (!PRIVATE_KEY) {
    throw new Error('PRIVATE_KEY not found')
  }
  const adminWallet = new hre.ethers.Wallet(PRIVATE_KEY, alchemy)

  if (!TOKEN_CONTRACT_ADDRESS) {
    throw new Error('CONTRACT_ADDRESS not found')
  }

  const wallet = hre.ethers.Wallet.createRandom()
  const userWallet = new hre.ethers.Wallet(wallet.privateKey, alchemy)
  const Token = new hre.ethers.Contract(
    TOKEN_CONTRACT_ADDRESS,
    abi,
    adminWallet,
  )

  const sendInitialTokenTx = await Token.transfer(userWallet.address, 0)
  const result = await sendInitialTokenTx.wait()
  console.log('token send result', result)
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
