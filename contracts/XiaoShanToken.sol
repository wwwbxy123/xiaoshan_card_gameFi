// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract XiaoShanToken is ERC721, Ownable {
  constructor(string memory _name, string memory _symbol)
    ERC721(_name, _symbol)
  {}

  uint256 COUNTER;

  uint256 fee = 0.01 ether;

  struct Card {
    string name;
    uint256 id;
    uint256 dna;
    uint8 level;
    uint8 rarity;
  }

  Card[] public cards;

  event NewCard(address indexed owner, uint256 id, uint256 dna);

  // Helpers
  function _createRandomNum(uint256 _mod) internal view returns (uint256) {
    uint256 randomNum = uint256(
      keccak256(abi.encodePacked(block.timestamp, msg.sender))
    );
    return randomNum % _mod;
  }

  function updateFee(uint256 _fee) external onlyOwner {
    fee = _fee;
  }

  function withdraw() external payable onlyOwner {
    address payable _owner = payable(owner());
    _owner.transfer(address(this).balance);
  }

  // Creation
  function _createCard(string memory _name) internal {
    uint8 randRarity = uint8(_createRandomNum(100));
    uint256 randDna = _createRandomNum(10**16);
    Card memory newCard = Card(_name, COUNTER, randDna, 1, randRarity);
    cards.push(newCard);
    _safeMint(msg.sender, COUNTER);
    emit NewCard(msg.sender, COUNTER, randDna);
    COUNTER++;
  }

  function createRandomCard(string memory _name) public payable {
    require(msg.value >= fee);
    _createCard(_name);
  }

  function mintMyNft(string memory _name) public onlyOwner() {
    _createCard(_name);
  }

  // Getters
  function getCards() public view returns (Card[] memory) {
    return cards;
  }

  function getOwnerCards(address _owner) public view returns (Card[] memory) {
    Card[] memory result = new Card[](balanceOf(_owner));
    uint256 counter = 0;
    for (uint256 i = 0; i < cards.length; i++) {
      if (ownerOf(i) == _owner) {
        result[counter] = cards[i];
        counter++;
      }
    }
    return result;
  }

  // Actions
  function levelUp(uint256 _cardId) public {
    require(ownerOf(_cardId) == msg.sender);
    Card storage card = cards[_cardId];
    card.level++;
  }
}