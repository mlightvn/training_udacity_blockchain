<template>
  <div class="hello">
    <h1>{{ title }}</h1>

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
      </div>
      <div class="card-footer">
        <button class="btn btn-primary" @click="lookUp">Look up</button>
      </div>
    </div>

    <hr />
    <br />
    <span id="status">{{status}}</span>
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
      account: null,
      meta: null,

      status: null,

      star: {
        name: null,
        id: null,
        search_id: null,
      },

    }
  },
  methods: {

    start: async function() {
      const { web3 } = this;

      try {
        // get contract instance
        const networkId = await web3.eth.net.getId();
        console.log({networkId})
        const deployedNetwork = starNotaryArtifact.networks[networkId];
        console.log({deployedNetwork})
        this.meta = new web3.eth.Contract(
          starNotaryArtifact.abi,
          deployedNetwork.address,
        );

        // get accounts
        const accounts = await web3.eth.getAccounts();
        this.account = accounts[0];
      } catch (error) {
        console.error("Could not connect to contract or chain.");
      }
    },

    setStatus: function(message) {
      this.status = message;
    },

    createStar: async function() {
      console.log("Creating a star...");
      const { createStar } = this.meta.methods;
      await createStar(this.star.name, this.star.id).send({from: this.account});
      this.setStatus("New Star Owner is " + this.account + ".");
    },

    // Implement Task 4 Modify the front end of the DAPP
    lookUp: async function (){
      // let id = document.getElementById('lookid').value;
      // this.lookUp(id);
    },
  },

  created: async function() {
    this.web3 = new Web3(new Web3.providers.HttpProvider(configuration.web3Provider.endpoint));

    // if (window.ethereum) {
    //   // use MetaMask's provider
    //   this.web3 = new Web3(window.ethereum);
    //   await window.ethereum.enable(); // get permission to access accounts
    // } else {
    //   console.warn(`No web3 detected. Falling back to ${configuration.web3Provider.endpoint}. You should remove this fallback when you deploy live`,);
    //   // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    //   this.web3 = new Web3(new Web3.providers.HttpProvider(configuration.web3Provider.endpoint),);
    // }

    await this.start();
  }
}
</script>