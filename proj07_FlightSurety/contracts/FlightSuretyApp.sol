// SPDX-License-Identifier: MIT
// GET_PASSES_THIS_REPO_UDACITY_PLEASE
pragma solidity ^0.4.25;

// It's important to avoid vulnerabilities due to numeric overflow bugs
// OpenZeppelin's SafeMath library, when used correctly, protects agains such bugs
// More info: https://www.nccgroup.trust/us/about-us/newsroom-and-events/blog/2018/november/smart-contract-insecurity-bad-arithmetic/

import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";
import "./FlightSuretyData.sol";

/************************************************** */
/* FlightSurety Smart Contract                      */
/************************************************** */
contract FlightSuretyApp {
    using SafeMath for uint256; // Allow SafeMath functions to be called for all uint256 types (similar to "prototype" in Javascript)

    /********************************************************************************************/
    /*                                       DATA VARIABLES                                     */
    /********************************************************************************************/

    // // Flight status codes
    // uint8 private constant STATUS_CODE_UNKNOWN = 0;
    // uint8 private constant STATUS_CODE_ON_TIME = 10;
    // uint8 private constant STATUS_CODE_LATE_AIRLINE = 20;
    // uint8 private constant STATUS_CODE_LATE_WEATHER = 30;
    // uint8 private constant STATUS_CODE_LATE_TECHNICAL = 40;
    // uint8 private constant STATUS_CODE_LATE_OTHER = 50;

    address private contractOwner; // Account used to deploy contract

    address public constant PASSENGER_ADDRESS_01 =
        0x627306090abaB3A6e1400e9345bC60c78a8BEf57;
    address public constant PASSENGER_ADDRESS_02 =
        0x821aEa9a577a9b44299B9c15c88cf3087F3b5544;
    address public constant PASSENGER_ADDRESS_03 =
        0x0d1d4e623D10F9FBA5Db95830F7d3839406C6AF2;
    address public constant PASSENGER_ADDRESS_04 =
        0x2932b7A2355D6fecc4b5c0B6BD44cC31df247a2e;

    FlightSuretyData private flightSuretyData; // Contract instance of FlightSuretyData

    struct Flight {
        bool isRegistered;
        uint8 statusCode;
        uint256 updatedTimestamp;
        address airline;
    }
    mapping(bytes32 => Flight) private flights;

    // event BuyInsurance(
    //     address airline,
    //     string flight,
    //     uint256 timestamp,
    //     uint256 amount
    // );

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
        // Modify to call data contract's status
        require(isOperational(), "Contract is currently not operational");
        _; // All modifiers require an "_" which indicates where the function body will be added
    }

    /**
     * @dev Modifier that requires the "ContractOwner" account to be the function caller
     */
    modifier requireContractOwner() {
        require(msg.sender == contractOwner, "Caller is not contract owner");
        _;
    }

    /********************************************************************************************/
    /*                                       CONSTRUCTOR                                        */
    /********************************************************************************************/

    /**
     * @dev Contract constructor
     *
     */
    constructor(address dataContract, address _airlineAddress) public {
        contractOwner = msg.sender;
        address airlineAddress = _airlineAddress;

        flightSuretyData = FlightSuretyData(dataContract);

        registerAirline(airlineAddress, "Airline 1");

        registerFlight(airlineAddress, "Flight 01", 100000);
        registerFlight(airlineAddress, "Flight 02", 100001);
        registerFlight(airlineAddress, "Flight 03", 100002);

        registerPassenger(
            airlineAddress,
            "Flight 01",
            100000,
            PASSENGER_ADDRESS_01
        );
        registerPassenger(
            airlineAddress,
            "Flight 01",
            100000,
            PASSENGER_ADDRESS_02
        );
        registerPassenger(
            airlineAddress,
            "Flight 01",
            100000,
            PASSENGER_ADDRESS_03
        );

        registerPassenger(
            airlineAddress,
            "Flight 02",
            100001,
            PASSENGER_ADDRESS_01
        );
        registerPassenger(
            airlineAddress,
            "Flight 03",
            100002,
            PASSENGER_ADDRESS_01
        );
    }

    /********************************************************************************************/
    /*                                       UTILITY FUNCTIONS                                  */
    /********************************************************************************************/

    function isOperational() public view returns (bool) {
        return flightSuretyData.isOperational(); // Modify to call data contract's status
    }

    /********************************************************************************************/
    /*                                     SMART CONTRACT FUNCTIONS                             */
    /********************************************************************************************/

    /**
     * @dev Add an airline to the registration queue
     *
     */
    function registerAirline(address airlineAddress, string _name)
        public
        payable
    // returns (bool success)
    {
        flightSuretyData.registerAirline(airlineAddress, _name);
        // success = flightSuretyData.isAirlineRegistered(airlineAddress);
        // return (success);
    }

    /**
     * @dev Register a future flight for insuring.
     *
     */
    function registerFlight(
        address airlineAddress,
        string flightName,
        uint256 timestamp
    ) public payable {
        flightSuretyData.registerFlight(airlineAddress, flightName, timestamp);
    }

    /**
     * @dev Called after oracle has updated flight status
     *
     */
    function processFlightStatus(
        address airline,
        string memory flight,
        uint256 timestamp,
        uint8 statusCode
    ) internal pure {}

    // Generate a request for oracles to fetch flight information
    function fetchFlightStatus(
        address airline,
        string flight,
        uint256 timestamp
    ) external {
        uint8 index = getRandomIndex(msg.sender);

        // Generate a unique key for storing the request
        bytes32 key = keccak256(
            abi.encodePacked(index, airline, flight, timestamp)
        );
        oracleResponses[key] = ResponseInfo({
            requester: msg.sender,
            isOpen: true
        });

        FlightSuretyData.FLIGHT_STATUS flightStatus = flightSuretyData
            .fetchFlightStatus(airline, flight, timestamp);
        // if(flightStatus == FlightSuretyData.FLIGHT_STATUS.ON_TIME) {
        //     flightSuretyData.processFlightStatus(airline, flight, timestamp, FlightSuretyData.FLIGHT_STATUS.ON_TIME);
        // } else if(flightStatus == FlightSuretyData.FLIGHT_STATUS.LATE_AIRLINE) {
        //     flightSuretyData.processFlightStatus(airline, flight, timestamp, FlightSuretyData.FLIGHT_STATUS.LATE_AIRLINE);
        // } else if(flightStatus == FlightSuretyData.FLIGHT_STATUS.LATE_WEATHER) {
        //     flightSuretyData.processFlightStatus(airline, flight, timestamp, FlightSuretyData.FLIGHT_STATUS.LATE_WEATHER);
        // } else if(flightStatus == FlightSuretyData.FLIGHT_STATUS.LATE_TECHNICAL) {
        //     flightSuretyData.processFlightStatus(airline, flight, timestamp, FlightSuretyData.FLIGHT_STATUS.LATE_TECHNICAL);
        // } else if(flightStatus == FlightSuretyData.FLIGHT_STATUS.LATE_OTHER) {
        //     flightSuretyData.processFlightStatus(airline, flight, timestamp, FlightSuretyData.FLIGHT_STATUS.LATE_OTHER);
        // } else {
        //     flightSuretyData.processFlightStatus(airline, flight, timestamp, FlightSuretyData.FLIGHT_STATUS.UNKNOWN);
        // }

        emit OracleRequest(index, airline, flight, timestamp);
    }

    // function fetchFlightStatus(
    //     address airline,
    //     string flight,
    //     uint256 timestamp
    // ) external view returns (uint8) {
    //     return flightSuretyData.fetchFlightStatus(airline, flight, timestamp);
    // }

    function fetchContractOwner() public view returns (address) {
        return contractOwner;
    }

    function fetchFlightKey(
        address airline,
        string flight,
        uint256 timestamp
    ) public view returns (bytes32 key) {
        return getFlightKey(airline, flight, timestamp);
    }

    function payInsurance(
        address airline,
        string flight,
        uint256 timestamp,
        address passengerAddress,
        uint256 insuranceAmount
    ) public {
        flightSuretyData.buy(
            airline,
            flight,
            timestamp,
            passengerAddress,
            insuranceAmount
        );

        uint8 index = getRandomIndex(msg.sender);
        bytes32 key = keccak256(
            abi.encodePacked(index, airline, flight, timestamp)
        );
        oracleResponses[key] = ResponseInfo({
            requester: msg.sender,
            isOpen: true
        });
        emit OracleRequest(index, airline, flight, timestamp);
        // emit BuyInsurance(airline, flight, timestamp, msg.value);
    }

    function registerPassenger(
        address airline,
        string flight,
        uint256 timestamp,
        address passengerAddress
    ) public {
        flightSuretyData.registerPassenger(
            airline,
            flight,
            timestamp,
            passengerAddress
        );
    }

    function withdrawInsurance(
        address airline,
        string flight,
        uint256 timestamp,
        address passengerAddress
    ) public {
        flightSuretyData.withdrawInsurance(
            airline,
            flight,
            timestamp,
            passengerAddress
        );
    }

    // region ORACLE MANAGEMENT

    // Incremented to add pseudo-randomness at various points
    uint8 private nonce = 0;

    // Fee to be paid when registering oracle
    uint256 public constant REGISTRATION_FEE = 1 ether;

    // Number of oracles that must respond for valid status
    uint256 private constant MIN_RESPONSES = 3;

    struct Oracle {
        bool isRegistered;
        uint8[3] indexes;
    }

    // Track all registered oracles
    mapping(address => Oracle) private oracles;

    // Model for responses from oracles
    struct ResponseInfo {
        address requester; // Account that requested status
        bool isOpen; // If open, oracle responses are accepted
        mapping(uint8 => address[]) responses; // Mapping key is the status code reported
        // This lets us group responses and identify
        // the response that majority of the oracles
    }

    // Track all oracle responses
    // Key = hash(index, flight, timestamp)
    mapping(bytes32 => ResponseInfo) private oracleResponses;

    // Event fired each time an oracle submits a response
    event FlightStatusInfo(
        address airline,
        string flight,
        uint256 timestamp,
        uint8 status
    );

    event OracleReport(
        address airline,
        string flight,
        uint256 timestamp,
        uint8 status
    );

    // Event fired when flight status request is submitted
    // Oracles track this and if they have a matching index
    // they fetch data and submit a response
    event OracleRequest(
        uint8 index,
        address airline,
        string flight,
        uint256 timestamp
    );

    // Register an oracle with the contract
    function registerOracle() external payable {
        // Require registration fee
        require(msg.value >= REGISTRATION_FEE, "Registration fee is required");

        uint8[3] memory indexes = generateIndexes(msg.sender);

        oracles[msg.sender] = Oracle({isRegistered: true, indexes: indexes});
    }

    function getMyIndexes() external view returns (uint8[3]) {
        require(
            oracles[msg.sender].isRegistered,
            "Not registered as an oracle"
        );

        return oracles[msg.sender].indexes;
    }

    // Called by oracle when a response is available to an outstanding request
    // For the response to be accepted, there must be a pending request that is open
    // and matches one of the three Indexes randomly assigned to the oracle at the
    // time of registration (i.e. uninvited oracles are not welcome)
    function submitOracleResponse(
        uint8 index,
        address airline,
        string flight,
        uint256 timestamp,
        uint8 statusCode
    ) external {
        require(
            (oracles[msg.sender].indexes[0] == index) ||
                (oracles[msg.sender].indexes[1] == index) ||
                (oracles[msg.sender].indexes[2] == index),
            "Index does not match oracle request"
        );

        bytes32 key = keccak256(
            abi.encodePacked(index, airline, flight, timestamp)
        );
        require(
            oracleResponses[key].isOpen,
            "Flight or timestamp do not match oracle request"
        );

        oracleResponses[key].responses[statusCode].push(msg.sender);

        // Information isn't considered verified until at least MIN_RESPONSES
        // oracles respond with the *** same *** information
        emit OracleReport(airline, flight, timestamp, statusCode);
        if (
            oracleResponses[key].responses[statusCode].length >= MIN_RESPONSES
        ) {
            emit FlightStatusInfo(airline, flight, timestamp, statusCode);

            // Handle flight status as appropriate
            processFlightStatus(airline, flight, timestamp, statusCode);
        }
    }

    function getFlightKey(
        address airline,
        string flight,
        uint256 timestamp
    ) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(airline, flight, timestamp));
    }

    // Returns array of three non-duplicating integers from 0-9
    function generateIndexes(address account) internal returns (uint8[3]) {
        uint8[3] memory indexes;
        indexes[0] = getRandomIndex(account);

        indexes[1] = indexes[0];
        while (indexes[1] == indexes[0]) {
            indexes[1] = getRandomIndex(account);
        }

        indexes[2] = indexes[1];
        while ((indexes[2] == indexes[0]) || (indexes[2] == indexes[1])) {
            indexes[2] = getRandomIndex(account);
        }

        return indexes;
    }

    // Returns array of three non-duplicating integers from 0-9
    function getRandomIndex(address account) internal returns (uint8) {
        uint8 maxValue = 10;

        // Pseudo random number...the incrementing nonce adds variation
        uint8 random = uint8(
            uint256(
                keccak256(
                    abi.encodePacked(blockhash(block.number - nonce++), account)
                )
            ) % maxValue
        );

        if (nonce > 250) {
            nonce = 0; // Can only fetch blockhashes for last 256 blocks so we adapt
        }

        return random;
    }

    // endregion
}
