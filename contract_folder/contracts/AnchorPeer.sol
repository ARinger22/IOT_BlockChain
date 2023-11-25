// // SPDX-License-Identifier: GPL-3.0

// pragma solidity ^0.8.13;

// contract AnchorPeer{
//     address private Mine;
//     string AnchorName;
//     struct Community{
//         string name;
//         address addr;
    
//     }
//     constructor(){
//         Mine=msg.sender;
//     }
//     mapping (address => Community)  private CommMap;
//     function registerCommunity  (string calldata _name) external {
//         CommMap[msg.sender]=Community({
//             name:_name,
//             addr:msg.sender
//         });
//     }
// }

pragma solidity ^0.8.13;

import "./CertificateAuthority.sol";
import "./LPeer.sol";
import "./LPeer0.sol";

contract AnchorPeer {
    CertificateAuthority public caContract;
    LPeer public lPeerContract;
    LPeer0 public lPeer0Contract;

    mapping(address => bool) public registeredDevices;

    event success(string msg);

    constructor(
        address _caAddress,
        address _lPeerAddress,
        address _lPeer0Address
    ) {
        caContract = CertificateAuthority(_caAddress);
        lPeerContract = LPeer(_lPeerAddress);
        lPeer0Contract = LPeer0(_lPeer0Address);
    }

    function registerDevice(
        address _IoT_deviceAddress,
        string calldata _name
    ) external {
        require(
            caContract.getIoTDeviceRegistrationStatus(_IoT_deviceAddress),
            "IoT_device not registered in CA"
        );

        require(
            !registeredDevices[_IoT_deviceAddress],
            "IoT_device already registered"
        );

        registeredDevices[_IoT_deviceAddress] = true;

        // You can emit an event or perform other actions if needed
        emit success("Device registered!");
    }

    function verifyDevices(
        address _sender,
        address _receiver
    ) external view returns (bool) {
        require(
            caContract.getIoTDeviceRegistrationStatus(_sender),
            "Sender IoT_device not registered in CA"
        );

        require(
            caContract.getIoTDeviceRegistrationStatus(_receiver),
            "Receiver IoT_device not registered in CA"
        );

        return true;
    }

    function sendData(
        address _sender,
        address _receiver,
        string calldata _data
    ) external {
        require(
            lPeerContract.verify(_sender, _receiver),
            "Verification failed in lPeerContract"
        );

        require(
            registeredDevices[_sender],
            "Sender device not registered in AnchorPeer"
        );

        require(
            registeredDevices[_receiver],
            "Receiver device not registered in AnchorPeer"
        );
        emit success("Data Sent!!");
    }
}
