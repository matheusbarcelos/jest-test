const { MongoClient } = require("mongodb");

const uri = "mongodb://mongodb-des.mpmg.mp.br:27017/?directConnection=true";
const client = new MongoClient(uri);

  async function run(feito) {
      try {
        const database = client.db('uno');
        const feitos = database.collection('feitos');
          
        const query = { id_feito: feito };
        let result = await feitos.findOne(query);
        
        return result
      } finally {
          
      await client.close();
     }
  }
    run().catch(console.dir);  

  module.exports = { run };