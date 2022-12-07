// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12;

import "./MasterChef.sol";
import "./interfaces/IUniswapV2Factory.sol";
import "./interfaces/IUniswapV2Router02.sol";

contract SmartWallet {
  address public router;
  address public masterChef;

  event Received(address, uint256);

  constructor(address _router, address _masterChef) public {
    router = _router;
    masterChef = _masterChef;
  }

  receive() external payable {
    emit Received(msg.sender, msg.value);
  }

  function liquifyAndStake(address token, uint256 tokenAmount) external payable {
    // Approve tokens
    IERC20 _token = IERC20(token);
    _token.transferFrom(msg.sender, address(this), tokenAmount);
    _token.approve(router, tokenAmount);
    // Adding liquidity
    IUniswapV2Router02 _router = IUniswapV2Router02(router);
    // add the liquidity
    (, , uint256 liquidity) = _router.addLiquidityETH{value: msg.value}(
      token,
      tokenAmount,
      0, // slippage is unavoidable
      0, // slippage is unavoidable
      address(this),
      block.timestamp + 360
    );

    // stake the lp token's in masterchef to earn sushi tokens

    IUniswapV2Factory _factory = IUniswapV2Factory(_router.factory());
    IERC20 lptoken = IERC20(_factory.getPair(_router.WETH(), token));
    lptoken.approve(masterChef, liquidity);

    MasterChef _masterChef = MasterChef(masterChef);
    _masterChef.deposit(0, liquidity);
  }
}
