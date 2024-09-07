const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BattleToken", function () {
  let BattleToken, battleToken;
  let owner, addr1, addr2;

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    BattleToken = await ethers.getContractFactory("BattleToken");
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy the contract
    battleToken = await BattleToken.deploy(owner.address);
    await battleToken.deployed();
  });

  it("Should set the right owner", async function () {
    expect(await battleToken.owner()).to.equal(owner.address);
  });

  it("Should assign the total supply of tokens to the owner", async function () {
    const ownerBalance = await battleToken.balanceOf(owner.address);
    expect(await battleToken.totalSupply()).to.equal(ownerBalance);
  });

  it("Should transfer tokens between accounts", async function () {
    // Transfer 50 tokens from owner to addr1
    await battleToken.transfer(addr1.address, 50);
    const addr1Balance = await battleToken.balanceOf(addr1.address);
    expect(addr1Balance).to.equal(50);

    // Transfer 50 tokens from addr1 to addr2
    await battleToken.connect(addr1).transfer(addr2.address, 50);
    const addr2Balance = await battleToken.balanceOf(addr2.address);
    expect(addr2Balance).to.equal(50);
  });
});
