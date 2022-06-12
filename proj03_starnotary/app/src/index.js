let configuration = require('../configuration.js');
import copy from 'copy-to-clipboard';

import Web3 from "web3";
import starNotaryArtifact from "../../build/contracts/StarNotary.json";

const App = {
  web3: null,
  account: null,
  meta: null,

  start: async function() {
    const { web3 } = this;

    try {
      // get contract instance
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = starNotaryArtifact.networks[networkId];
      this.meta = new web3.eth.Contract(
        starNotaryArtifact.abi,
        deployedNetwork.address,
      );

      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];
      // console.log({account: this.account})
    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }

    await this.getChainId();

  },
  getChainId: async function() {
    const { web3 } = this;
    let self = this;

    try {
      web3.eth.getChainId().then(function(chainId){
        self.setChainId(chainId);
      });
    } catch (error) {
      console.error({getChainId: error});
    }
  },

  setStatusAdd: function(message) {
    const status = document.getElementById("status_add");
    status.innerHTML = message;
  },

  copyFromElementId: function(elementId) {
    const el = document.getElementById(elementId);
    let value = el.value;
    copy(value);
  },

  setStatusSearch1: function(star, message = null) {
    const starElMessage = document.getElementById("status[search][star1][message]");
    // const starElId = document.getElementById("status[search][star1][id]");
    const starElName = document.getElementById("status[search][star1][name]");
    const starElOwner = document.getElementById("status[search][star1][owner]");
    if(star){
      starElMessage.innerHTML = message || "";
      // starElId.value = star.tokenId;
      starElName.value = star.starName;
      starElOwner.value = star.owner;
    }else{
      starElMessage.innerHTML = message || "Not found";
      // starElId.value = "";
      starElName.value = "";
      starElOwner.value = "";
    }
  },

  setStatusSearch2: function(star, message = null) {
    const starElMessage = document.getElementById("status[search][star2][message]");
    // const starElId = document.getElementById("status[search][star2][id]");
    const starElName = document.getElementById("status[search][star2][name]");
    const starElOwner = document.getElementById("status[search][star2][owner]");
    if(star){
      starElMessage.innerHTML = message || "";
      // starElId.value = star.tokenId;
      starElName.value = star.starName;
      starElOwner.value = star.owner;
    }else{
      starElMessage.innerHTML = message || "Not found";
      // starElId.value = "";
      starElName.value = "";
      starElOwner.value = "";
    }
  },
  setStatusExchange: function(message) {
    const starElMessage = document.getElementById("status[exchange][message]");
    starElMessage.innerHTML = message;
  },

  setStatusTransfer: function(message) {
    const starElMessage = document.getElementById("status[transfer][message]");
    starElMessage.innerHTML = message;
  },

  setChainId: function(chainId) {
    let chainIdEl = document.getElementById("chain_id");
    chainIdEl.innerHTML = chainId;
  },

  createStar: async function() {
    const { createStar } = this.meta.methods;
    const name = document.getElementById("starName").value;
    const id = document.getElementById("starId").value;
    await createStar(name, id).send({from: this.account});
    App.setStatusAdd("New Star Owner is " + this.account);
  },

  // Implement Task 4 Modify the front end of the DAPP
  lookUp: async function (starIndex){
    switch(starIndex){
      case 1:
        await App.lookUp1();
        break;
      case 2:
        await App.lookUp2();
        break;
      default:
        break;
    }
  },

  lookUp1: async function (){
    let lookidEl = document.getElementById("search[star1][id]");
    let lookid = parseInt(lookidEl.value);

    if(!lookid){
      this.setStatusSearch(null, "Star ID is required.");
      return;
    }else if(lookid <= 0){
      this.setStatusSearch(null, "Star ID must be greater than 0.");
      return;
    }
    // let lookid = (lookidEl.value);

    if(this.meta){
      let { lookUptokenIdToStarInfo } = this.meta.methods;
      // https://web3js.readthedocs.io/en/v1.2.11/web3-eth-contract.html?highlight=method#id26

      // let searchObj = await lookUptokenIdToStarInfo(lookid).call()

      let searchObj = null;
      await lookUptokenIdToStarInfo(lookid)
      .call()
      .then(function(result, error){
        console.log({then: true, error, result});
        searchObj = result;
      })
      .catch(function(error){
        console.log({catch: true, error});
      }
      );


      console.log({searchObj, lookid});
      this.setStatusSearch1(searchObj);
  
    }
  },

  lookUp2: async function (){
    let lookidEl = document.getElementById("search[star2][id]");
    let lookid = parseInt(lookidEl.value);

    if(!lookid){
      this.setStatusSearch2(null, "Star ID is required.");
      return;
    }else if(lookid <= 0){
      this.setStatusSearch2(null, "Star ID must be greater than 0.");
      return;
    }
    // let lookid = (lookidEl.value);

    if(this.meta){
      let { lookUptokenIdToStarInfo } = this.meta.methods;
      // https://web3js.readthedocs.io/en/v1.2.11/web3-eth-contract.html?highlight=method#id26

      // let searchObj = await lookUptokenIdToStarInfo(lookid).call()

      let searchObj = null;
      await lookUptokenIdToStarInfo(lookid)
      .call()
      .then(function(result, error){
        console.log({then: true, error, result});
        searchObj = result;
      })
      .catch(function(error){
        console.log({catch: true, error});
      }
      );


      console.log({searchObj, lookid});
      this.setStatusSearch2(searchObj);
  
    }
  },

  // Implement Task 1
  ExchangeStars: async function (){
    let star1Id = document.getElementById("exchange[star1][id]");
    let star2Id = document.getElementById("exchange[star2][id]");
    let star1IdValue = parseInt(star1Id.value);
    let star2IdValue = parseInt(star2Id.value);

    if(!star1IdValue){
      this.setStatusExchange("Star 1 ID is required.");
      return;
    }
    if(star1IdValue <= 0){
      this.setStatusExchange("Star 1 ID must be greater than 0.");
      return;
    }
    if(!star2IdValue){
      this.setStatusExchange("Star 2 ID is required.");
      return;
    }
    if(star2IdValue <= 0){
      this.setStatusExchange("Star 2 ID must be greater than 0.");
      return;
    }
    if(star1IdValue === star2IdValue){
      this.setStatusExchange("Star 1 ID and Star 2 ID must be different.");
      return;
    }

    if(this.meta){
      let { exchangeStars } = this.meta.methods;
      let self = this;

      try {
        await exchangeStars(star1IdValue, star2IdValue)
        .send({from: this.account})
        .then(function(result, error){
          console.log({then: true, error, result});
          if(error === undefined){
            self.setStatusExchange("Done");
          }else{
            self.setStatusExchange(error.message);
          }
        })
        .catch(function(error){
          console.log({catch: true, error});
          let message = error.message || error.stack;
          self.setStatusExchange(message);
        }
        );

      } catch (error) {
        this.setStatusExchange(error.message);
      }

    }
  },

  // Implement Task 1: transferStar
  TransferStar: async function (){
    let transferInput = {
      to_address: document.getElementById("transfer[input][to_address]").value,
      starId: document.getElementById("transfer[input][star_id]").value,
    }

    if(!transferInput.to_address){
      this.setStatusTransfer("TO ADDRESS is required.");
      return;
    }
    if(!transferInput.starId){
      this.setStatusTransfer("Star ID is required.");
      return;
    }
    if(transferInput.starId <= 0){
      this.setStatusTransfer("Star ID must be greater than 0.");
      return;
    }

    if(this.meta){
      let { transferStar } = this.meta.methods;
      let self = this;

      try {
        await transferStar(transferInput.to_address, transferInput.starId)
        .send({from: this.account})
        .then(function(result, error){
          console.log({then: true, error, result});
          if(error === undefined){
            self.setStatusTransfer("Done");
          }else{
            self.setStatusTransfer(error.message);
          }
        })
        .catch(function(error){
          console.log({catch: true, error});
          let message = error.message || error.stack;
          self.setStatusTransfer(message);
        }
        );

      } catch (error) {
        this.setStatusTransfer(error.message);
      }

    }
  },

};

window.App = App;

window.addEventListener("load", async function() {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    await window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn(`No web3 detected. Falling back to ${configuration.web3Provider.endpoint}. You should remove this fallback when you deploy live`,);
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(new Web3.providers.HttpProvider(configuration.web3Provider.endpoint),);
  }

  App.start();
});