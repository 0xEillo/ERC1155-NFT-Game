# ERC1155-NFT-Game
Create the backend to a blockchain game using ERC-1155 standard

### Game Description
ERC-1155 multitoken smart contract for a medieval NFT game. Each player represents a Knight.
Knights can collect various gear, specifically: Armor, Sword, Shield. Each gear item is a NFT. 
Players can "burn" a shield, which will give them an 80% change of getting a sword but also a 20% chance of not getting anything(and losing the shield). 
There is an initial public minting of up to 1000 items. The

### Feature Overview
 [x] Minting Equipement
 [x] Burn Equipement
 [x] Need Basic Governance(allow ownership, pause, resume, change fees...)

### Minting Equipement
 - First 1000 items available for public minting
 - Everyone can mint an unlimited amount of items for 0.1 ETH each until the total limit of 1000 is reached
 - Available equipement types are: Armor, Sword, Shield
 - All equipement has a name and ID (name: Armor 1, ID: 1)
 - No limit for total supply of equipement

### Burn Equipement
 - Each user can burn a shield
 - After burning the shield there is:
    - 80% chance of getting a new Sword
    - 20% chance of not getting anything
    - The shield is lost in both cases
 - "burning" rules can be changed