const mimcjs = require("../src/mimc7.js");
const {bigInt} = require("snarkjs");
const { zero } = require("snarkjs/src/bigint.js");

module.exports = {

    zeroLeaf: function(){
        zeroLeaf = {};
        zeroLeaf['pubKey_x'] = bigInt("0".padStart(76,'0'));
        zeroLeaf['pubKey_y'] = bigInt("0".padStart(77,'0'));
        zeroLeaf['balance'] = bigInt('0');
        zeroLeaf['nonce'] = bigInt('0');
        zeroLeaf['token_type'] = bigInt('0');
        return zeroLeaf;
    },

    zeroLeafHash: function(){
        const zeroLeaf = module.exports.zeroLeaf()
        const zeroLeafHash = module.exports.hashBalanceLeafArray([zeroLeaf])[0]
        return zeroLeafHash
    },

    isZeroLeaf: function(balanceLeaf){
        zeroLeaf = module.exports.zeroLeaf()
        if(
            zeroLeaf['pubKey_x'] == balanceLeaf['pubKey_x'] &&
            zeroLeaf['pubKey_y'] == balanceLeaf['pubKey_y'] &&
            zeroLeaf['balance'] == balanceLeaf['balance'] &&
            zeroLeaf['nonce'] == balanceLeaf['nonce'] &&
            zeroLeaf['token_type'] == balanceLeaf['token_type'] 
        ) return true
    },

    generateBalanceLeafArray: function(accts_x, accts_y, token_types, balances, nonces){
        if (Array.isArray(accts_x)){
            balanceLeafArray = [];
            for (i = 0; i < accts_x.length; i++){
                leaf = {}
                leaf['pubKey_x'] = bigInt(accts_x[i]);
                leaf['pubKey_y'] = bigInt(accts_y[i]);
                leaf['balance'] = bigInt(balances[i]);
                leaf['nonce'] = bigInt(nonces[i]);
                leaf['token_type'] = bigInt(token_types[i]);
                balanceLeafArray.push(leaf);
            }
            return balanceLeafArray;
        } else {
            console.log('please enter values as arrays.')
        }

    },

    hashBalanceLeafArray: function(leafArray){
        if (Array.isArray(leafArray)){
            balanceLeafHashArray = [];
            for (i = 0; i < leafArray.length; i++){
                leafHash = mimcjs.multiHash([
                    bigInt(leafArray[i]['pubKey_x']),
                    bigInt(leafArray[i]['pubKey_y']),
                    bigInt(leafArray[i]['balance']),
                    bigInt(leafArray[i]['nonce']),
                    bigInt(leafArray[i]['token_type'])
                ])
                balanceLeafHashArray.push(leafHash)
            }
            return balanceLeafHashArray
        } else {
            console.log('please enter values as arrays.')
        }
    }
}

