import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/2c', (req, res) => {
    let url = req.query.username || '';
    let username = url.match(/\b\/@?([\w\.]+)|^@?([\w\.]+)$/);

    if (username === null) {
        return res.send('Invalid username');
    }

    res.send('@' + (username[1] || username[2]));
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});