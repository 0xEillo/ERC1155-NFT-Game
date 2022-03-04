pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC1155/presets/ERC1155PresetMinterPauser.sol";
import "hardhat/console.sol";

contract GameItems is ERC1155PresetMinterPauser {
    uint256 public constant Armor = 1;
    uint256 public constant Shield = 2;
    uint256 public constant Sword = 3;
    uint256 public constant itemLimit = 1000;
    uint256 public armorSupply = itemLimit;
    uint256 public shieldSupply = itemLimit;
    uint256 public swordSupply = itemLimit;

    event itemMinted(address account, uint256 itemId);
    event shieldBurned(address account, uint256 itemId);

    constructor(string memory uri) ERC1155PresetMinterPauser(uri) {}

    function mintArmor(uint256 num) public payable {
        require(
            num >= 1 && num <= itemLimit,
            "You can only mint between 1-1000 items"
        );
        require(msg.value >= 0.1 ether * num, "Mint price is 0.1 ETH");
        require(armorSupply >= num, "Mint number is greater than supply left");
        armorSupply -= num;
        setApprovalForAll(address(this), true);
        emit itemMinted(msg.sender, Armor);
        _mint(msg.sender, Armor, num, "");
    }

    function mintShield(uint256 num) public payable {
        require(
            num >= 1 && num <= itemLimit,
            "You can only mint between 1-1000 items"
        );
        require(msg.value >= 0.1 ether * num, "Mint price is 0.1 ETH");
        require(shieldSupply >= num, "Mint number is greater than supply left");
        shieldSupply -= num;
        setApprovalForAll(address(this), true);
        emit itemMinted(msg.sender, Shield);
        _mint(msg.sender, Shield, num, "");
    }

    function mintSword(uint256 num) public payable {
        require(
            num >= 1 && num <= itemLimit,
            "You can only mint between 1-1000 items"
        );
        require(msg.value >= 0.1 ether * num, "Mint price is 0.1 ETH");
        require(swordSupply >= num, "Mint number is greater than supply left");
        swordSupply -= num;
        setApprovalForAll(address(this), true);
        emit itemMinted(msg.sender, Sword);
        _mint(msg.sender, Sword, num, "");
    }

    function burnShield() public {
        require(
            isApprovedForAll(msg.sender, address(this)) == true,
            "Sorry, you are not elligable to burn a shield."
        );
        uint256 randomNumber = getRandomNumber() % 100;
        if (randomNumber <= 79) {
            _mint(msg.sender, Sword, 1, "");
        }
        emit shieldBurned(msg.sender, Shield);
        burn(msg.sender, Shield, 1);
    }

    function getRandomNumber() internal view returns (uint256) {
        return
            uint256(keccak256(abi.encodePacked(msg.sender, block.timestamp)));
    }
}
