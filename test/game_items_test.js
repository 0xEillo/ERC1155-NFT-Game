const { expect, assert } = require("chai");

describe("GameItems", function () {
  let GameItems;
  let gameItems;

  beforeEach(async function () {
    GameItems = await ethers.getContractFactory("GameItems");
    [deployer, player, player1] = await ethers.getSigners();
    gameItems = await GameItems.deploy("uri");
  });

  describe("Minting", function () {
    it("Minting with no ether should revert and give mint price message", async () => {
      // Armor
      await expect(gameItems.connect(player).mintArmor(1)).to.be.revertedWith(
        "Mint price is 0.1 ETH"
      );
      // Shield
      await expect(gameItems.connect(player).mintShield(1)).to.be.revertedWith(
        "Mint price is 0.1 ETH"
      );
      // Sword
      await expect(gameItems.connect(player).mintSword(1)).to.be.revertedWith(
        "Mint price is 0.1 ETH"
      );
    });

    it("Tries to mint more than 1000, reverts with message", async () => {
      // Armor
      await expect(
        gameItems.connect(player).mintArmor(1001)
      ).to.be.revertedWith("You can only mint between 1-1000 items");
      // Shield
      await expect(
        gameItems.connect(player).mintShield(1001)
      ).to.be.revertedWith("You can only mint between 1-1000 items");
      // Sword
      await expect(
        gameItems.connect(player).mintSword(1001)
      ).to.be.revertedWith("You can only mint between 1-1000 items");
    });

    it("Tries to mint more items than there are left to mint, reverts with message", async () => {
      // Armor
      gameItems
        .connect(player)
        .mintArmor(1, { value: ethers.utils.parseEther("0.1") });
      await expect(
        gameItems
          .connect(player)
          .mintArmor(1000, { value: ethers.utils.parseEther("100") })
      ).to.be.revertedWith("Mint number is greater than supply left");

      // Shield
      gameItems
        .connect(player)
        .mintShield(1, { value: ethers.utils.parseEther("0.1") });
      await expect(
        gameItems
          .connect(player)
          .mintShield(1000, { value: ethers.utils.parseEther("100") })
      ).to.be.revertedWith("Mint number is greater than supply left");

      // Sword
      gameItems
        .connect(player)
        .mintSword(1, { value: ethers.utils.parseEther("0.1") });
      await expect(
        gameItems
          .connect(player)
          .mintSword(1000, { value: ethers.utils.parseEther("100") })
      ).to.be.revertedWith("Mint number is greater than supply left");
    });

    it("Succcessfully mints an item", async () => {
      // Armor
      await expect(
        gameItems
          .connect(player)
          .mintArmor(1, { value: ethers.utils.parseEther("0.1") })
      )
        .to.emit(gameItems, "itemMinted")
        .withArgs(player.address, 1);
      expect(await gameItems.armorSupply()).to.equal(999);

      // Shield
      await expect(
        gameItems
          .connect(player)
          .mintShield(1, { value: ethers.utils.parseEther("0.1") })
      )
        .to.emit(gameItems, "itemMinted")
        .withArgs(player.address, 2);
      expect(await gameItems.armorSupply()).to.equal(999);

      // Sword
      await expect(
        gameItems
          .connect(player)
          .mintSword(1, { value: ethers.utils.parseEther("0.1") })
      )
        .to.emit(gameItems, "itemMinted")
        .withArgs(player.address, 3);
      expect(await gameItems.armorSupply()).to.equal(999);
    });
  });

  describe("Shield Burning", function () {
    it("Tries to burn a shield without having minted or owning a shield, reverts with message", async () => {
      await expect(gameItems.connect(player).burnShield()).to.be.revertedWith(
        "Sorry, you are not elligable to burn a shield."
      );
    });

    it("Successfully mints and burns a shield", async () => {
      await gameItems
        .connect(player)
        .mintShield(1, { value: ethers.utils.parseEther("0.1") });
      await expect(gameItems.connect(player).burnShield())
        .to.emit(gameItems, "shieldBurned")
        .withArgs(player.address, 2);
    });
  });
});
