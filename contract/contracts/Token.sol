//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    uint256 constant _initial_supply = 100 * (10**18);

    constructor() ERC20("HollyToken", "HT") {
        _mint(msg.sender, _initial_supply);
    }
}
