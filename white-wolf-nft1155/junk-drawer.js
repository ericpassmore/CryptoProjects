function _ownerOf(uint256 tokenId) internal view returns (bool) {
    return balanceOf(msg.sender, tokenId) != 0;
}
