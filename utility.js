//@ts-check
const db = require('./db/db');
const explorer = require('./app');

(async () => {
    // let blockCount = await explorer.getBlockCount()
    // let firstBlock = blockCount- 20
    // for (let i = firstBlock; i < blockCount; i++) {
    //     const block = await explorer.getBlockInfo(i)
    //     await db.addBlock(block)
    // }
    let block = await explorer.getBlockInfo(3001)
    await db.addBlock(block)
})()