import express from 'express';
import cors from 'cors';
import mongodb from 'mongodb'


import populateStructure from './middlewares/populateStructure';

const app = express();

app.use(populateStructure);
app.use(cors());

const unpackValue = function (data, parts) {
    while (parts.length) {
        let part = parts.shift();
        if (data.hasOwnProperty(part)) {
            data = data[part];
        } else {
            data = undefined;
            break;
        }
    }

    return data;
};

const getStructurePart = async function (params) {
    let db = await mongodb.MongoClient.connect('mongodb://localhost:27017/study');

    let fields = {_id: false},
        parts = params.replace(/^\/|\/$/, "");

    if (parts) {
        parts = parts.split('/');
        fields[parts.join('.')] = true;
    }

    let result = await db.collection("structure").findOne({}, fields);
    if (result && parts) {
        result = unpackValue(result, parts)
    }

    db.close();

    return result;
};


app.get('/volumes', async(req, res) => {
    let result = {}, hdd = await getStructurePart("hdd");

    hdd.forEach(item => {
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

app.get(/.+?/, async(req, res) => {
    let result = await getStructurePart(req.url.substring(1)),
        code = 200;

    if (result === undefined) {
        result = "Not found";
        code = 404;
    }
    res.status(code).json(result);

});


app.listen(3000, () => {
    console.log('Server started on port 3000');
});