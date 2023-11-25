// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

contract CertificateAuthority {
    address private CA;
    string public eventName;

    struct IoT_device {
        string name;
        bool registered;
    }

    event success(string msg);

    mapping(address => IoT_device) private IoT_deviceList;
    string[] public dataTransferList;

    constructor(string memory _eventName) {
        CA = msg.sender;
        eventName = _eventName;
    }

    function registerAddress(
        address _IoT_deviceAddress,
        string calldata _name
    ) external {
        require(_IoT_deviceAddress != CA, "CA can not register!!");
        require(msg.sender == CA, "Only CA can register the devices!!");
        require(
            IoT_deviceList[_IoT_deviceAddress].registered == false,
            "IoT_device already registered!!"
        );
        IoT_device memory newDevice = IoT_device({
            name: _name,
            registered: true
        });

        IoT_deviceList[_IoT_deviceAddress] = newDevice;
        emit success("IoT_device registered!!");
    }

    function getIoTDeviceRegistrationStatus(
        address _deviceAddress
    ) external view returns (bool) {
        return IoT_deviceList[_deviceAddress].registered;
    }
}

