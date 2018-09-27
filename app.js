let fs = require('fs');
const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3000

app.use (bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));


app.set('view engine', 'ejs')
app.set('views', './views')

app.get('/', (req, res) => {

	fs.readFile('users.json', (err, data) => {
	  if (err){
	  	throw err;
		}
	
	let users = JSON.parse(data);
    res.render('index', {title: 'Homepage', users: users})

	})
});

app.get('/form',(req, res) => {
res.render('form')

	});

app.post('/form', (req, res) => {
fs.readFile('users.json', (err, data) => {
	  if (err){
	  	throw err;
		}
	
	let users = JSON.parse(data);
	let name = req.body;
 res.render('input', {users: users, name: name})

 })

});

app.get('/add',(req, res) => {
	res.render('add')
});

app.post('/add', (req, res) => {

	  let enter = req.body
	  console.log(enter)


fs.readFile('users.json', (err, data) => {
	  if (err){
	  	throw err;
		}
	
	let inputUser = JSON.parse(data);
	inputUser.push(enter);
	// res.redirect('/')
	// });
   

    fs.writeFile('users.json', JSON.stringify(inputUser),(err,data) => {
     if (err){
       throw err;
     }
   })
   res.redirect('/')

  });
});



















 app.listen(port, () => console.log(`Example app listening on port 3000!`))