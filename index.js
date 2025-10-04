const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Welcome to Document-Manager!');
});

app.listen(port, () => {
  console.log(`Document-Manager is running on port ${port}`);
});
