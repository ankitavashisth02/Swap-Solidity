// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const [owner] = await hre.ethers.getSigners();

  const ERC20 = await  hre.ethers.getContractFactory("ERC20");
  const ERC20_A = await  hre.ethers.getContractFactory("ERC20");

  const contract1 = await ERC20.deploy();
  const contract2 = await ERC20_A.deploy();

  await contract1.waitForDeployment();
  console.log("address of contract1 :",await contract1.getAddress());

  await contract2.waitForDeployment();
  console.log("address of contract2 :",await contract2.getAddress());


  const CPAMM = await hre.ethers.getContractFactory("CPAMM");
  const contract3 = await CPAMM.deploy(await contract1.getAddress(), await contract2.getAddress());

  await contract3.waitForDeployment();
  console.log("Address of contract3 :",await contract3.getAddress());

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});