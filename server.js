const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const similarity = require('./public/js/similarity.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname,""));

//user data
var user_data ={
    dewansh: {
      name: 'dewansh',
      data:  {
        name: 'dewansh',
        q1: '1',
        q2: '2',
        q3: '1',
        q4: '3',
        q5: '1',
        q6: '2',
        q7: '1',
        q8: '1',
        q9: '2',
        q10: '1',
        q11: '2',
        q12: '1',
        q13: '2',
        q14: '2',
        q15: '1',
        q16: '2',
        q17: '1',
        q18: '2',
        q19: '1',
        q20: '1'
      }
    },
    nik: {
      name: 'nik',
      data: {
        name: 'nik',
        q1: '1',
        q2: '1',
        q3: '2',
        q4: '1',
        q5: '2',
        q6: '2',
        q7: '1',
        q8: '1',
        q9: '2',
        q10: '1',
        q11: '1',
        q12: '2',
        q13: '1',
        q14: '1',
        q15: '2',
        q16: '1',
        q17: '1',
        q18: '1',
        q19: '2',
        q20: '1'
      }
    },
    disha: {
      name: 'disha',
      data: {
        name: 'disha',
        q1: '1',
        q2: '2',
        q3: '1',
        q4: '1',
        q5: '1',
        q6: '2',
        q7: '1',
        q8: '2',
        q9: '1',
        q10: '2',
        q11: '1',
        q12: '2',
        q13: '2',
        q14: '1',
        q15: '2',
        q16: '1',
        q17: '2',
        q18: '1',
        q19: '2',
        q20: '1'
      }
    }};
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