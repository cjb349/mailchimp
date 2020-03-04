var express = require('express')
var https = require('https')
var path = require('path')
var bodyParser = require('body-parser')

var app = express();

app.use(express.urlencoded({extended: true}) )
app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.json()) 
bodyParser.urlencoded({extended: true})

app.listen(process.env.PORT || 3000 , ()=>(
    console.log("lisenting on port 3000")
))

app.get('/', (req,res) => res.sendFile(__dirname + '/index.html'))

app.post('/', (req, res) => {
    var Fname = req.body.Fname
    var Lname = req.body.Lname
    var email = req.body.email
    var data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: Fname,
                    LNAME: Lname
                }
            }
        ]
    }
       
    var JSONdata = JSON.stringify(data)

    var options = {
        method: 'POST',
        auth: 'collin:e9c674c981249634ae89545ff9e88799-us19' 
      };

   const url =  'https://us19.api.mailchimp.com/3.0/lists/2137d100c4' 


    var req = https.request(url, options, (res) =>{
        res.on('data', function (data) {
            console.log(JSON.parse(data));
          });
    })
    req.write(JSONdata)
    req.end()

})