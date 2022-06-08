<template>
  <div class="hello">
    <h1>{{ title }}</h1>

    <br />
    <hr />
        <h2>Chain ID: {{chainId}}</h2>
    <hr />
    <br />


    <div class="card">
      <div class="card-header">
        <h3>Create a Star</h3>
      </div>
      <div class="card-body">
        <div class="input-group mb-3">
          <span class="input-group-text">Star Name</span>
          <input type="text" class="form-control" v-model="star.name">
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">Star ID</span>
          <input type="number" class="form-control" v-model="star.id">
        </div>
        <div class="input-group mb-3" v-if="status.add">
          <span>{{status.add}}</span>
        </div>
      </div>
      <div class="card-footer">
        <button class="btn btn-primary" @click="createStar">Create Star</button>
      </div>
    </div>

    <br>
    <br>
    <br>
    <br>
    <div class="card">
      <div class="card-header">
        <h3>Look up a Star</h3>
      </div>
      <div class="card-body">
        <div class="input-group mb-3">
          <span class="input-group-text">Star ID</span>
          <input type="number" class="form-control" v-model="star.search_id">
        </div>

        <div class="input-group mb-3" v-if="status.search">
          <span>{{status.search}}</span>
        </div>
      </div>
      <div class="card-footer">
        <button class="btn btn-primary" @click="lookUp">Look up</button>
      </div>
    </div>

  </div>
</template>

<script>
let configuration = require('../configuration.js');
import Web3 from "web3";
import starNotaryArtifact from "../../build/contracts/StarNotary.json";

export default {
  name: 'StarNotary',
  data() {
    return {
      title: 'StarNotary Token DAPP',

      web3: null,

      accounts: null,
      account: null,
      meta: null,
      chainId: null,

      status: {
        add: null,
        search: null,
      },

      star: {
        name: null,
        id: null,
        search_id: null,
      },

    }
  },
  methods: {

    start: async function() {
      const { web3, } = this;

      try {
        // get contract instance
        const networkId = await web3.eth.net.getId();
        // console.log({networkId})
        const deployedNetwork = starNotaryArtifact.networks[networkId];
        // console.log({deployedNetwork})

        this.meta = new web3.eth.Contract(
          starNotaryArtifact.abi,
          deployedNetwork.address,
        );
        // console.log({meta: this.meta})

        // get accounts
        this.accounts = await web3.eth.getAccounts();
        // console.log({accounts: this.accounts})
        this.account = this.accounts[0];
      } catch (error) {
        console.error("Could not connect to contract or chain.");
        console.error({error});
      }
    },

    getChainId: async function() {
      if(this.web3){
        let self = this
        await this.web3.eth.getChainId().then(function(chainId){
          self.chainId = chainId;
          // console.error({getChainId: true, chainId});
        });
      }else{
        console.error("Web3 is not initialized.");
      }

    },

    setStatusAdd: function(message) {
      this.status.add = message;
    },
    setStatusSearch: function(message) {
      this.status.search = message;
    },

    createStar: async function() {
      // console.log("Creating a star...");
      const { createStar } = this.meta.methods;
      await createStar(this.star.name, this.star.id).send({from: this.account});
      this.setStatusAdd("New Star Owner is " + this.account + ".");
    },

    // Implement Task 4 Modify the front end of the DAPP
    lookUp: async function (){
      const { lookUptokenIdToStarInfo } = this.meta.methods;
      await lookUptokenIdToStarInfo(this.star.search_id).call({from: this.account}).then(function(result){
        // console.log({result});
        if(result[0] == ""){
          this.setStatusSearch("Star not found.");
        }else{
          this.setStatusSearch("Star found. Star name is " + result[0] + ".");
        }
      }
      ).catch(function(error){
        console.error({error});
      });

      // let account = this.accounts[this.star.search_id];
      // if(account){
      //   this.setStatusSearch("Star Owner is searched: " + account + ".");
      // }else{
      //   this.setStatusSearch("Star Owner is not found.");
      // }
    },
  },

  created: async function() {
    if (window.ethereum) {
      // use MetaMask's provider
      this.web3 = new Web3(window.ethereum);
      await window.ethereum.enable(); // get permission to access accounts
    } else {
      console.warn(`No web3 detected. Falling back to ${configuration.web3Provider.endpoint_ws}. You should remove this fallback when you deploy live`,);
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      this.web3 = new Web3(new Web3.providers.HttpProvider(configuration.web3Provider.endpoint_ws),);
    }

    await this.start();
    await this.getChainId();
  }
}
</script>