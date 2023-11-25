var LPeer0 = artifacts.require("./LPeer0.sol");

module.exports = function (deployer, networks, accounts) {
    console.log("accounts:", accounts);
    deployer.deploy(LPeer0, accounts[0],"MyLPeer0", { from: accounts[0] });
};
