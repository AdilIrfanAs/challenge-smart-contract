const hre = require("hardhat");

async function main() {

  const [deployer,] = await ethers.getSigners();
  console.log('DEPLOYER: ',deployer.address);

  const SushiToken = await hre.ethers.getContractFactory("SushiToken");
  const sushiToken = await SushiToken.deploy();
  await sushiToken.deployed();
  try{await hre.run("verify:verify", {address: sushiToken.address});}catch(e){}
  console.log("SushiToken deployed:", sushiToken.address);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
