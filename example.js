//@ts-check
const db = require('../db');
const explorer = require('./app');

// Retrieve blockchain's blockheight and start from the first block. 
// Add each transaction and block to SQLite DB.
// Send message to console when process has finished.
(async () => {
    try {
        let blockCount = await explorer.getBlockCount() //Set to 20 to sync first 20 blocks or explorer.getLatestBlock() - 20 to sync last 20
        let firstBlock = await db.getMaxBlockHeight() // Retrives latest blockheight synced in DB (i.e. not from blockchain) in case of interruption while syncing. 
        for (let i = firstBlock; i < blockCount; i++) {
            let block = await explorer.getBlockInfo(i)
            await db.addBlock(block)
            block.tx.forEach(async txid => {
                let tx = await explorer.getTransactionInfo(txid)
                await db.addTransaction(tx)
            })
        }
        console.log('Finished Syncing Blockchain')
    } catch (e) {
        console.error(e)
    }
})()