
import DOM from './dom';
import Contract from './contract';
import './flightsurety.css';
// import "./jquery.min.js";


const FLIGHT_NUMBER_LIST = {
    "Flight 01": "100000",
    "Flight 02": "100001",
    "Flight 03": "100002",
};

(async() => {

    // let result = null;

    let contract = new Contract('localhost', () => {

        // Read transaction
        contract.isOperational((error, result) => {
            console.log({isOperational: true, error,result});
            display('Operational Status', 'Check if contract is operational', [ { label: 'Operational Status', error: error, value: result} ]);
        });
    

        // // User-submitted transaction
        // DOM.elid('submit-oracle').addEventListener('click', () => {
        //     let flight = DOM.elid('flight-number').value;
        //     // Write transaction
        //     contract.fetchFlightStatus(flight, (error, result) => {
        //         display('Oracles', 'Trigger oracles', [ { label: 'Fetch Flight Status', error: error, value: result.flight + ' ' + result.timestamp} ]);
        //     });
        // })

        // fetch flight status
        DOM.elid('action[flight][status][fetch]').addEventListener('click', async () => {
            let airline = DOM.elid('input[airlines][value][add]').value;
            let flight = DOM.elid('input[passenger][airline-choice][flight_list][address]').value;
            // let flight = DOM.elid('input[flight][insurance][passenger]').value;
            // Write transaction
            // console.log({fetchFlightStatus: contract.fetchFlightStatus})
            contract.fetchFlightStatus(airline, flight, FLIGHT_NUMBER_LIST[flight], (error, result) => {
                display('Oracles', 'Trigger oracles', [ { label: 'Fetch Flight Status', error: error, value: result.flight + ' ' + result.timestamp} ]);
            });

        })

        // buy insurance
        DOM.elid('action[passenger][flight][insurance][buy]').addEventListener('click', async () => {
            let airline = DOM.elid('input[airlines][value][add]').value;
            let flight = DOM.elid('input[passenger][airline-choice][flight_list][address]').value;

            let passengerAddress = DOM.elid('input[flight][insurance][passenger][address]').value;
            let insuranceAmount = DOM.elid('input[passenger][flight][insurance][value]').value;
            
            // Write transaction
            console.log({contract, airline, flight, passengerAddress, insuranceAmount});

            await contract.payInsurance(airline, flight, FLIGHT_NUMBER_LIST[flight], passengerAddress, insuranceAmount, (error, result) => {
                display('Oracles', 'Trigger oracles', [ { label: 'Buy Insurance', error: error, value: result.flight + ' ' + result.timestamp} ]);
            });

        })

        // withdraw insurance
        DOM.elid('action[passenger][insurance][withdraw]').addEventListener('click', async () => {
            let airline = DOM.elid('input[airlines][value][add]').value;
            let flight = DOM.elid('input[passenger][airline-choice][flight_list][address]').value;

            let passengerAddress = DOM.elid('input[flight][insurance][passenger][address]').value;
            let insuranceAmount = DOM.elid('input[passenger][flight][insurance][value]').value;
            
            // Write transaction
            console.log({contract, airline, flight, passengerAddress, insuranceAmount});

            await contract.withdrawInsurance(airline, flight, FLIGHT_NUMBER_LIST[flight], passengerAddress, insuranceAmount, (error, result) => {
                display('Oracles', 'Trigger oracles', [ { label: 'Withdraw Insurance', error: error, value: result.flight + ' ' + result.timestamp} ]);
            });

        })

        // 

    });
    

})();


function display(title, description, results) {
    let displayDiv = DOM.elid("display-wrapper");
    let section = DOM.section();
    section.appendChild(DOM.h2(title));
    section.appendChild(DOM.h5(description));
    results.map((result) => {
        let row = section.appendChild(DOM.div({className:'row'}));
        row.appendChild(DOM.div({className: 'col-sm-4 field'}, result.label));
        row.appendChild(DOM.div({className: 'col-sm-8 field-value'}, result.error ? String(result.error) : String(result.value)));
        section.appendChild(row);
    })
    displayDiv.append(section);

}



