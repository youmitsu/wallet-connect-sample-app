import { ethers } from 'hardhat'

async function main() {
  const contractFactory = await ethers.getContractFactory('Token')
  const tokenContract = await contractFactory.deploy()
  console.log('Contract deployed to address', tokenContract.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
