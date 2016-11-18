import getDatabase from '../helpers/getMongoDatabase';
import fetch from 'node-fetch';
import _ from 'lodash';

export default async function (req, res, next) {

    let db = await getDatabase();
    let oDate = await db.collection("last_updated").findOne({}, {_id: false});
console.log( "try to populate")
    if(
        oDate === null
        || (_.now() - oDate.data.getTime()) > 24 * 3600 * 1000
        || _.random(0, 100) == 1
    ) {
    console.log("populating")
        db.collection("last_updated").updateOne({}, {"data": new Date()}, {upsert: true});

        await fetch('https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json')
            .then(async (res) => {
                const structure = await res.json();
                db.collection("structure").updateOne({}, structure, {upsert: true});
            })
            .catch(err => {
                console.log('Population error:', err);
            });
    }

    next();
};