let pahlwanCoin = new Blockchain();

console.log("Mining block 1");
pahlwanCoin.addBlock(new Block(1, "10/01/2028", { amount: 4 }));

console.log("Mining block 2");
pahlwanCoin.addBlock(new Block(2, "12/07/2015", { amount: 10 }));


// console.log(JSON.stringify(pahlwanCoin, null, 4));
// console.log(`Is Chain Valid? ${pahlwanCoin.isChainValid()}`)

