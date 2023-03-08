const express = require('express');

const app = express();
const PORT = 4000;
app.use('/id/:id/name/:name', (req, res) => {
  res.send(req.params);
});

app.get('/', (req, res) => {
  res.send(req.query);
});

app.listen(PORT, () => {
  console.log(`${PORT}`);
});
