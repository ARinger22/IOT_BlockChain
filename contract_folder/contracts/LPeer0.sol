// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import "./LPeer.sol";

contract LPeer0 {

    address public CA;
    string public eventName;

    event success(string msg);
    event DataTransfer(address indexed sender, address indexed receiver, string data);

    string[] public dataTransferList;

    LPeer public lPeerContract;

    constructor(address _lPeerAddress, string memory _eventName) {
        lPeerContract = LPeer(_lPeerAddress);
        CA = msg.sender;
        eventName = _eventName;
    }

    function initialize() external view {
        require(CA == msg.sender, "Only CA can initialize");
        // Additional initialization logic if needed
    }

    function sendData(address _receiverAddress, string memory _data) external {
        require(lPeerContract.verify(msg.sender, _receiverAddress), "Verification failed");
        // Other data sending logic...
        emit DataTransfer(msg.sender, _receiverAddress, _data);
        emit success("Data Sent !!");
    }
}
