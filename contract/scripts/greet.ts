import hre from 'hardhat'
import { ethers } from 'hardhat'
const ContractJson = require('../artifacts/contracts/Greeter.sol/Greeter.json')

const abi = ContractJson.abi

const { ALCHEMY_API_KEY, PRIVATE_KEY, CONTRACT_ADDRESS } = process.env

async function main() {
  const alchemy = new hre.ethers.providers.AlchemyProvider(
    'maticmum',
    ALCHEMY_API_KEY,
  )
  if (!PRIVATE_KEY) {
    throw new Error('PRIVATE_KEY not found')
  }
  const adminWallet = new hre.ethers.Wallet(PRIVATE_KEY, alchemy)
  if (!CONTRACT_ADDRESS) {
    throw new Error('CONTRACT_ADDRESS not found')
  }
  const wallet = hre.ethers.Wallet.createRandom()
  const userWallet = new hre.ethers.Wallet(wallet.privateKey, alchemy)
  const Greeter = new hre.ethers.Contract(CONTRACT_ADDRESS, abi, userWallet)

  // const Greeter = new hre.ethers.Contract(CONTRACT_ADDRESS, abi, userWallet)

  // const setTx1 = await Greeter.setGreeting('web3 is ngmi!')
  // await setTx1.wait()
  // console.log('before: ' + (await Greeter.greet()))

  // const setTx2 = await Greeter.setGreeting('web3 is awesome!')
  // await setTx2.wait()
  // console.log('after: ' + (await Greeter.greet()))
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
