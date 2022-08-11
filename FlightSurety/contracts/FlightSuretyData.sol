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

    uint256 constant M = 3; // M (3) of N (5) required to vote for a supermajority
    address[] multiCalls = new address[](0);

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
        uint256 insuranceAmount;
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
        require(
            operational,
            "[requireIsOperational]Contract is currently not operational"
        );
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
        require(
            this.isOperational(),
            "[allowAirlineRegistered]Contract is currently not operational"
        );
        // require(numAirlines < 5, "Airlines amount must be less than 5");
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
            msg.value <= 1 ether,
            "Insurance amount must be less than or equal to 1 ether"
        );
        _;
    }

    modifier requireAirlineRegistered(address airlineAddress) {
        require(
            airlines[airlineAddress].airlineAddress > 0,
            string(
                abi.encodePacked(
                    "[requireAirlineRegistered]Airline is not registered: ",
                    airlines[airlineAddress].airlineAddress,
                    " - ",
                    airlineAddress,
                    " - "
                )
            )

            // string.concat(
            //     "[requireAirlineRegistered]Airline is not registered: ",
            //     airlines[airlineAddress].airlineAddress,
            //     " - "
            // )
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
        require(
            flight.flightCode > 0,
            string(
                abi.encodePacked(
                    "[requireFlightRegistered]Flight is not registered: ",
                    flight.flightCode,
                    " - "
                )
            )
        );
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
        address airlineAddress,
        string flightName,
        uint256 timestamp,
        address passengerAddress
    ) {
        bytes32 flightKey = getFlightKey(airlineAddress, flightName, timestamp);
        Flight storage flight = airlines[airlineAddress].flights[flightKey];
        FlightPassenger storage passenger = flight.passengers[passengerAddress];
        require(
            passenger.passengerAddress > 0,
            string(
                abi.encodePacked(
                    "[requireFlightPassengerNotFunded]Passenger is not registered: ",
                    airlines[airlineAddress].airlineAddress,
                    " - ",
                    passenger.passengerAddress,
                    " - ",
                    passengerAddress,
                    " - "
                )
            )
        );
        require(passenger.funding == 0, "Flight must not be funded");
        _;
    }

    modifier requireFlightPassengerHasNoInsurance(
        address airlineAddress,
        string flightName,
        uint256 timestamp,
        address passengerAddress
    ) {
        bytes32 flightKey = getFlightKey(airlineAddress, flightName, timestamp);
        Flight storage flight = airlines[airlineAddress].flights[flightKey];
        FlightPassenger storage flightPassenger = flight.passengers[
            passengerAddress
        ];
        require(
            flightPassenger.passengerAddress > 0,
            string(
                abi.encodePacked(
                    "[requireFlightPassengerHasNoInsurance]Passenger is not registered: ",
                    " - airlineAddress: ",
                    airlines[airlineAddress].airlineAddress,
                    " - passenger.passengerAddress: ",
                    flightPassenger.passengerAddress,
                    " - passengerAddress: ",
                    passengerAddress,
                    " - "
                )
            )
        );
        require(
            flightPassenger.insuranceAmount == 0,
            string(
                abi.encodePacked(
                    "[requireFlightPassengerHasNoInsurance]Insurance must not be paid: ",
                    " - insuranceAmount: ",
                    flightPassenger.insuranceAmount,
                    " - passengerAddress: ",
                    passengerAddress,
                    " - "
                )
            )
        );
        _;
    }

    modifier requireFlightPassengerHasInsurance(
        address airlineAddress,
        string flightName,
        uint256 timestamp,
        address passengerAddress
    ) {
        bytes32 flightKey = getFlightKey(airlineAddress, flightName, timestamp);
        Flight storage flight = airlines[airlineAddress].flights[flightKey];
        FlightPassenger storage passenger = flight.passengers[passengerAddress];
        require(
            passenger.passengerAddress > 0,
            string(
                abi.encodePacked(
                    "[requireFlightPassengerHasInsurance]Passenger is not registered: ",
                    airlines[airlineAddress].airlineAddress,
                    " - ",
                    passenger.passengerAddress,
                    " - ",
                    passengerAddress,
                    " - "
                )
            )
        );
        require(
            passenger.insuranceAmount > 0,
            "[requireFlightPassengerHasInsurance]Insurance must be bought"
        );
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
    function setOperatingStatus(
        bool mode // requireContractOwner
    ) external {
        // operational = mode;
        require(
            mode != operational,
            "New mode must be different from existing mode"
        );

        bool isDuplicate = false;
        for (uint256 c = 0; c < multiCalls.length; c++) {
            if (multiCalls[c] == msg.sender) {
                isDuplicate = true;
                break;
            }
        }
        require(!isDuplicate, "Caller has already called this function.");

        multiCalls.push(msg.sender);
        if (multiCalls.length >= M) {
            operational = mode;
            multiCalls = new address[](0);
        }
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
        payable
        allowAirlineRegistered
    {
        airlines[airlineAddress] = Airline(
            airlineAddress,
            _name,
            AIRLINE_STATUS.REGISTERED,
            0 // funding
        );
        numAirlines++;
    }

    /**
     * @dev confirm registration of an airline
     *
     */
    function isAirlineRegistered(address airlineAddress)
        external
        view
        // requireContractOwner
        requireAirlineRegistered(airlineAddress)
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
        airlinesApprovalAmount++;
    }

    function registerFlight(
        address airlineAddress,
        string flightName,
        uint256 timestamp
    ) external payable requireAirlineRegistered(airlineAddress) {
        bytes32 flightKey = getFlightKey(airlineAddress, flightName, timestamp);
        airlines[airlineAddress].flights[flightKey] = Flight(
            flightKey,
            flightName,
            timestamp,
            FLIGHT_STATUS.ON_TIME,
            0 // funding
        );
    }

    /**
     * @dev Buy insurance for a flight
     *
     */
    function buy(
        address airlineAddress,
        string flightName,
        uint256 timestamp,
        address passengerAddress,
        uint256 amount
    )
        external
        // uint256 insuranceAmount,
        requireIsOperational
        requireInsuranceBelowLimitation
    // requireFlightPassengerHasNoInsurance(
    //     airlineAddress,
    //     flightName,
    //     timestamp,
    //     passengerAddress
    // )
    {
        bytes32 flightKey = getFlightKey(airlineAddress, flightName, timestamp);
        // Flight storage flight = airlines[airlineAddress].flights[flightKey];
        Airline storage airline = airlines[airlineAddress];
        Flight storage flight = airline.flights[flightKey];
        // flight.flightCode = flightKey;
        // flight.timestamp = timestamp;
        FlightPassenger storage flightPassenger = flight.passengers[
            passengerAddress
        ];

        require(
            flightPassenger.passengerAddress != address(0),
            string(
                abi.encodePacked(
                    "[requireFlightPassengerHasNoInsurance]Passenger is not registered: ",
                    " - airlineAddress: ",
                    airlines[airlineAddress].airlineAddress,
                    " - passenger.passengerAddress: ",
                    flightPassenger.passengerAddress,
                    " - passengerAddress: ",
                    passengerAddress,
                    " - "
                )
            )
        );
        require(
            flightPassenger.insuranceAmount == 0,
            string(
                abi.encodePacked(
                    "[requireFlightPassengerHasNoInsurance]Insurance must not be paid: ",
                    " - insuranceAmount: ",
                    flightPassenger.insuranceAmount,
                    " - passengerAddress: ",
                    passengerAddress,
                    " - "
                )
            )
        );

        flightPassenger.passengerAddress = passengerAddress;
        flightPassenger.insuranceAmount += amount;
        // flightPassenger.funding = insuranceAmount;
        // flight.totalFunding += insuranceAmount;
    }

    function fetchFlightStatus(
        address airline,
        string flightName,
        uint256 timestamp
    )
        external
        view
        requireAirlineRegistered(airline)
        requireFlightRegistered(airline, flightName, timestamp)
        returns (FLIGHT_STATUS)
    {
        bytes32 flightKey = getFlightKey(airline, flightName, timestamp);
        Flight storage flight = airlines[airline].flights[flightKey];
        return flight.status;
    }

    function registerPassenger(
        address airline,
        string flightName,
        uint256 timestamp,
        address passengerAddress
    )
        external
        payable
        requireAirlineRegistered(airline)
        requireFlightRegistered(airline, flightName, timestamp)
    {
        bytes32 flightKey = getFlightKey(airline, flightName, timestamp);
        Flight storage flight = airlines[airline].flights[flightKey];

        flight.passengers[passengerAddress] = FlightPassenger(
            passengerAddress,
            0, // funding
            0 // insuranceAmount
        );
    }

    function withdrawInsurance(
        address airline,
        string flightName,
        uint256 timestamp,
        address passengerAddress
    )
        external
        requireAirlineRegistered(airline)
        requireFlightRegistered(airline, flightName, timestamp)
    // requireFlightPassengerHasInsurance(
    //     airline,
    //     flightName,
    //     timestamp,
    //     passengerAddress
    // )
    {
        bytes32 flightKey = getFlightKey(airline, flightName, timestamp);
        Flight storage flight = airlines[airline].flights[flightKey];
        FlightPassenger storage passenger = flight.passengers[passengerAddress];

        require(
            passenger.passengerAddress != address(0),
            // toAsciiString(passengerAddress)
            // toAsciiString(msg.sender)
            string(
                abi.encodePacked(
                    "[requireFlightPassengerHasInsurance]Passenger is not registered: ",
                    // " - airlineAddress: ",
                    // airlines[airline].airlineAddress,
                    " - passenger.passengerAddress: ",
                    passenger.passengerAddress,
                    " - passengerAddress: ",
                    passengerAddress,
                    " - "
                )
            )
        );
        require(
            passenger.insuranceAmount > 0,
            "[requireFlightPassengerHasInsurance]Insurance must be bought already."
        );

        passenger.insuranceAmount = 0;
        // passenger.funding = 0;
        // flight.totalFunding -= msg.value;
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
    ) public returns (bytes32) {
        return keccak256(abi.encodePacked(airline, flight, timestamp));
    }

    /**
     * @dev Fallback function for funding smart contract.
     *
     */
    function() external payable {
        fund();
    }

    // function strConcat(
    //     string _a,
    //     string _b,
    //     string _c,
    //     string _d,
    //     string _e
    // ) internal returns (string) {
    //     bytes memory _ba = bytes(_a);
    //     bytes memory _bb = bytes(_b);
    //     bytes memory _bc = bytes(_c);
    //     bytes memory _bd = bytes(_d);
    //     bytes memory _be = bytes(_e);
    //     string memory abcde = new string(
    //         _ba.length + _bb.length + _bc.length + _bd.length + _be.length
    //     );
    //     bytes memory babcde = bytes(abcde);
    //     uint256 k = 0;
    //     for (uint256 i = 0; i < _ba.length; i++) babcde[k++] = _ba[i];
    //     for (i = 0; i < _bb.length; i++) babcde[k++] = _bb[i];
    //     for (i = 0; i < _bc.length; i++) babcde[k++] = _bc[i];
    //     for (i = 0; i < _bd.length; i++) babcde[k++] = _bd[i];
    //     for (i = 0; i < _be.length; i++) babcde[k++] = _be[i];
    //     return string(babcde);
    // }

    // function strConcat(
    //     string _a,
    //     string _b,
    //     string _c,
    //     string _d
    // ) internal returns (string) {
    //     return strConcat(_a, _b, _c, _d, "");
    // }

    // function strConcat(
    //     string _a,
    //     string _b,
    //     string _c
    // ) internal returns (string) {
    //     return strConcat(_a, _b, _c, "", "");
    // }

    // function strConcat(string _a, string _b) internal returns (string) {
    //     return strConcat(_a, _b, "", "", "");
    // }

    function toAsciiString(address x) internal pure returns (string memory) {
        bytes memory s = new bytes(40);
        for (uint256 i = 0; i < 20; i++) {
            bytes1 b = bytes1(uint8(uint256(uint160(x)) / (2**(8 * (19 - i)))));
            bytes1 hi = bytes1(uint8(b) / 16);
            bytes1 lo = bytes1(uint8(b) - 16 * uint8(hi));
            s[2 * i] = char(hi);
            s[2 * i + 1] = char(lo);
        }
        return string(s);
    }

    function char(bytes1 b) internal pure returns (bytes1 c) {
        if (uint8(b) < 10) return bytes1(uint8(b) + 0x30);
        else return bytes1(uint8(b) + 0x57);
    }
}
