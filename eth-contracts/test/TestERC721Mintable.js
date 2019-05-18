var CustomERC721Token = artifacts.require('CustomERC721Token');

contract('TestERC721Mintable', accounts => {

    const account_one   = accounts[0];
    const account_two   = accounts[1];
    const account_three = accounts[2];
    const account_four  = accounts[3];

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await CustomERC721Token.new("Name", "Symbol", {from: account_one});

            // TODO: mint multiple tokens
            await this.contract.mint(account_two,2);
            await this.contract.mint(account_three,3);
            await this.contract.mint(account_four,4);
        })

        it('should return total supply', async function () { 
            let supply = await this.contract.totalSupply();
            assert.equal(supply,3,"total supply is off");
        })

        it('should get token balance', async function () { 
            let balance = await this.contract.balanceOf(account_two);
            assert.equal(balance,1,"balance is off");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let tokenURI = await this.contract.tokenURI(2);
            assert.equal(tokenURI,"https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/2","token URI wrong");
        })

        it('should transfer token from one owner to another', async function () { 
            this.contract.approve(account_three, 2, {from:account_one});
            await this.contract.transferFrom(account_two, account_three, 2, {from:account_two});

            let balance = await this.contract.balanceOf(account_two);
            assert.equal(balance,0,"transfer from account balance off");

            balance = await this.contract.balanceOf(account_three);
            assert.equal(balance,2,"transfer to account balance off");
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await CustomERC721Token.new("Name", "Symbol", {from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            let rc = await this.contract.mint.call(account_two,2,{from:account_two});
            assert.equal(rc, false, "doesn't fail when minting when address is not contract owner")
        })

        it('should return contract owner', async function () { 
            let owner = await this.contract.owner();
            assert.equal(owner,account_one,"doesn't return contract owner");            
        })

    });
})