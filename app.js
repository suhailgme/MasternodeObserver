// @ts-check
const Client = require('bitcoin-core');
const client = new Client({
    headers: true,
    host: 'localhost',
    port: '51473',
    username: '*@dk398dkj298398',
    password: 'DK983k(*3kD7k$%*ll*2kd@la0'
})

// const request = async = (method, params = '') =>{
//     try{
//         let request = `${method}(${params})`
//         console.log(request)
//         let response = await client.request //request is string have to figure out how to pass as function.
//         console.log(`${method}: `, await response[0])
//     }catch(error){console.error(error)}
// }

const getInfo = async () => {
    try {
        let info = await client.getInfo();
        // console.log(await info);
        return info[0]
    } catch (e) {
        console.error(e)
    }
}

const getBlockHash = async blockHeight => {
    try {
        let blockHash = await client.getBlockHash(blockHeight);
        // console.log(await blockHash);
        return String(blockHash[0])
    } catch (e) {
        console.error(e)
    }
}

const getBlock = async blockHash => {
    try {
        let blockInfo = await client.getBlock(blockHash);
        // console.log("getBlockInfo: ", await blockInfo[0]);
        return blockInfo[0]
    } catch (e) {
        console.error(e.message)
    }
}

const getTransactionInfo = async txId => {
    try {
        let txInfo = await client.getRawTransaction(txId, 1);
        // console.log("getTransactionInfo: ", await JSON.stringify(txInfo, null, 1));
        return txInfo[0];
    } catch (e) {
        console.error("Can't get transaction info: ", e)
    }
}

//get block information from block height to block height. Returns array of blocks.
const getBlockInfo = async blockHeight => {
    console.log("Getting block: ", blockHeight);
    let blockHash = await getBlockHash(blockHeight)
    let block = await getBlock(blockHash)
    block.txCount = block.tx.length
    return block
}



const getLatestBlock = async () => {
    try {
        let latestBlock = await client.getBlockchainInfo();
        // console.log("getLatestBlockHash: ", await JSON.stringify(blockchainInfo[0], null, 1));
        return latestBlock[0]
    } catch (e) {
        console.error("Can't getLatestBlock: ", e)
    }
}

const getMasternodes = async () => {
    try {
        let masternodeList = await client.command('listmasternodes')
        console.log("getMasternodes: ", await JSON.stringify(masternodeList, null, 1));
    } catch (e) {
        console.error("Can't getMasternodes: ", e)
    }
}

const getBlockCount = async () => {
    try {
        let blockCount = await client.command('getblockcount')
        return blockCount[0]
    } catch (e) {
        console.error("Can't get block count: ", e)
    }
}

//Private method to process raw blocks. Returns block object.
// const _processBlock = async block => {
//     console.log("Processing block: ", i)
//     return {
//         hash: blockHash,
//         prevBlockHash: block.previousblockhash,
//         nextBlockHash: block.nextblockhash,
//         blockHeight: block.height,
//         size: block.size,
//         tx: block.tx,
//         txCount: block.tx.length,
//         time: block.time,
//         moneySupply: block.moneysupply,
//         chainwork: block.chainwork,
//         merkleRoot: block.merkleroot,
//         version: block.version,
//         bits: block.bits,
//         nonce: block.nonce,
//         transactions: block.tx
//     }
// }

// const getTransactions = async block => {
//     let transactions = []
//     for (let transaction in block.tx) {
//         let transactionInfo = await getTransactionInfo(block.tx[transaction]);
//         // console.log(JSON.stringify(transactionInfo, null, 1));
//         transactions.push({
//             txid: transactionInfo.txid,
//             vin: transactionInfo.vin,
//             vout: transactionInfo.vout,
//             blockHash: transactionInfo.blockhash,
//             time: transactionInfo.time,
//             blockTime: transactionInfo.blocktime
//         });
//     }
// }



(async () => {
    // let blockInfo = await getBlockInfo(3000)
    // console.log("block: ", JSON.stringify(blockInfo, null, 1))
    // let transaction = await getTransactionInfo('9c5d27b83428a8836aa92617bc314e466b63fb012132a1369e6ebd559cc14b6e')
    // console.log(JSON.stringify(transaction, null, 1))

    // console.log(JSON.stringify(blockchain, null, 1))
    // let BlockInfo = getBlockInfo('0000049c01ca3f63644a04405e894a8d98d66c2fb75f955056c1a0bcb7ba35f4')
    // console.log(await BlockInfo)

    // let blockNum = await getBlockHash(0);
    // console.log(await blockNum)
    // getLatestBlockHash()
    // let block1 =await getBlockHash(35505)
    // getBlockInfo(block1);
    // // getTransactionInfo("3ce1ca2fc78bc9d18af1fb10b2fd0b55c6280beb7803528cf43ee3c754e546cd")
    // let latestBlock = await getLatestBlockHash()
    // console.log(await latestBlock)
    //     getBlockInfo(await getLatestBlockHash())
    // getMasternodes();
    // getTransactionInfo('0f4f413942eea5246fd6b4cb9fe59cee04365f6c24c6b757bc2cebc0ac028320')
})()
module.exports = {
    getBlock: getBlock,
    getBlockInfo: getBlockInfo,
    getBlockHash: getBlockHash,
    getInfo: getBlockInfo,
    getLatestBlock: getLatestBlock,
    getTransactionInfo: getTransactionInfo,
    getMasternodes: getMasternodes,
    getBlockCount: getBlockCount
}