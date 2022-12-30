const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express')
const cors = require('cors')
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// middleware 
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('This is the connected port')
})

const user = process.env.BD_user
const password = process.env.BD_Password

const uri = `mongodb+srv://${user}:${password}@cluster0.5rnuhbi.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const DataCollection = client.db('JobTaskData').collection('userData');

        app.post('/userData', async (req, res) => {
            const query = req.body;
            const result = await DataCollection.insertOne(query)
            res.send(result)
        })
    }
    finally {

    }
}
run().catch(error => console.log(error))



app.listen(port, () => {
    console.log(`this is port is connected port ${port}`)
})