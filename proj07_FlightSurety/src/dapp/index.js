
import DOM from './dom';
import Contract from './contract';
import './flightsurety.css';

const FLIGHT_NUMBER_LIST = {
    "Flight 01": {
        "value": "Flight 01",
        "timestamp": "100000"
    },
    "Flight 02": {
        "value": "Flight 02",
        "timestamp": "100001"
    },
    "Flight 03": {
        "value": "Flight 03",
        "timestamp": "100002"
    },
}

(async() => {

    // let result = null;

    let contract = new Contract('localhost', () => {

        // Read transaction
        contract.isOperational((error, result) => {
            console.log(error,result);
            display('Operational Status', 'Check if contract is operational', [ { label: 'Operational Status', error: error, value: result} ]);
        });
    

        // User-submitted transaction
        // DOM.elid('submit-oracle').addEventListener('click', () => {
        //     let flight = DOM.elid('input[flight][number]').value;
        //     // Write transaction
        //     contract.fetchFlightStatus(flight, (error, result) => {
        //         display('Oracles', 'Trigger oracles', [ { label: 'Fetch Flight Status', error: error, value: result.flight + ' ' + result.timestamp} ]);
        //     });
        // })

        DOM.elid('action[flight][status][fetch]').addEventListener('click', () => {
            let flight = DOM.elid('input[flight][insurance][passenger]').value;
            // Write transaction
            contract.fetchFlightStatus(flight, (error, result) => {
                display('Oracles', 'Trigger oracles', [ { label: 'Fetch Flight Status', error: error, value: result.flight + ' ' + result.timestamp} ]);
            });
        })

        DOM.elid('action[passenger][flight][insurance][buy]').addEventListener('click', () => {
            // alert('Buy insurance for flight');
            // return;

            let airline = DOM.elid('input[airlines][value][add]').value;
            let flight = DOM.elid('input[passenger][airline-choice][flight_list][address]').value;
            console.log({airline, flight});
            // let passenger = DOM.elid('input[passenger][flight][insurance][buy]').value;
            // Write transaction
            // contract.fetchFlightStatus(flight, (error, result) => {
            //     display('Oracles', 'Trigger oracles', [ { label: 'Fetch Flight Status', error: error, value: result.flight + ' ' + result.timestamp} ]);
            // });
        })
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

function setFavicons(favImg){
    let headTitle = document.querySelector('head');
    let setFavicon = document.createElement('link');
    setFavicon.setAttribute('rel','shortcut icon');
    setFavicon.setAttribute('href',favImg);
    console.log(setFavicon);
    // headTitle.appendChild("setFavicon");
    // headTitle.appendChild(setFavicon);
}

setFavicons('./favicon.ico');

