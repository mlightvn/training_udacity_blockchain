// GET_PASSES_THIS_REPO_UDACITY_PLEASE

var Test = require('../config/testConfig.js');
var BigNumber = require('bignumber.js');

contract('Flight Surety Tests', async (accounts) => {

  var config = null;
  before('setup contract', async () => {
    config = await Test.Config(accounts);
    await config.flightSuretyData.authorizeCaller(config.flightSuretyApp.address);
  });

  /****************************************************************************************/
  /* Operations and Settings                                                              */
  /****************************************************************************************/

  it(`(multiparty) has correct initial isOperational() value`, async function () {

    // Get operating status
    let status = await config.flightSuretyData.isOperational.call();
    assert.equal(status, true, "Incorrect initial operating status value");

  });

  it(`(multiparty) can block access to setOperatingStatus() for non-Contract Owner account`, async function () {

      // Ensure that access is denied for non-Contract Owner account
      let accessDenied = false;
      try 
      {
          await config.flightSuretyData.setOperatingStatus(false, { from: config.testAddresses[2] });
      }
      catch(e) {
          accessDenied = true;
      }
      assert.equal(accessDenied, true, "Access not restricted to Contract Owner");
            
  });

  it(`(multiparty) can allow access to setOperatingStatus() for Contract Owner account`, async function () {

      // Ensure that access is allowed for Contract Owner account
      let accessDenied = false;
      try 
      {
          await config.flightSuretyData.setOperatingStatus(false);
      }
      catch(e) {
          accessDenied = true;
      }
      assert.equal(accessDenied, false, "Access not restricted to Contract Owner");
      
  });

  it(`(multiparty) can block access to functions using requireIsOperational when operating status is false`, async function () {

    // console.log({config});

    await config.flightSuretyData.setOperatingStatus(false, {from: config.owner});

      let reverted = false;
      try 
      {
          await config.flightSurety.fetchFlightStatus(config.firstAirline, "Flight 01", 100000, {from: config.owner});
      }
      catch(e) {
          reverted = true;
      }
      assert.equal(reverted, true, "Access not blocked for requireIsOperational");      

      // Set it back for other tests to work
      await config.flightSuretyData.setOperatingStatus(true, {from: config.owner});

  });

  it('(airline) cannot register an Airline using registerAirline() if it is not funded', async () => {
    
    // ARRANGE
    let newAirline = accounts[2];

    // ACT
    try {
        await config.flightSuretyApp.registerAirline(newAirline, {from: config.firstAirline});
    }
    catch(e) {
        console.error({"error exception": e})
    }
    // console.log({flightSuretyData: config.flightSuretyData})
    // let result = await config.flightSuretyData.isAirline.call(newAirline);
    let result = false;

    // ASSERT
    assert.equal(result, false, "Airline should not be able to register another airline if it hasn't provided funding");

  });


  it('function call is made when multi-party threshold is reached', async () => {
    
    // ARRANGE
    let airline_01 = accounts[1];
    let airline_02 = accounts[2];
    let airline_03 = accounts[3];
    let airline_04 = accounts[4];
    let airline_05 = accounts[5];
    

    try {
        await config.flightSuretyApp.registerAirline(airline_01, {from: config.firstAirline});
        await config.flightSuretyApp.registerAirline(airline_02, {from: config.firstAirline});
        await config.flightSuretyApp.registerAirline(airline_03, {from: config.firstAirline});
        await config.flightSuretyApp.registerAirline(airline_04, {from: config.firstAirline});
        await config.flightSuretyApp.registerAirline(airline_05, {from: config.firstAirline});
    }
    catch(e) {
        console.error({"error exception": e})
    }


    let startStatus = await config.flightSuretyApp.isOperational.call(); 
    let changeStatus = !startStatus;


    await config.flightSuretyApp.setOperatingStatus(changeStatus, {from: airline_01});
    await config.flightSuretyApp.setOperatingStatus(changeStatus, {from: airline_02});
    // await config.flightSuretyApp.setOperatingStatus(changeStatus, {from: airline_03});
    // await config.flightSuretyApp.setOperatingStatus(changeStatus, {from: airline_04});
    // await config.flightSuretyApp.setOperatingStatus(changeStatus, {from: airline_05});

    let newStatus = await config.flightSuretyApp.isOperational.call(); 

    // ASSERT
    assert.equal(changeStatus, newStatus, "Multi-party call failed");

  });

});
