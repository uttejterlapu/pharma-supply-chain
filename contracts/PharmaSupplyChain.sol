// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PharmaSupplyChain {
    struct Drug {
        string name;
        string manufacturer;
        uint256 manufactureDate;
        uint256 expiryDate;
        address currentOwner;
    }

    mapping(uint256 => Drug) public drugs;
    uint256 public drugCounter;

    event DrugAdded(uint256 drugId, string name, string manufacturer);
    event OwnershipTransferred(uint256 drugId, address newOwner);

    function addDrug(
        string memory _name,
        string memory _manufacturer,
        uint256 _manufactureDate,
        uint256 _expiryDate
    ) public {
        drugCounter++;
        drugs[drugCounter] = Drug(_name, _manufacturer, _manufactureDate, _expiryDate, msg.sender);
        emit DrugAdded(drugCounter, _name, _manufacturer);
    }

    function transferOwnership(uint256 _drugId, address _newOwner) public {
        require(drugs[_drugId].currentOwner == msg.sender, "Only current owner can transfer ownership");
        drugs[_drugId].currentOwner = _newOwner;
        emit OwnershipTransferred(_drugId, _newOwner);
    }

    // Additional functions for tracking and verifying drugs can be added here
}
