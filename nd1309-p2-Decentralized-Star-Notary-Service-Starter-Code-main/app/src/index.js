let configuration = require('../configuration.js');
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
      console.log({account: this.account})
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

  setStatusSearch: function(message) {
    const status = document.getElementById("status_search");
    status.innerHTML = message;
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
    App.setStatusAdd("New Star Owner is " + this.account + ".");
  },

  // Implement Task 4 Modify the front end of the DAPP
  lookUp: async function (){
    let lookidEl = document.getElementById("lookid");
    let lookid = parseInt(lookidEl.value);
    // let lookid = (lookidEl.value);

    if(this.meta){
      // const { lookup } = this.meta.methods;
      // let starInfo = await lookup(lookid).call({from: this.account});
      // let starOwner = starInfo[0];
      // let starId = starInfo[1];
      // let starName = starInfo[2];
      // let starDec = starInfo[3];
      // let starMag = starInfo[4];
      // let starRA = starInfo[5];
      // let starDecimal = starInfo[6];
      // let starStory = starInfo[7];
      // let starOwnerEl = document.getElementById("starOwner");
      // let starIdEl = document.getElementById("starId");
      // let starNameEl = document.getElementById("starName");
      // let starDecEl = document.getElementById("starDec");
      // let starMagEl = document.getElementById("starMag");
      // let starRAEl = document.getElementById("starRA");
      // let starDecimalEl = document.getElementById("starDecimal");
      // let starStoryEl = document.getElementById("starStory");
      // starOwnerEl.innerHTML = starOwner;
      // starIdEl.innerHTML = starId;
      // starNameEl.innerHTML = starName;
      // starDecEl.innerHTML = starDec;
      // starMagEl.innerHTML = starMag;
      // starRAEl.innerHTML = starRA;
      // starDecimalEl.innerHTML = starDecimal;
      // starStoryEl.innerHTML = starStory;

      let { lookUptokenIdToStarInfo, getStar } = this.meta.methods;
      // https://web3js.readthedocs.io/en/v1.2.11/web3-eth-contract.html?highlight=method#id26

      // let starName = await lookUptokenIdToStarInfo(lookid).call({from: this.account})
      // let starName = await lookUptokenIdToStarInfo(lookid).call({from: this.account}).then(function(result, error){
      //   console.log({error, result});
      // });


      let starName = await lookUptokenIdToStarInfo(lookid)
      .call({from: this.account})
      .then(function(result, error){
        console.log({error, result});
      })
      .catch(function(error){
        console.log({error});
      }
      );

      
      console.log({starName, from: this.account, lookid});
      if(starName){
        // this.setStatusSearch("Found: " + starName);
      }else{
        this.setStatusSearch("Not found.");
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