
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
            if(rgb == null || rgb[1] > 255 || rgb[2] > 255 || rgb[3] > 255) {
                throw new Error("");
            }
        } else if(/hsl/.test(color)) {
            let hsl = color.match(/^hsl\(\s*(\d{1,3})[,\s]+(\d{1,3})\%[,\s]+(\d{1,3})\%\s*\)/);
            if(hsl == null || hsl[1] > 255 || hsl[2] > 100 || hsl[3] > 100) {
                throw new Error("");
            }
        }

        res.send(oneColor(color).hex());
    } catch (e) {
        return res.send('Invalid color');
    }
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
