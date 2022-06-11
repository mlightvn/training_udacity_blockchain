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
    App.setStatusAdd("New Star Owner is " + this.account);
  },

  // Implement Task 4 Modify the front end of the DAPP
  lookUp: async function (){
    let lookidEl = document.getElementById("lookid");
    let lookid = parseInt(lookidEl.value);

    if(!lookid){
      this.setStatusSearch("Star ID is required.");
      return;
    }else if(lookid <= 0){
      this.setStatusSearch("Star ID must be greater than 0.");
      return;
    }
    // let lookid = (lookidEl.value);

    if(this.meta){
      let { lookUptokenIdToStarInfo } = this.meta.methods;
      // https://web3js.readthedocs.io/en/v1.2.11/web3-eth-contract.html?highlight=method#id26

      let starName = await lookUptokenIdToStarInfo(lookid).call()

      // let starName = null;
      // await lookUptokenIdToStarInfo(lookid)
      // .call()
      // .then(function(result, error){
      //   // console.log({error, result});
      //   starName = result;
      // })
      // .catch(function(error){
      //   console.log({error});
      // }
      // );


      console.log({starName, lookid});
      if(starName){
        this.setStatusSearch(starName);
      }else{
        this.setStatusSearch("Not found.");
      }
  
    }
  },

  // Implement Task 1
  ExchangeStars: async function (){
    let star1Id = document.getElementById("exchange\\[star1\\]");
    let star2Id = document.getElementById("exchange\\[star2\\]");
    let star1IdValue = parseInt(star1Id.value);
    let star2IdValue = parseInt(star2Id.value);

    if(!star1IdValue){
      this.setStatusSearch("Star 1 ID is required.");
      return;
    }
    if(star1IdValue <= 0){
      this.setStatusSearch("Star 1 ID must be greater than 0.");
      return;
    }
    if(!star2IdValue){
      this.setStatusSearch("Star 2 ID is required.");
      return;
    }
    if(star2IdValue <= 0){
      this.setStatusSearch("Star 2 ID must be greater than 0.");
      return;
    }

    if(this.meta){
      // let { exchangeStars } = this.meta.methods;

      // let starName = await exchangeStars(lookid).send({from: this.account})

      // console.log({starName, lookid});
      // if(starName){
      //   this.setStatusSearch(starName);
      // }else{
      //   this.setStatusSearch("Not found.");
      // }
  
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