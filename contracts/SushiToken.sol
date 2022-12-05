// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title SushiToken
 */
contract SushiToken is ERC20 {

  constructor() ERC20("SushiToken", "SUSHI") {
    _mint(msg.sender, 1000e18);
  }
}
