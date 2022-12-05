const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("DEPLOYER: ", deployer.address);


  console.log(".......... SushiToken ..........");
  const SushiToken = await hre.ethers.getContractFactory("SushiToken");
  const sushiToken = await SushiToken.deploy();
  await sushiToken.deployed();
  try {
    await hre.run("verify:verify", 
    { 
      address: sushiToken.address,
      contract: "contracts/SushiToken.sol:SushiToken",
      constructorArguments: []
    });
  } catch (e) {
    console.log("Verification error:", e.message);
  }



  console.log(".......... FINAL DEPLOYED CONTRACT ADDRESSES ..........");
  console.log("SushiToken deployed:", sushiToken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
