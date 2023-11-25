var AnchorPeer = artifacts.require("./AnchorPeer.sol");
// const LPeer0 = artifacts.require("./LPeer0.sol");
// const LPeer = artifacts.require("./LPeer.sol");

module.exports = async function (deployer, networks, accounts) {
    console.log("accounts:", accounts);
    // const lPeer0Instance = await LPeer0.deployed();
    // const lPeerInstance = await LPeer.deployed();

    deployer.deploy(AnchorPeer, accounts[0], accounts[0], accounts[0], { from: accounts[0] });
};
