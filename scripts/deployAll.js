const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("DEPLOYER: ", deployer.address);


  // console.log(".......... SushiToken ..........");
  // const SushiToken = await hre.ethers.getContractFactory("contracts/SushiToken.sol:SushiToken");
  // const sushiToken = await SushiToken.deploy();
  // await sushiToken.deployTransaction.wait(2);
  // await sushiToken.deployed();
  // try {
  //   await hre.run("verify:verify", 
  //   { 
  //     address: sushiToken.address,
  //     contract: "contracts/SushiToken.sol:SushiToken",
  //     constructorArguments: []
  //   });
  // } catch (e) {
  //   console.log("Verification error:", e.message);
  // }

  // console.log(".......... WETH9 ..........");
  // const WETH9 = await hre.ethers.getContractFactory("contracts/WETH9.sol:WETH9");
  // const wETH9 = await WETH9.deploy();
  // await wETH9.deployTransaction.wait(2);
  // await wETH9.deployed();
  // try {
  //   await hre.run("verify:verify", 
  //   { 
  //     address: wETH9.address,
  //     contract: "contracts/WETH9.sol:WETH9",
  //     constructorArguments: []
  //   });
  // } catch (e) {
  //   console.log("Verification error:", e.message);
  // }

  // console.log(".......... UniswapV2Factory ..........");
  // const UniswapV2Factory = await hre.ethers.getContractFactory("contracts/UniswapV2Factory.sol:UniswapV2Factory");
  // const uniswapV2Factory = await UniswapV2Factory.deploy(deployer.address);
  // await uniswapV2Factory.deployTransaction.wait(2);
  // await uniswapV2Factory.deployed();
  // try {
  //   await hre.run("verify:verify", 
  //   { 
  //     address: uniswapV2Factory.address,
  //     contract: "contracts/UniswapV2Factory.sol:UniswapV2Factory",
  //     constructorArguments: [deployer.address]
  //   });
  // } catch (e) {
  //   console.log("Verification error:", e.message);
  // }

  // console.log(".......... UniswapV2Router02 ..........");
  // const UniswapV2Router02 = await hre.ethers.getContractFactory("contracts/UniswapV2Router02.sol:UniswapV2Router02");
  // const uniswapV2Router02 = await UniswapV2Router02.deploy("0x0179a37f1dF122922EbdA83b6AD3248f30d21731","0x768Bc6b8e6fb0Da85d4cAdDdAdB0aA77676350EB");
  // await uniswapV2Router02.deployTransaction.wait(2);
  // await uniswapV2Router02.deployed();
  // try {
  //   await hre.run("verify:verify", 
  //   { 
  //     address: uniswapV2Router02.address,
  //     contract: "contracts/UniswapV2Router02.sol:UniswapV2Router02",
  //     constructorArguments: ["0x0179a37f1dF122922EbdA83b6AD3248f30d21731","0x768Bc6b8e6fb0Da85d4cAdDdAdB0aA77676350EB"]
  //   });
  // } catch (e) {
  //   console.log("Verification error:", e.message);
  // }

  // console.log(".......... MasterChef ..........");
  // const MasterChef = await hre.ethers.getContractFactory("contracts/MasterChef.sol:MasterChef");
  // const masterChef = await MasterChef.deploy("0xB5B8256057e1314Dd1Eae89f86deb3B771Ad2716",deployer.address,"100000000000000000000","8078631","10850000");
  // await masterChef.deployTransaction.wait(2);
  // await masterChef.deployed();
  // try {
  //   await hre.run("verify:verify", 
  //   { 
  //     address: masterChef.address,
  //     contract: "contracts/MasterChef.sol:MasterChef",
  //     constructorArguments: ["0xB5B8256057e1314Dd1Eae89f86deb3B771Ad2716",deployer.address,"100000000000000000000","8078631","10850000"]
  //   });
  // } catch (e) {
  //   console.log("Verification error:", e.message);
  // }

  console.log(".......... BoostActions ..........");
  const BoostActions = await hre.ethers.getContractFactory("contracts/BoostActions.sol:BoostActions");
  const boostActions = await BoostActions.deploy("0x03Fd32890EBC1C75AD2F88dD77EAA70A1e9a14bE","0x068D40317ff9Cd17ebD671aFc92eC7275485729D");
  await boostActions.deployTransaction.wait(2);
  await boostActions.deployed();
  try {
    await hre.run("verify:verify", 
    { 
      address: boostActions.address,
      contract: "contracts/BoostActions.sol:BoostActions",
      constructorArguments: ["0x03Fd32890EBC1C75AD2F88dD77EAA70A1e9a14bE","0x068D40317ff9Cd17ebD671aFc92eC7275485729D"]
    });
  } catch (e) {
    console.log("Verification error:", e.message);
  }

  // console.log(".......... FINAL DEPLOYED CONTRACT ADDRESSES ..........");
  // console.log("DEPLOYER:         deployed:", deployer.address);
  // console.log("SushiToken        deployed:", sushiToken.address);
  // console.log("WETH9             deployed:", wETH9.address);
  // console.log("UniswapV2Factory  deployed:", uniswapV2Factory.address);
  // console.log("UniswapV2Router02 deployed:", uniswapV2Router02.address);
  // console.log("MasterChef        deployed:", masterChef.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
