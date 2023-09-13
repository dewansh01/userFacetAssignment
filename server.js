const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const similarity = require('./public/js/similarity.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname,""));

//user data
var user_data = {
};
//routes
app.get('/', (req, res) => res.sendFile('index.html'));
app.post('/', (req, res) => {
    var data = req.body;
    var name = data.name;
    user_data[name] = {'name':name,'data':data};
    console.log(user_data);
    res.sendFile('response.html',{root:__dirname});
});

app.get('/allSurvey', (req, res) => res.send({status:"pending"}));


app.get('/similarity',(req,res) => res.send(JSON.stringify(similarity.getSimilarity(user_data))));
app.get('/similarity/search',(req,res) => { //url will be like this localhost:3000/similarity/search?search=John
    var search = req.query.search;
    var response = similarity.getSimilarityBySearch(user_data,search);
    res.json(response);
});
app.get('/similarity/:candidate',(req,res) => {
    var candidate = req.params.candidate;
    var response = similarity.getSimilarityWithFilter(user_data,candidate);
    res.json(response);
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));