import express from 'express';
import cors from 'cors';
import getDatabase from './helpers/getMongoDatabase';


import populateStructure from './middlewares/populateStructure';

const app = express();

app.use(populateStructure);
app.use(cors());

app.get('/volumes', async(req, res) => {
    const db = await getDatabase();

    let result = {},
        data = await db.collection("structure").findOne({}, {_id: false, hdd: true});

    data.hdd.forEach(item => {
        if (!result.hasOwnProperty(item.volume)) {
            result[item.volume] = 0;
        }
        result[item.volume] += item.size
    });

    for (var i in result) {
        result[i] += "B";
    }

    res.status(200).json(result);

});

app.get('*', async(req, res) => {
    let db = await getDatabase();
    let data = await db.collection("structure").findOne({}, {_id: false});

    try {
        const parts = req.path.replace(/^\/|\/$/g, ""),
            result = parts ? parts.split('/')
                .reduce((acc, item) => {
                    if (!Object.keys(acc).includes(item)) {
                        throw new Error('Not Found');
                    } else {
                        return acc[item];
                    }
                }, data) : data;

        // db.close();
        res.json(result);
    } catch (e) {
        res.status(404).end(e.message);
    }
});


app.listen(3000, () => {
    console.log('Server started on port 3000');
});