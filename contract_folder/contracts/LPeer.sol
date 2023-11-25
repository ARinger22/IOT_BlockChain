// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import "./CertificateAuthority.sol";

contract LPeer {
    CertificateAuthority public caContract;

    constructor(address _caAddress) {
        caContract = CertificateAuthority(_caAddress);
    }

    function verify(address _sender, address _receiver) external view returns (bool) {
        require(caContract.getIoTDeviceRegistrationStatus(_sender), "Sender IoT_device not registered");
        require(caContract.getIoTDeviceRegistrationStatus(_receiver), "Receiver IoT_device not registered");
        return true;
    }
}
