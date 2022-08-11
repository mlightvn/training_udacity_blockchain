import FlightSuretyApp from '../../build/contracts/FlightSuretyApp.json';
import Config from './config.json';
import Web3 from 'web3';

const GAS = 1000000

export default class Contract {
    constructor(network, callback) {

        let config = Config[network];
        this.web3 = new Web3(new Web3.providers.HttpProvider(config.url));
        this.flightSuretyApp = new this.web3.eth.Contract(FlightSuretyApp.abi, config.appAddress);
        this.initialize(callback);
        this.owner = null;
        this.airlines = [];
        this.passengers = [];
    }

    initialize(callback) {
        this.web3.eth.getAccounts((error, accts) => {
           
            this.owner = accts[0];
            let elPassengerAddress = document.getElementById("input[flight][insurance][passenger][address]");
            elPassengerAddress.value = this.owner;

            let counter = 1;
            
            while(this.airlines.length < 5) {
                this.airlines.push(accts[counter++]);
            }

            while(this.passengers.length < 5) {
                this.passengers.push(accts[counter++]);
            }

            callback();
        });
    }

    isOperational(callback) {
       let self = this;
       self.flightSuretyApp.methods
            .isOperational()
            .call({ from: self.owner}, callback);
    }

    fetchFlightStatus(airline, flight, timestamp, callback) {
        let self = this;
        let payload = {
            airline,
            flight,
            timestamp,
            owner: self.owner,
        }
        console.log({fetchFlightStatus: "fetchFlightStatus", airlines: self.airlines, payload});
        self.flightSuretyApp.methods
            .fetchFlightStatus(payload.airline, payload.flight, payload.timestamp)
            .send({ from: self.owner, gas: GAS}, (error, result) => {
                callback(error, payload);
            });
    }

    payInsurance(airline, flight, timestamp, passengerAddress, _insuranceAmount, callback) {
        let self = this;
        let insuranceAmount = 0;

        try {
            insuranceAmount = parseInt(_insuranceAmount);
        }catch(error) {
            console.error("===== payInsurance =====");
            console.error(error);
        }

        let payload = {
            airline,
            flight,
            timestamp,
            owner: self.owner,
            passengerAddress,
            insuranceAmount,
        }
        self.flightSuretyApp.methods
            .payInsurance(payload.airline, payload.flight, payload.timestamp, payload.passengerAddress, insuranceAmount)
            .send({ from: self.owner, gas: GAS}, (error, result) => {
                callback(error, payload);
            });
    }

    withdrawInsurance(airline, flight, timestamp, passengerAddress, insuranceAmount, callback) {
        let self = this;
        let payload = {
            airline,
            flight,
            timestamp,
            owner: self.owner,
            passengerAddress,
            insuranceAmount,
        }
        self.flightSuretyApp.methods
            .withdrawInsurance(payload.airline, payload.flight, payload.timestamp, payload.passengerAddress)
            .send({ from: self.owner, gas: GAS}, (error, result) => {
                callback(error, payload);
            });
    }
}