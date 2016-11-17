import mongodb from 'mongodb'
import fetch from 'node-fetch';

export default function (req, res, next) {
    fetch('https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json')
        .then(async (res) => {
            const structure = await res.json();

            mongodb.MongoClient.connect('mongodb://localhost:27017/study').then(db => {
                const collection = db.collection("structure");
                collection.removeMany({});
                collection.insertOne(structure);

                db.close();
            });
        })
        .catch(err => {
            console.log('Чтото пошло не так:', err);
        });

    next();
};