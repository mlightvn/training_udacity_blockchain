const Fundraiser = artifacts.require("Fundraiser");
const Wallet = artifacts.require("Wallet");

contract('Fundraiser', (accs) => {
    accounts = accs;
    owner = accounts[0];
    // this.contracts = {
    //     Fundraiser: null,
    //     Wallet: null,
    // };

    before(async () => {
        // this.contracts.Fundraiser = await Fundraiser.deployed();
        // this.contracts.Wallet = await Wallet.deployed(this.contracts.Fundraiser.address);

        // await this.contracts.Fundraiser.send(200);
        // await this.contracts.Wallet.send(100);
    });

    it('initiate balances for Fundraiser and Wallet', async() => {
        let contracts = {
            Fundraiser: null,
            Wallet: null,
        };
        contracts.Fundraiser = await Fundraiser.deployed();
        contracts.Wallet = await Wallet.deployed(contracts.Fundraiser.address);

        await contracts.Fundraiser.send(200);
        await contracts.Wallet.send(100);

        let balances = {
            Fundraiser: await contracts.Fundraiser.getBalance(),
            Wallet: await contracts.Wallet.getBalance(),
        }

        expect(web3.utils.toBN("200")).to.eql(balances.Fundraiser)
        expect(web3.utils.toBN("100")).to.eql(balances.Wallet)
    });

    it('Wallet contribute', async() => {
        let contracts = {
            Fundraiser: null,
            Wallet: null,
        };
        contracts.Fundraiser = await Fundraiser.deployed();
        contracts.Wallet = await Wallet.deployed(contracts.Fundraiser.address);

        // await contracts.Fundraiser.send(200);
        // await contracts.Wallet.send(100);

        await contracts.Wallet.contribute(5)

        let balances = {
            Fundraiser: await contracts.Fundraiser.getBalance(),
            Wallet: await contracts.Wallet.getBalance(),
            // FundraiserWithdrawAmount: await contracts.Fundraiser.getWithdrawAmount(),
        }

        expect(web3.utils.toBN("205")).to.eql(balances.Fundraiser)
        expect(web3.utils.toBN("95")).to.eql(balances.Wallet)
        // expect(web3.utils.toBN("5")).to.eql(balances.FundraiserWithdrawAmount)
    });

    it('Wallet Payout', async() => {
        let contracts = {
            Fundraiser: null,
            Wallet: null,
        };
        contracts.Fundraiser = await Fundraiser.deployed();
        contracts.Wallet = await Wallet.deployed(contracts.Fundraiser.address);

        // await contracts.Fundraiser.send(200);
        // await contracts.Wallet.send(100);

        // await contracts.Wallet.contribute(5)
        await contracts.Wallet.payout()

        let balances = {
            Fundraiser: await contracts.Fundraiser.getBalance(),
            Wallet: await contracts.Wallet.getBalance(),
            FundraiserWithdrawAmount: await contracts.Fundraiser.getWithdrawAmount(),
        }

        expect(web3.utils.toBN("105")).to.eql(balances.Fundraiser) // 105
        expect(web3.utils.toBN("195")).to.eql(balances.Wallet) // 95
        expect(web3.utils.toBN("5")).to.eql(balances.FundraiserWithdrawAmount)
    });

});
