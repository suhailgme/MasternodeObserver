const Client = require('bitcoin-core');
const client = new Client({
    headers: true,
    host: '45.77.214.144',
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
    try{
    let info = await client.getInfo();
    console.log(await info); 
    }catch (e){console.error(e)}
}

const getBlockHash = async blockHeight => {
    try{
    let blockHash = await client.getBlockHash(blockHeight);
    console.log(await blockHash); 
    return String(blockHash[0])
    }catch (e){console.error(e)}
}

const getBlockInfo = async blockHash => {
    try{
    let blockInfo = await client.getBlock(blockHash);
    console.log("getBlockInfo: ", await blockInfo[0]); 
    }catch (e){console.error(e.message)}
}

const getTransactionInfo = async txId => {
    try{
    let txInfo = await client.getRawTransaction(txId, 1);
    console.log(await JSON.stringify(txInfo, null, 1)); 
    }catch (e){console.error(e)}
}

const getLatestBlockHash = async () => {
    try{
    let blockchainInfo = await client.getBlockchainInfo();
    console.log("getLatestBlockHash: ", await JSON.stringify(blockchainInfo[0], null, 1)); 
    return blockchainInfo[0].bestblockhash
    }catch (e){console.error(e)}
}


(async () =>{
    // getLatestBlockHash()
    // let block1 =await getBlockHash(35505)
    // getBlockInfo(block1);
    // // getTransactionInfo("3ce1ca2fc78bc9d18af1fb10b2fd0b55c6280beb7803528cf43ee3c754e546cd")
    // let latestBlock = await getLatestBlockHash()
    // console.log(await latestBlock)
    getBlockInfo(await getLatestBlockHash().tx)
})()


