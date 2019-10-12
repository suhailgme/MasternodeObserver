//@ts-check
const db = require('./db');
const explorer = require('../app');

(async () => {
    try {
        let blockCount = await explorer.getBlockCount()
        let firstBlock = await db.getMaxBlockHeight()
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