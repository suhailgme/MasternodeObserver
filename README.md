## MasterNode Observer

Parses a blockchain via the coind* daemon JSON-RPC interface. Extracts all requested blocks and their transactions, in addition to all addresses seen from the specified blockheight. Data is stored in an SQL DB for queries.

#### Usage
An example of the app's usage is provided in "example.js".

A coind* daemon must be running in the background for localhost access. If remote server is used, client information can be changed in "app.js". The appropriate port for the specific coind* daemon must also be set in "app.js"

#### Data Stored in Database (SQLite)
##### Sample database provided (/db/db.sqlite) for more information on DB tables and their columns
* All addresses seen on blockchain 
* All blocks seen on blockchain including
  * hash
  * previous block hash
  * block height
  * size
  * number of transactions
  * money supply
  * chainwork
  * bits
  * nonce
  * version
  * merkle root
* All transactions seen on blockchain including
  * txid
  * blockhash
  * timestamp
  * transaction inputs
    * txid
    * coinbase
    * index
  * transaction outputs
    * value
    * index
    * type (pubkey, pubkeyhash, etc.)
 
