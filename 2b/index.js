import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/2b', (req, res) => {
    var result = "",
        fullname = req.query.fullname || '';

    if(fullname) {
        fullname = fullname.split(' ');
        if(fullname.length <=3 ) {
            result = fullname.pop();
            if(fullname.length == 2) {
                result += " " + fullname[0].substring(0,1) + ". " + fullname[1].substring(0,1) + ".";
            } else if(fullname.length == 1) {
                result += " " + fullname[0].substring(0,1) + ".";
            }
        }
    }

    res.send(result ? result : "Invalid fullname");
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});