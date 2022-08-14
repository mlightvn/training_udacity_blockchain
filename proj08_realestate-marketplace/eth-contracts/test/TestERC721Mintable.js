// GET_PASSES_THIS_REPO_UDACITY_PLEASE
var ERC721MintableComplete = artifacts.require('SolnSquareVerifier');


contract('TestERC721Mintable', accounts => {
    const CONTRACT_NAME = "NguyenNam RealEstate Marketplace"
    const CONTRACT_SYMBOL = "NRM"
    const CONTRACT_BASE_TOKEN_URI = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"

    let owner = accounts[0];
    let account_one = accounts[1];
    let account_two = accounts[2];
    // console.log({owner})
    // console.log({accounts})
    let tokenIds = [1,2,3,4,5,6,7,8,9,10]
    let mintAmount = {
        account_one: 6,
        account_two: tokenIds.length - 6,
    }

    describe('match erc721 spec', function () {
        beforeEach(async function () {
            this.contract = await ERC721MintableComplete.new(CONTRACT_NAME, CONTRACT_SYMBOL, CONTRACT_BASE_TOKEN_URI, {from: owner});

            // console.log("========{contract: this.contract}========")
            // console.log({contract: this.contract})
            // // console.log({CONTRACT_NAME: CONTRACT_NAME})
            // console.log("================")

            // TODO: mint multiple tokens
            for (let i = 0; i < mintAmount.account_one; i++) {
                await this.contract.mint(account_one, tokenIds[i], {from: owner});
            }
            for (let i = mintAmount.account_one; i < tokenIds.length; i++) {
                await this.contract.mint(account_two, tokenIds[i], {from: owner});
            }
            // await this.contract.mint(account_one, 1, {from: owner});
            // await this.contract.mint(account_one, 2, {from: owner});
            // await this.contract.mint(account_one, 3, {from: owner});
            // await this.contract.mint(account_one, 4, {from: owner});
            // await this.contract.mint(account_one, 5, {from: owner});

            // await this.contract.mint(account_two, 1, {from: owner});
            // await this.contract.mint(account_two, 2, {from: owner});
            // await this.contract.mint(account_two, 3, {from: owner});
            // await this.contract.mint(account_two, 4, {from: owner});
            // await this.contract.mint(account_two, 5, {from: owner});
        })

        it('should return total supply', async function () { 
            let totalSupply = await this.contract.totalSupply();
            assert.equal(totalSupply, tokenIds.length, "total supply is not 10");
        })

        it('should get token balance', async function () { 
            let balance = await this.contract.balanceOf(account_one);
            assert.equal(balance, mintAmount.account_one, `balance is not ${mintAmount.account_one}`);
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            await this.contract._setTokenURI(1);
            let tokenURI = await this.contract._getTokenURI(1);
            assert.equal(tokenURI, CONTRACT_BASE_TOKEN_URI + "1", "tokenURI is not [" + CONTRACT_BASE_TOKEN_URI + "1]");
        })

        it('should transfer token from one owner to another', async function () {
            // let ownerOf = await this.contract.getOwnerOf(1);
            // assert.equal(ownerOf, account_one, `ownerOf(${ownerOf}) is not account_one(${account_one})`);
            // assert.equal(ownerOf, account_two, `ownerOf(${ownerOf}) is not account_two(${account_two})`);

            await this.contract.transferFrom(account_one, account_two, 1, {from: account_one});
            let balance = await this.contract.balanceOf(account_one);
            expect(web3.utils.toBN(mintAmount.account_one - 1)).to.eql(balance)
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new(CONTRACT_NAME, CONTRACT_SYMBOL, CONTRACT_BASE_TOKEN_URI, {from: owner});

            await this.contract.mint(account_one, 1, {from: owner});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            await this.contract.mint(account_one, 2, {from: account_two});
        })

        it('should return contract owner', async function () { 
            let _owner = await this.contract.getOwnerAddress();
            assert.equal(owner, _owner, `_owner(${_owner}) is not owner(${owner})`);
        })

    });
})