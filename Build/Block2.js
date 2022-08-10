const snarkjs = require("snarkjs");
const fs = require("fs");

const {Account} = require('./Account');
const {GenesisBlock} = require('./GenesisBlock')
const {Block1} = require('./Block1')
const account = require("../src/generate_accounts.js");
const txLeaf = require("../src/generate_tx_leaf.js");
const merkle = require("../src/MiMCMerkle.js")
const update = require("../src/update.js")

const TX_DEPTH = GenesisBlock.TX_DEPTH
const BAL_DEPTH = GenesisBlock.BAL_DEPTH
const zeroLeaf = GenesisBlock.zeroLeaf

// generate tx's: 
// 1. Alice --500--> Charlie , 
// 2. Charlie --200--> withdraw,
// 3. Bob --10--> Daenerys,
// 4. empty tx (operator --0--> withdraw)
from_accounts_idx = [4, 5, 7, 2]
from_accounts = update.pickByIndices(Account.pubKeys, from_accounts_idx)
to_accounts_idx = [2, 3, 1, 0]
to_accounts = update.pickByIndices(Account.pubKeys, to_accounts_idx)

from_x = account.getPubKeysX(from_accounts)
from_y = account.getPubKeysY(from_accounts)
to_x = account.getPubKeysX(to_accounts)
to_y = account.getPubKeysY(to_accounts)
const amounts = [200, 50, 10, 100]
const tx_token_types = [2, 1, 1, 0]// need increment nonce when do rollup 
const tx_nonces = [1, 0, 0, 1]// need increment nonce when do rollup 

// create first block trasnaction merkle tree - generate txLeaf.js
const txArray = txLeaf.generateTxLeafArray(
    from_x, from_y, to_x, to_y, tx_nonces, amounts, tx_token_types
)
// hash account merkle tree - generate txLeaf.js
const txLeafHashes = txLeaf.hashTxLeafArray(txArray)

// return the whole tree hashes 
const txTree = merkle.treeFromLeafArray(txLeafHashes)
const txRoot = merkle.rootFromLeafArray(txLeafHashes)

// proof account leaf hashes in teh account merkle tree
const txProofs = new Array(2**TX_DEPTH)
for (jj = 0; jj < 2**TX_DEPTH; jj++){
    txProofs[jj] = merkle.getProof(jj, txTree, txLeafHashes)
}

signingPrvKeys = new Array()
from_accounts_idx.forEach(function(index){
    signingPrvKeys.push(Account.prvKeys[index - 1])
})

// sign the trasnsaction 
const signatures = txLeaf.signTxLeafHashArray(
    txLeafHashes, 
    signingPrvKeys
)

const inputs = update.processTxArray(
    TX_DEPTH,
    BAL_DEPTH,
    Account.pubKeys,
    Block1.paddedTo16BalanceLeafArray,
    from_accounts_idx,
    to_accounts_idx,
    tx_nonces,
    amounts,
    tx_token_types,
    signatures,
)

fs.writeFileSync(
    "Block/block2.json",
    JSON.stringify(inputs, (_, v) => typeof v === 'bigint' ? `${v}n` : v)
        .replace(/"(-?\d+)n"/g, (_, a) => a),
    "utf-8"
);

// console.log('paddedTo16BalanceLeafArray', Block1.paddedTo16BalanceLeafArray )
// console.log('inputs.balanceLeafArraySender',inputs.balanceLeafArraySender)

var Block2={
    paddedTo16BalanceLeafArray:inputs.balanceLeafArrayReceiver,
    pubKeys: Account.pubKeys,
    nonce: newNonce
}

module.exports = {Block2}

