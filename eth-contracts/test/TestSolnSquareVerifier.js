var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');

const fs = require('fs');
let p = JSON.parse(fs.readFileSync("../zokrates/code/square/proof.json"));

const truffleAssert = require('truffle-assertions');


contract('TestSolnSquareVerifier', accounts => {

    const account_one   = accounts[0];
    const account_two   = accounts[1];
    const account_three = accounts[2];
    const account_four  = accounts[3];

    describe('test square verfier solution', function () {
        beforeEach(async function () { 
            this.contract = await SolnSquareVerifier.new(account_one, "Name", "Symbol");
        })

        // Test if a new solution can be added
        it('should add a solution', async function () { 
            let result = await this.contract.addSolution(p.proof.A, p.proof.A_p, p.proof.b, p.proof.B_p, p.proof.c, p.proof.C_p, p.proof.H, p.proof.K, p.input,{from:account_one});
            truffleAssert.eventEmitted(result, 'SolutionAdded', (event) => { return true; }, 'missing SolutionAdded event');
        })

        // Test if an ERC721 token can be minted
        //it('should mint ERC721 token', async function () { 
            //let rc = this.contract.mint(account_one, 2, {from:account_one});
            //assert.equal(rc, true, "token can not be minted");
        //})
    })
})
