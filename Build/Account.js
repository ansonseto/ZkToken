const snarkjs = require("snarkjs");
const fs = require("fs");
const account = require("../src/generate_accounts.js");
const balanceLeaf = require("../src/generate_balance_leaf.js");
// -------------------- get account ----------------------------------------------------
// generate snapshot accounts 
const num_accts = 7;
const prvKeys = account.generatePrvKeys(num_accts);
const zeroPubKey = account.zeroAddress() // [0n, 0n]
const pubKeys = account.generatePubKeys(prvKeys);
pubKeys.unshift(zeroPubKey) // push pubKeys array into zeroPubKeys array
// console.log('pubkeys', pubKeys)

// -------------------- create snpatshot of 10 accounts  ----------------------------------------------------
const token_types = [0, 0, 2, 1, 2, 1, 2, 1];
const balances = [0, 0, 1000, 20, 200, 100, 500, 20];
// need to increment for rollup 
const nonces = [0, 0, 0, 0, 0, 0, 0, 0];

// generate balance leaves for user accounts
const balanceLeafArray = balanceLeaf.generateBalanceLeafArray(
    account.getPubKeysX(pubKeys),
    account.getPubKeysY(pubKeys),
    token_types, balances, nonces
)

var Account = {
    num_accts:num_accts,
    prvKeys:prvKeys,
    pubKeys:pubKeys,
    token_types:token_types,
    balances:balances,
    nonces:nonces,
    balanceLeafArray:balanceLeafArray
}

module.exports = {Account}