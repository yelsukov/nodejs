import mongodb from 'mongodb'

let mongoDatabase = null;

export default async function () {
    if(mongoDatabase === null) {
        mongoDatabase = await mongodb.MongoClient.connect('mongodb://localhost:27017/study');
    }

    return mongoDatabase;
};