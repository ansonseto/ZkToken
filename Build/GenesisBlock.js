const {Account} = require('./Account');
const balanceLeaf = require("../src/generate_balance_leaf.js");
const merkle = require("../src/MiMCMerkle.js");

const TX_DEPTH = 2 // depth of balance (State) merkle tree
const BAL_DEPTH = 4 // depth of transaction merkle tree

// ---------------- get empty tree hashes-----------------------------------------------
// prove balance (state) tree is empty at desired height 
    // transactions made to zeroLeaf are considered as withdraw 
const zeroLeaf = balanceLeaf.zeroLeaf()
const zeroLeafHash = balanceLeaf.zeroLeafHash()
// get the zero cache hash depending on BAL_DEPTH
const zeroCache = merkle.getZeroCache(zeroLeafHash, BAL_DEPTH) 
// console.log('zero Cache = ',merkle.getZeroCache(zeroLeafHash, 5))

// get the balance merkle tree of exisiting accounts 
const balanceLeafArray = Account.balanceLeafArray

// trying to add extra leaf so numbe rof leaf = number of leaf^2
// the proof works in ^2
//  hashing built up, it hashes two together, but in theory,if one of the leaf is empty (i.e., hash = 0) but 
// computionally the computer doens't udnerstnd that if you missing a leaf what the hash would be, so they add the laef to make sure hwne buildign the proof right at the top, 
// you always get the correct 0 hash going through teh algorithm
// so essentially gettign ready to add 0 if ther's a missign one
const paddedTo16BalanceLeafArray = merkle.padLeafHashArray(balanceLeafArray, zeroLeaf, 8)

// hashes of all 16 leafs - Genesis Block 
const paddedTo16BalanceLeafArrayHash = balanceLeaf.hashBalanceLeafArray(paddedTo16BalanceLeafArray)
// all accounts (+ zeroAddress) leaf hashes 
const balanceLeafArrayHash = balanceLeaf.hashBalanceLeafArray(balanceLeafArray)
const paddedBalanceLeafArrayHash = merkle.padLeafHashArray(balanceLeafArrayHash, zeroLeafHash)
// if we had a non base 2 number of leaf, this would give an error 
const height = merkle.getBase2Log(paddedBalanceLeafArrayHash.length) 

// proof the subroot of the transaction 
const nonEmptySubtreeRoot = merkle.rootFromLeafArray(paddedBalanceLeafArrayHash)
// proofing that this exist in the tree. hash of the leaf at array 0  and it's proofing that one is in the tree
const subtreeProof = merkle.getProofEmpty(height, zeroCache) 
const subtreeRoot = merkle.rootFromLeafAndPath(nonEmptySubtreeRoot, 0, subtreeProof)
const rootCheck = merkle.rootFromLeafArray(paddedTo16BalanceLeafArrayHash)
// const testFilledArray = merkle.fillLeafArray(balanceLeafArrayHash, zeroLeafHash, 10)
// console.log(merkle.rootFromLeafArray(testFilledArray))


var GenesisBlock={
    TX_DEPTH: TX_DEPTH,
    BAL_DEPTH: BAL_DEPTH,
    paddedTo16BalanceLeafArray:paddedTo16BalanceLeafArray,
    zeroCache:zeroCache,
    zeroLeaf: zeroLeaf,
    zeroLeafHash: zeroLeafHash,
}

module.exports = {GenesisBlock}



// // -------------------- set balance merkle tree ----------------------------------------------------
// // balance hashes (hash all the  balance leaf )
// // only allow 4 transactiosn per merkle tree/ block
// const first4BalanceLeafArray = balanceLeafArray.slice(0,4)
// // get the remaining trasnasctions to process in another block
// const newbalanceLeafArray = balanceLeafArray.slice(balanceLeafArray.length - first4BalanceLeafArray.length,balanceLeafArray.length)
// // console.log(balanceLeafArray)
// const first4BalanceLeafArrayHash = balanceLeaf.hashBalanceLeafArray(first4BalanceLeafArray)
// // state merkle root
// const first4SubtreeRoot = merkle.rootFromLeafArray(first4BalanceLeafArrayHash) 
// // proof that leafs existence in the merkle tree
// const first4SubtreeProof = merkle.getProofEmpty(0, zeroCache) 
// // console.log('first4SubtreeProof', first4SubtreeProof)
// // console.log('first4WholeRoot', merkle.rootFromLeafAndPath(first4SubtreeRoot, 0, first4SubtreeProof))

// // trying to add extra leaf so numbe rof leaf = number of leaf^2
// // the proof works in ^2
// //  hashing built up, it hashes two together, but in theory,if one of the leaf is empty (i.e., hash = 0) but 
// // computionally the computer doens't udnerstnd that if you missing a leaf what the hash would be, so they add the laef to make sure hwne buildign the proof right at the top, 
// // you always get the correct 0 hash going through teh algorithm
// // so essentially gettign ready to add 0 if ther's a missign one
// const paddedTo16BalanceLeafArray = merkle.padLeafHashArray(balanceLeafArray, zeroLeaf, 8)
// const paddedTo16BalanceLeafArrayHash = balanceLeaf.hashBalanceLeafArray(paddedTo16BalanceLeafArray)
// const balanceLeafArrayHash = balanceLeaf.hashBalanceLeafArray(balanceLeafArray)
// const paddedBalanceLeafArrayHash = merkle.padLeafHashArray(balanceLeafArrayHash, zeroLeafHash)
// // if we had a non base 2 number of leaf, this would give an error 
// const height = merkle.getBase2Log(paddedBalanceLeafArrayHash.length) 

// //get root from the leaf 
// // prove the balance (state) tree was empty at height 
//     // prove proof to smart contract, a Merkle proof show inclusion of an empty node at heigh in the current state root
// const nonEmptySubtreeRoot = merkle.rootFromLeafArray(paddedBalanceLeafArrayHash)
// // proofing that this exist in the tree. hash of the leaf at array 0  and it's proofing that one is in the tree
// const subtreeProof = merkle.getProofEmpty(height, zeroCache) 

// const root = merkle.rootFromLeafAndPath(nonEmptySubtreeRoot, 0, subtreeProof)
// const rootCheck = merkle.rootFromLeafArray(paddedTo16BalanceLeafArrayHash)


