import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/2b', (req, res) => {
    let result = [],
        fullname = (req.query.fullname || '').trim(),
        validationRegex = /^([^-\s0-9`~!@#$%^&*()_=+\\|\[\]{};:",.<>\/?]+[\s]*){1,3}$/;

    if(validationRegex.test(fullname)) {
        result = fullname
            .split(/\s+/)
            .map(v => v[0].toUpperCase() + v.slice(1).toLowerCase());

        let part = result.pop();
        result = result.map(v => v[0] + ".");
        result.unshift(part);
    }

    res.send(result.length ? result.join(" ") : "Invalid fullname");
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});