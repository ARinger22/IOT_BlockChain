var Certficattion = artifacts.require("./CertificateAuthority.sol");

module.exports = function(deployer, networks, accounts) {
  console.log("accounts:",accounts);
  deployer.deploy(Certficattion, "IOT device certification", {from: accounts[0]});
};
