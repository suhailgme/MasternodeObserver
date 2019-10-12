// @ts-check
const Client = require('bitcoin-core');

// client port is required for connecting to daemon (daemon must be running in background for localhost connection). 
// port 51473 is for "Apollon" (XAP) Masternode coin.
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
//         let response = await client.request 
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

//get block information from block height.
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




module.exports = {
    getBlock: getBlock,
    getBlockInfo: getBlockInfo,
    getBlockHash: getBlockHash,
    getInfo: getBlockInfo,
    getLatestBlock: getLatestBlock,
    getTransactionInfo: getTransactionInfo,
    getMasternodes: getMasternodes,
    getBlockCount: getBlockCount,
}