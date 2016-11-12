import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/2b', (req, res) => {
    var result = [],
        fullname = req.query.fullname || '',
        validationRegex = /^([^-\s0-9`~!@#$%^&*()_=+\\|\[\]{};:'",.<>\/?]+[\s]*){1,3}$/;

    if(validationRegex.test(fullname)) {
        fullname = fullname.split(' ');
        result.push(fullname.pop());
        while(fullname.length) {
            result.push(fullname.shift().substring(0,1) + ".");
        }
    }

    res.send(result.length ? result.join(" ") : "Invalid fullname");
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});