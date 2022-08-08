
var FlightSuretyApp = artifacts.require("FlightSuretyApp");
var FlightSuretyData = artifacts.require("FlightSuretyData");
var BigNumber = require('bignumber.js');

var Config = async function(accounts) {
    
    // These test addresses are useful when you need to add
    // multiple users in test scripts
    let testAddresses = [
        "0x4ffAFDF5E60304f22ec3d6BD704fC37a372DAc92",
        "0x5eD5ef93a2DBc62eb8f73b2171d15d0eBd6aCd95",
        "0x661B2B02f88e003449bC2e36554d8B45e0f81591",
        "0x92B2bb275cbB5b19B2896B939eC7531357616D9A",
        "0x8EDa428484011a8385C356A31A38C1A675508303",
        "0x08fed19C6Ce648be105a91c83dEef9b6dE71415C",
        "0x1621B2c42EA582af127AB834D7C7A3bdf6eaF9b1",
        "0x477383F21df9a405bdA13d860aabD78323f7eB95",
        "0xf103576efffF95223E516F707b4f59B6343Ed1E1",
        "0x748Fc7757A628642d07F346B83F784d72BD3855b",
    ];


    let owner = accounts[0];
    let firstAirline = accounts[1];

    let flightSuretyData = await FlightSuretyData.new();
    let flightSuretyApp = await FlightSuretyApp.new();

    return {
        owner: owner,
        firstAirline: firstAirline,
        weiMultiple: (new BigNumber(10)).pow(18),
        testAddresses: testAddresses,
        flightSuretyData: flightSuretyData,
        flightSuretyApp: flightSuretyApp
    }
}

module.exports = {
    Config: Config
};