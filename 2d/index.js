
import express from 'express';
import cors from 'cors';
import oneColor from 'onecolor';


const app = express();
app.use(cors());

app.get('/2d', (req, res) => {
    let color = unescape(req.query.color || '').trim();

    try {
        if(/rgb/.test(color)) {
            let rgb = color.match(/^rgb\(\s*(\d{1,3})[,\s]+(\d{1,3})[,\s]+(\d{1,3})\s*\)/);
            if(rgb) {
                rgb.slice(1).map(v => {
                    if(v < 256) { return parseInt(v) } else { throw new Error(""); }
                });
            } else {
                throw new Error("");
            }
        } else if(/hsl/.test(color)) {
            let rgb = color.match(/^hsl\(\s*(\d{1,3})[,\s]+(\d{1,3})\%[,\s]+(\d{1,3})\%\s*\)/);
            if(rgb == null || rgb[1] > 255 || rgb[2] > 100 || rgb[3] > 100) {
                throw new Error("");
            }
        }

        color = oneColor(color).hex();
        res.send(color.toLowerCase());
    } catch (e) {
        return res.send('Invalid color');
    }
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
