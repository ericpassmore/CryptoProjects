pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

/* SPDX-License-Identifier: MIT */

contract WhiteWolf is ERC1155, Ownable {
  // minter of tokens
  address public governance;
  // id for collectable token
  uint256 public constant WWOLF = 0;
  // max supply for collectable token
  uint256 public constant WWOLF_LIFETIME_SUPPLY = 500;
  // name and symbol for collectable token on OpenSea
  bytes32 public name = "WhiteWolf";
  bytes32 public symbol = "WWOLF";

  /**
   * Require msg.sender to match address passed in at constructor
   */
  modifier onlyGovernance() {
        require(msg.sender == governance, "WhiteWolf#onlyGovernance: ONLY_GOVERNANCE_ALLOWED");

        _;
  }

  /**
   * Require msg.sender to own more than 0 of the token id
   * @param _id - wallet address of requestor
   */
  modifier ownersOnly(uint256 _id) {
    require(balanceOf(msg.sender, WWOLF) > 0, "ERC1155Tradable#ownersOnly: ONLY_OWNERS_ALLOWED");

    _;
  }

  /**
   * Require msg.sender to own 0 tokens
   * @param _id - wallet address of requestor
   */
  modifier nonOwnersOnly(uint256 _id) {
    require(balanceOf(msg.sender, WWOLF) == 0, "ERC1155Tradable#nonOwnersOnly: ONLY_NON_OWNERS_ALLOWED");

    _;
  }

  /**
   * set the governance address
   * choose not to pass in White List Address for use in isApprovedForAll
   *    could have made White List Address a praram for flexibility
   *    instead hardcoded in isApprovedForAll Override
   * URL for meta is a literal to avoid writing string concat function
   * NOTE: Solidity post 0.7.0 no longer requires visibility on constructor
   *    so no public keyword
   * @param _governance - the address that can create supply
   */
  constructor(
    address _governance
  ) ERC1155("https://game.example/api/item/{id}.json") {
      governance = _governance;
  }

  /**
   * Creates the token and the initial supply
   * NOTE: may need to add data parameter
   */
  function initSupply() external onlyGovernance {
    _mint(msg.sender, WWOLF, WWOLF_LIFETIME_SUPPLY, "");
  }

  /**
   * Override isApprovedForAll to whitelist user's OpenSea proxy accounts to enable gas-free listings.
   */
  function isApprovedForAll(
    address _owner,
    address _operator
  ) public override view returns (bool isOperator) {
    // if OpenSea's ERC1155 Proxy Address is detected, auto-return true
    if (_operator == address(0x207Fa8Df3a17D96Ca7EA4f2893fcdCb78a304101)) {
      return true;
    }

    return ERC1155.isApprovedForAll(_owner, _operator);
  }

}
