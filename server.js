const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/*', (req, res) => {
  res.sendFile('index.html', { root: `${__dirname}/dist/` });
});

app.use(express.static(path.join(__dirname, 'dist')));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
