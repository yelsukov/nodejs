import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/2b', (req, res) => {
    var result = [],
        fullname = (req.query.fullname || '').trim(),
        validationRegex = /^([^-\s0-9`~!@#$%^&*()_=+\\|\[\]{};:",.<>\/?]+[\s]*){1,3}$/;

    if(validationRegex.test(fullname)) {
        fullname = fullname
            .replace(/'/g, '').replace(/[\s\t\n\r]+/g, ' ')
            .split(' ')
            .map(v => {
                return v.slice(0, 1).toUpperCase() + v.slice(1).toLowerCase();
            });

        result.push(fullname.pop());

        while(fullname.length) {
            result.push(fullname.shift().substring(0,1).toUpperCase() + ".");
        }
    }

    res.send(result.length ? result.join(" ") : "Invalid fullname");
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});