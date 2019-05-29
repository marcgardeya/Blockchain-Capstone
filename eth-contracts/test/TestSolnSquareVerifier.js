var SquareVerifier = artifacts.require("Verifier.sol");
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
            this.contract = await SolnSquareVerifier.new(SquareVerifier.address, "Name", "Symbol");
        })

        // Test if a new solution can be added
        it('should add a solution', async function () { 
            let result = await this.contract.addSolution(p.proof.A, p.proof.A_p, p.proof.B, p.proof.B_p, p.proof.C, p.proof.C_p, p.proof.H, p.proof.K, p.input,{from:account_one});
            truffleAssert.eventEmitted(result, 'SolutionAdded', (event) => { return true; }, 'missing SolutionAdded event');
        })

        // Test if an ERC721 token can be minted
        it('should mint ERC721 token', async function () { 
            await this.contract.addSolution(p.proof.A, p.proof.A_p, p.proof.B, p.proof.B_p, p.proof.C, p.proof.C_p, p.proof.H, p.proof.K, p.input,{from:account_one});
            let result = await this.contract.mint(account_one, 100, {from:account_one});
            truffleAssert.eventEmitted(result, 'Transfer', (event) => { return true; }, 'missing Transfer event');
        })
    })
})
