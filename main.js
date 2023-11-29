const {Blockchain} = require('./src/blockchain');
const {Transaction} = require('./src/transaction');

const EC = require('elliptic').ec;
const ec = new EC('secp256k1');


const myKey = ec.keyFromPrivate("072a0be7c4e05506cc22abff2c6545a7e274a1d7ad50a00861899f841ff7b0bb");
const myWalletAddress = myKey.getPublic('hex');

let pahlwanCoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10);
tx1.signTransaction(myKey);
pahlwanCoin.addTransaction(tx1);

console.log('Starting the miner...');
pahlwanCoin.minePendingTransaction(myWalletAddress);
console.log('Balance of pahlwan is: ', pahlwanCoin.getBalanceOfAddress(myWalletAddress));
console.log("\n");

console.log('Starting the miner again...');
pahlwanCoin.minePendingTransaction('pahlwan-address');
console.log('Balance of pahlwan is: ', pahlwanCoin.getBalanceOfAddress('pahlwan-address'));
console.log("\n");
