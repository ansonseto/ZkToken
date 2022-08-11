const eddsa = require("../circomlib/src/eddsa.js");

module.exports = {
    
    generatePrvKeys: function(n){
        var prvKeys = [];
        for (i = 1; i < n+1; i++) {
            var prvKey = Buffer.from(
                i.toString().padStart(64,'0'), "hex");
            prvKeys.push(prvKey);
        }
        return prvKeys;  
    },

    generatePubKeys: function(prvKeys){
        if (Array.isArray(prvKeys)){
            var pubKeys = [];
            for (i = 0; i < prvKeys.length; i++){
                var pubKey = eddsa.prv2pub(prvKeys[i]);
                pubKeys.push(pubKey);
            }
        } else {
            console.log("please enter prvKeys as an array")
        }
        return pubKeys; 
    },

    getPubKeysX: function(pubKeys){
        if (Array.isArray(pubKeys[0])){
            var pubKeysX = [];
            for (i = 0; i < pubKeys.length; i++){
                var pubKeyX = pubKeys[i][0];
                pubKeysX.push(pubKeyX);
            }
        } else {
            console.log("please enter pubKeys as an array")
        }
        return pubKeysX;
    },

    getPubKeysY: function(pubKeys){
        if (Array.isArray(pubKeys[0])){
            var pubKeysY = [];
            for (i = 0; i < pubKeys.length; i++){
                var pubKeyY = pubKeys[i][1];
                pubKeysY.push(pubKeyY);
            }
        } else {
            console.log("please enter pubKeys as an array")
        }
        return pubKeysY;
    },

    // used for withdrawal function
    // as user send tokens to zero address (burning address on chain)
    // smart contract call withdrawal() to transfer money from zero address to specified address
    zeroAddress: function(){
        return [BigInt("0".padStart(76,'0')), BigInt("0".padStart(77,'0'))]
    },

    // checked if user is sending to zero address?
    isZeroAddress: function(x, y){
        let zeroAddress = module.exports.zeroAddress();
        return (x == zeroAddress[0] && y == zeroAddress[1])
    },

    // coordinator responsible for batching all transactions in the rollup and post them on-chain
    // coordinator also generate validity proof for those batches 
    // anyone can bid to become a coordinator and if their bid succeed, they earn the righ tto create a batch of transaction and keep the transaction fees from that batch 
    coordinatorPrvKey: function(){
        return prvKey = Buffer.from('1'.toString().padStart(64,'0'), "hex");
    },

    coordinatorPubKey: function(){
        const prvKey = module.exports.coordinatorPrvKey()
        return module.exports.generatePubKeys([prvKey])[0]
    }

}
