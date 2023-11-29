const {Block} = require("./block.js");
const {Transaction} = require("./transaction.js");

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransaction = [];
        this.miningReward = 100;
    }

    createGenesisBlock(){
        return new Block("01/01/2024", "Genesis block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        // newBlock.hash = newBlock.calculateHash();
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    minePendingTransaction(miningRewardAddress) {
        const rewardTx = new Transaction(null, miningRewardAddress, this.miningReward);
        this.pendingTransaction.push(rewardTx);

        let block = new Block(Date.now(), this.pendingTransaction, this.getLatestBlock().hash);
        block.mineBlock(this.difficulty);

        this.chain.push(block);

        this.pendingTransaction = [];
    }

    addTransaction(transaction){
        if(!transaction.fromAddress || !transaction.toAddress) {
            throw new Error("Transaction must include from and to address!");
        }

        if(!transaction.isValid()){
            throw new Error("Cannot add invalid transaction to chain!");
        }

        this.pendingTransaction.push(transaction);
    }

    getBalanceOfAddress(address) {
        let balance = 0;

        for (const block of this.chain) {
            for (const transaction of block.transactions){
                if(transaction.fromAddress === address){
                    balance -= transaction.amount;
                }

                if(transaction.toAddress === address){
                    balance += transaction.amount;
                }
            }
        }

        return balance;
    }

    isChainValid(){
        for (let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (!currentBlock.hasValidTransactions()){
                return false;
            }

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }

        return true;
    }
}

module.exports.Blockchain = Blockchain;