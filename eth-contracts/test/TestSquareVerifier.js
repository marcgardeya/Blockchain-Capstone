// define a variable to import the <Verifier> or <renamedVerifier> solidity contract generated by Zokrates
var verifierContract = artifacts.require('Verifier');

const fs = require('fs');
let p = JSON.parse(fs.readFileSync("../zokrates/code/square/proof.json"));
p.proof.aModified = ["0x0", "0x0"];

contract('TestSquareVerifier', accounts => {

    describe('test verification', function () {
        beforeEach(async function () { 
            this.contract = await verifierContract.new();
        })

        // Test verification with correct proof
        // - use the contents from proof.json generated from zokrates steps
        it('test verification with correct proof', async function () { 
            let rc = await this.contract.verifyTx.call(p.proof.a, p.proof.b, p.proof.c, p.inputs)
            assert.equal(rc, true, 'verification failed with correct proof');
        })

        // Test verification with incorrect proof
        it('test verification with incorrect proof', async function () { 
            let rc = await this.contract.verifyTx.call(p.proof.aModified, p.proof.b, p.proof.c, p.inputs)
            assert.equal(rc, false, 'verification succeeded with incorrect proof');
        })
    })
});