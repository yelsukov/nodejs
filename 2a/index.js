import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/2a', (req, res) => {
  var sum = parseInt(req.query.a || 0) + parseInt(req.query.b || 0);
  res.json(sum);
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});