// @ts-check

const explorer = require('../app');
var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: "./db.sqlite"
  },
  useNullAsDefault: true,
  debug: false
});

const addBlock = async block => {
  // console.log(block)
  try {
    let rowId = await knex('blocks').insert({
      hash: block.hash,
      prevBlockHash: block.previousblockhash,
      blockHeight: block.height,
      size: block.size,
      txCount: block.txCount,
      time: block.time,
      moneySupply: block.moneysupply,
      chainwork: block.chainwork,
      bits: block.bits,
      nonce: block.nonce,
      version: block.version,
      merkleRoot: block.merkleroot
    })
    console.log("Added block with row ID:", rowId);
    return rowId
  } catch (error) {
    console.error(error)
    return error
  }
}

const _addTransactionInput = async (transactionInputs, transactionDBId) => {
  // console.log(transactionInputs)
  transactionInputs.forEach(async input => {
    try {
      let rowId = await knex('transactionInputs').insert({
        txId: input.txid,
        index: input.vout,
        coinbase: input.coinbase
      })
      // console.log("Added transaction input with row ID:", rowId);
      await knex('transactionsTransactionInputs').insert({
        transactionId: transactionDBId[0],
        transactionInputId: rowId[0]
      })
      return rowId;
    } catch (error) {
      console.error(error)
    }
  })
}

const _addAddress = async (addresses, transactionOutputDBId) => {
  // console.log(addresses)
  addresses.forEach(async address => {
    try {
      //write check to see if address is already in db. if so it still needs to be linked to output
      let addressDBId = await knex('addresses').where('address', address).select('id').first()
      if (addressDBId) {
        addressDBId = [addressDBId.id]
      // console.log("Address already in DB with ID:", addressDBId);
      }
      else {
        addressDBId = await knex('addresses').insert({
          address: address
        })
      // console.log("Added address with row ID:", addressDBId);
      }
      await knex('addressesTransactionOutputs').insert({
        addressId: addressDBId[0],
        transactionOutputId: transactionOutputDBId
      })
      return addressDBId
    } catch (error) {
      console.error(error)
    }
  })
}

const _addTransactionOutput = async (transactionOutputs, transactionDBId) => {
  // console.log(transactionOutputs)
  transactionOutputs.forEach(async output => {
    try {
      let transactionOutputDBId = await knex('transactionOutputs').insert({
        value: output.value,
        index: output.n,
        type: output.scriptPubKey.type
      })
      // console.log("Added transaction output with row ID:", transactionOutputDBId);
      await knex('transactionsTransactionOutputs').insert({
        transactionId: transactionDBId[0],
        transactionOutputId: transactionOutputDBId[0]
      })
      if (output.scriptPubKey.addresses)
        _addAddress(output.scriptPubKey.addresses, transactionOutputDBId[0])
      return transactionOutputDBId;
    } catch (error) {
      console.error(error)
    }
  })
}

const addTransaction = async transaction => {
  // console.log(transaction)
  try {
    let blockId = await knex('blocks').where('hash', transaction.blockhash).select('id').first()
    let transactionDBId = await knex('transactions').insert({
      blockId: blockId ? blockId.id : null,
      txId: transaction.txid,
      blockHash: transaction.blockhash,
      time: transaction.time
    })
    console.log("Added transaction with row ID:", transactionDBId);
    await _addTransactionInput(transaction.vin, transactionDBId)
    await _addTransactionOutput(transaction.vout, transactionDBId)
    return transactionDBId;
  } catch (error) {
    console.error(error)
  }
}

const getMaxBlockHeight = async () =>{
  let lastId = await knex('blocks').max('blockHeight')
  return lastId[0]['max(`blockHeight`)']
}



// (async () => {
//   let block = await explorer.getBlockInfo(3001)
//   addBlock(block)
// })()
  // block.tx.forEach(async tx =>{
  // let transaction = await explorer.getTransactionInfo(tx)
  //   addTransaction(transaction)
  //   // console.log(tx)
  // })
  // console.log(block)
  // addBlock(block)
  // let transaction = await explorer.getTransactionInfo('02729c9d5aabbcea27d97f40a6b2b1ea2a05c37c760041e412dae41e8b6fadf7')
  // addTransaction(transaction)
  // let blockId = await knex('blocks').where('hash', 'eb42bc726aef800dcf5963283a519f9a921b075d8affd3d9e720bcd96af088d7').select('id').first()
  // console.log(blockId)
  // _addTransactionOutput(transaction.vout)
  // console.log(JSON.stringify(transaction.vout, null, 1))

  // console.log(JSON.stringify(await explorer.getTransactionInfo('806d489aefb68ddaa48a33407c4856258367493282820cb2abe7d943258ef764'), null, 1))
  // knex.destroy()

// })()

module.exports = {
  addBlock:addBlock,
  addTransaction: addTransaction,
  getMaxBlockHeight: getMaxBlockHeight
}