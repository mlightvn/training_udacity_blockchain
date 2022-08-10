// SPDX-License-Identifier: MIT
// GET_PASSES_THIS_REPO_UDACITY_PLEASE
pragma solidity ^0.4.25;

import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract FlightSuretyData {
    using SafeMath for uint256;
    // using SafeMath for uint8;

    /********************************************************************************************/
    /*                                       DATA VARIABLES                                     */
    /********************************************************************************************/
    uint8 public constant FUNDING_ACCEPTED_AMOUNT = 10; // ether

    // Flight status codes
    uint8 public constant STATUS_CODE_UNKNOWN = 0;
    uint8 public constant STATUS_CODE_ON_TIME = 10;
    uint8 public constant STATUS_CODE_LATE_AIRLINE = 20;
    uint8 public constant STATUS_CODE_LATE_WEATHER = 30;
    uint8 public constant STATUS_CODE_LATE_TECHNICAL = 40;
    uint8 public constant STATUS_CODE_LATE_OTHER = 50;

    enum AIRLINE_STATUS {
        // UNKNOWN,
        REGISTERED,
        APPROVED
    }

    enum FLIGHT_STATUS {
        UNKNOWN,
        ON_TIME,
        LATE_AIRLINE,
        LATE_WEATHER,
        LATE_TECHNICAL,
        LATE_OTHER
    }

    struct Airline {
        address airlineAddress;
        string name;
        // string description;
        // bool approval;
        AIRLINE_STATUS status;
        uint256 funding;
        // Flight[] flights;
        mapping(bytes32 => Flight) flights;
    }

    struct Flight {
        // address airlineAddress;
        // string flightNumber;
        // address flightAddress;
        bytes32 flightCode;
        string name;
        uint256 timestamp;
        FLIGHT_STATUS status;
        uint256 totalFunding;
        // address[] passengers;
        mapping(address => FlightPassenger) passengers;
    }

    struct FlightPassenger {
        address passengerAddress;
        uint256 funding;
    }

    address private contractOwner; // Account used to deploy contract
    bool private operational = true; // Blocks all state changes throughout the contract if false
    mapping(address => Airline) private airlines; // Mapping of airline codes to Airline structs
    uint8 private numAirlines = 0;
    uint8 private airlinesApprovalAmount = 0;

    /********************************************************************************************/
    /*                                       EVENT DEFINITIONS                                  */
    /********************************************************************************************/

    /**
     * @dev Constructor
     *      The deploying account becomes contractOwner
     */
    constructor() public {
        contractOwner = msg.sender;

        // Register the first airline
        airlines[contractOwner] = Airline(
            contractOwner,
            "First airline",
            AIRLINE_STATUS.REGISTERED,
            0
        );
        numAirlines = 1;

        // // Register the first flight
        // airlines[contractOwner].flights[contractOwner] = Flight(
        //     contractOwner,
        //     "First flight",
        //     0,
        //     FLIGHT_STATUS.ON_TIME,
        //     0
        // );
        // // Register the first passenger
        // airlines[contractOwner].flights[contractOwner].passengers[
        //         msg.sender
        //     ] = FlightPassenger(msg.sender, 0);
    }

    /********************************************************************************************/
    /*                                       FUNCTION MODIFIERS                                 */
    /********************************************************************************************/

    // Modifiers help avoid duplication of code. They are typically used to validate something
    // before a function is allowed to be executed.

    /**
     * @dev Modifier that requires the "operational" boolean variable to be "true"
     *      This is used on all state changing functions to pause the contract in
     *      the event there is an issue that needs to be fixed
     */
    modifier requireIsOperational() {
        require(operational, "Contract is currently not operational");
        _; // All modifiers require an "_" which indicates where the function body will be added
    }

    /**
     * @dev Modifier that requires the "ContractOwner" account to be the function caller
     */
    modifier requireContractOwner() {
        require(msg.sender == contractOwner, "Caller is not contract owner");
        _;
    }

    modifier allowAirlineRegistered() {
        require(numAirlines < 5, "Airlines amount must be less than 5");
        // if (numAirlines >= 5) {
        //     require(
        //         airlinesApprovalAmount.div(numAirlines) >= 0.5,
        //         "Airlines approval amount must be greater than or equal 50%"
        //     );
        // }
        _;
    }

    modifier requireInsuranceBelowLimitation() {
        require(
            msg.value <= 1,
            "Insurance amount must be less than or equal to 1 ether"
        );
        _;
    }

    modifier requireAirlineRegistered() {
        require(
            airlines[msg.sender].airlineAddress > 0,
            "Airline is not registered"
        );
        _;
    }

    modifier requireFlightRegistered(
        address airline,
        string flightName,
        uint256 timestamp
    ) {
        bytes32 flightKey = getFlightKey(airline, flightName, timestamp);
        Flight storage flight = airlines[airline].flights[flightKey];
        require(flight.flightCode > 0, "Flight is not registered");
        _;
    }

    modifier requireFlightPassengerRegistered(
        address airline,
        string flightName,
        uint256 timestamp
    ) {
        bytes32 flightKey = getFlightKey(airline, flightName, timestamp);
        Flight storage flight = airlines[airline].flights[flightKey];
        FlightPassenger storage passenger = flight.passengers[msg.sender];
        require(passenger.passengerAddress > 0, "Passenger is not registered");
        _;
    }

    modifier requireFlightPassengerFunded(
        address airline,
        string flightName,
        uint256 timestamp
    ) {
        bytes32 flightKey = getFlightKey(airline, flightName, timestamp);
        Flight storage flight = airlines[airline].flights[flightKey];
        FlightPassenger storage passenger = flight.passengers[msg.sender];
        require(passenger.passengerAddress > 0, "Passenger is not registered");
        require(passenger.funding > 0, "Flight is not funded");
        _;
    }

    modifier requireFlightPassengerNotFunded(
        address airline,
        string flightName,
        uint256 timestamp
    ) {
        bytes32 flightKey = getFlightKey(airline, flightName, timestamp);
        Flight storage flight = airlines[airline].flights[flightKey];
        FlightPassenger storage passenger = flight.passengers[msg.sender];
        require(passenger.passengerAddress > 0, "Passenger is not registered");
        require(passenger.funding == 0, "Flight is not funded");
        _;
    }

    /********************************************************************************************/
    /*                                       UTILITY FUNCTIONS                                  */
    /********************************************************************************************/

    function authorizeCaller(address callerAddress) public {}

    /**
     * @dev Get operating status of contract
     *
     * @return A bool that is the current operating status
     */
    function isOperational() public view returns (bool) {
        return operational;
    }

    /**
     * @dev Sets contract operations on/off
     *
     * When operational mode is disabled, all write transactions except for this one will fail
     */
    function setOperatingStatus(bool mode) external requireContractOwner {
        operational = mode;
    }

    function isContractOwner() public view returns (bool) {
        return (msg.sender == contractOwner);
    }

    /********************************************************************************************/
    /*                                     SMART CONTRACT FUNCTIONS                             */
    /********************************************************************************************/

    /**
     * @dev Add an airline to the registration queue
     *      Can only be called from FlightSuretyApp contract
     *
     */
    function registerAirline(address airlineAddress, string _name)
        external
        allowAirlineRegistered
    {
        airlines[airlineAddress] = Airline(
            airlineAddress,
            _name,
            AIRLINE_STATUS.REGISTERED,
            0
        );
        numAirlines += 1;
    }

    /**
     * @dev confirm registration of an airline
     *
     */
    function isAirlineRegistered(address airlineAddress)
        external
        view
        // requireContractOwner
        requireAirlineRegistered
        returns (AIRLINE_STATUS)
    {
        return airlines[airlineAddress].status;
    }

    /**
     * @dev Approve an airline to register
     *      Can only be called from FlightSuretyApp contract
     *
     */
    function approveAirline(address airlineAddress)
        external
        requireContractOwner
    {
        airlines[airlineAddress].status = AIRLINE_STATUS.APPROVED;
        airlinesApprovalAmount += 1;
    }

    /**
     * @dev Buy insurance for a flight
     *
     */
    function buy(
        address airline,
        string flightName,
        uint256 timestamp
    )
        external
        payable
        requireIsOperational
        requireInsuranceBelowLimitation
        requireFlightPassengerNotFunded(airline, flightName, timestamp)
    {
        bytes32 flightKey = getFlightKey(airline, flightName, timestamp);
        Flight storage flight = airlines[airline].flights[flightKey];
        // flight.flightCode = flightKey;
        // flight.timestamp = timestamp;
        FlightPassenger storage flightPassenger = flight.passengers[msg.sender];
        flightPassenger.passengerAddress = msg.sender;
        flightPassenger.funding = msg.value;
        flight.totalFunding += msg.value;
    }

    /**
     *  @dev Credits payouts to insurees
     */
    function creditInsurees() external {}

    /**
     *  @dev Transfers eligible payout funds to insuree
     *
     */
    function pay() external {}

    /**
     * @dev Initial funding for the insurance. Unless there are too many delayed flights
     *      resulting in insurance payouts, the contract should be self-sustaining
     *
     */
    function fund() public payable {}

    function getFlightKey(
        address airline,
        string memory flight,
        uint256 timestamp
    ) internal view returns (bytes32) {
        return keccak256(abi.encodePacked(airline, flight, timestamp));
    }

    /**
     * @dev Fallback function for funding smart contract.
     *
     */
    function() external payable {
        fund();
    }
}
