# ZKRollup

tutortial: https://github.com/therealyingtong/RollupNC

- update_state.circom --> stateUpdate.json
- update.js --> blocks (i.e., block1.json, block2.json, etc)

---------------- Problem to solve ----------------------------

Block 2 error when calculating witness. 
Command: npx snarkjs calculatewitness -c ../circuits/stateUpdate.json -i ./Block/block2.json
![image](https://user-images.githubusercontent.com/61979765/183957102-4516c780-5528-4905-a4c7-a92cad8f98ed.png)


---------------- Pacakages versions ----------------------------

There's a mix of packages version

Circomlib:
- https://github.com/iden3/circomlib/tree/77928872169b7179c9eee545afe0a972d15b1e64

Snarkjs 
- "snarkjs": "git+https://github.com/adria0/snarkjs.git  ",
