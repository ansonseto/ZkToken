const mimcjs = require("../src/mimc7.js");
const account = require("./generate_accounts.js");
const eddsa = require("../src/eddsa.js");
const {bigInt} = require("snarkjs")

module.exports = {

    generateTxLeafArray: function(
        from_x, from_y, to_x, to_y, nonces, amounts, token_types
    ){
        if (Array.isArray(from_x)){
            txLeafArray = [];
            for (var i = 0; i < from_x.length; i++){
                leaf = {}
                leaf['from_x'] = bigInt(from_x[i]);
                leaf['from_y'] =  bigInt(from_y[i]);
                leaf['to_x'] =  bigInt(to_x[i]);
                leaf['to_y'] =  bigInt(to_y[i]);
                leaf['nonce'] =  bigInt(nonces[i]);
                leaf['amount'] =  bigInt(amounts[i]);
                leaf['token_type'] =  bigInt(token_types[i]);
                txLeafArray.push(leaf);
                // console.log(i, leaf)
            }
            return txLeafArray;
        } else {
            console.log('please enter values as arrays.')
        }

    },

    hashTxLeafArray: function(leafArray){
        if (Array.isArray(leafArray)){
            txLeafHashArray = [];
            for (i = 0; i < leafArray.length; i++){
                leafHash = mimcjs.multiHash([
                    leafArray[i]['from_x'],
                    leafArray[i]['from_y'],
                    leafArray[i]['to_x'],
                    leafArray[i]['to_y'],
                    leafArray[i]['nonce'],
                    leafArray[i]['amount'],
                    leafArray[i]['token_type']
                ])
                txLeafHashArray.push(leafHash)
            }
            return txLeafHashArray
        } else {
            console.log('please enter values as arrays.')
        }
    },

    signTxLeafHashArray: function(leafHashArray, prvKeys){
        if (Array.isArray(leafHashArray)){
            signatures = [];
            for (i = 0; i < leafHashArray.length; i++){
                signature = eddsa.signMiMC(prvKeys[i], leafHashArray[i]);
                signatures.push(signature)
            }
            return signatures
        } else {
            console.log('please enter values as arrays.')
        }
    },

    getSignaturesR8x: function(signatures){
        R8xArray = new Array(signatures.length)
        for (i = 0; i < signatures.length; i++){
            R8xArray[i] = signatures[i]['R8'][0]
        }
        return R8xArray
    },

    getSignaturesR8y: function(signatures){
        R8yArray = new Array(signatures.length)
        for (i = 0; i < signatures.length; i++){
            R8yArray[i] = signatures[i]['R8'][1]
        }
        return R8yArray
    },

    getSignaturesS: function(signatures){
        SArray = new Array(signatures.length)
        for (i = 0; i < signatures.length; i++){
            SArray[i] = signatures[i]['S']
        }
        return SArray
    }
}

