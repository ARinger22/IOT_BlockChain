var LPeer = artifacts.require("./LPeer.sol");

module.exports = function (deployer, networks, accounts) {
    console.log("accounts:", accounts);
    deployer.deploy(LPeer, accounts[0],{ from: accounts[0] });
};
