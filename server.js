const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname,""));

app.get('/', (req, res) => res.sendFile('index.html'));

app.post('/', (req, res) => {
    //extract the data from the post request
    var data = req.body;
    console.log(data);
    res.sendFile('response.html', {root: __dirname})
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));