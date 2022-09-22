# ZKRollup

Tutortial: https://github.com/therealyingtong/RollupNC

---------------- To create a block ----------------------------
1. Go to Build folder 
2. node GenesisBlock.js to create genesis block 
3. node Block1.js to create the 1st block of transactions (update.js is used to generate, check, update merkle root)

To proof: 
1. npx circom update_state_verifier.circom -o stateUpdate.json (circuits folder)
2. node Block1.js (Build folder)
3. npx snarkjs calculatewitness -c stateUpdate.json -i ../Build/Block/block1.json
4.npx snarkjs setup -c stateUpdate.json --protocol groth
5. npx snarkjs proof -w witness.json --pk proving_key.json
6. npx snarkjs verify
7. npx snarkjs generateverifier --verificationkey verification_key.json --verifier verifier.sol
8. npx snarkjs generatecall --proof proof.json --public public.json

NOTE
- update_state_verifier.circom --> stateUpdate.json
- update.js --> blocks (i.e., block1.json, block2.json, etc)


---------------- Pacakages versions ----------------------------

There's a mix of packages version

Circomlib:
- https://github.com/iden3/circomlib/tree/77928872169b7179c9eee545afe0a972d15b1e64

Snarkjs 
- "snarkjs": "git+https://github.com/adria0/snarkjs.git  ",







Proof on-chain on Ethereum Kovan Testnet:
https://kovan.etherscan.io/address/0x2251DB2Ae1c9572FcfE104c0c438b4062048BD27#readContract
