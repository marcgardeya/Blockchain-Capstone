var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');

const fs = require('fs');
let p = JSON.parse(fs.readFileSync("../zokrates/code/square/proof.json"));


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
            let rc = this.contract.addSolution(p.proof.a, p.proof.b, p.proof.c, p.inputs);
            assert(rc, true, "could not add solution to verifier");
        })

        // Test if an ERC721 token can be minted
        it('should mint ERC721 token', async function () { 
            this.contract.mint(account_two, 2, {from:account_one});
        })
    })
})
