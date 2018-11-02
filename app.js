let fs = require('fs');
const express = require('express')
const bodyParser = require('body-parser');
const app = express();
const port = 3000


//app.use (bodyParser.urlencoded({extended: true}));
let urlencodedParser = bodyParser.urlencoded({ extended: false})
app.use(express.static('public'));


app.set('view engine', 'ejs')
app.set('views', './views')
app.get('/', (req, res) => {
	const users = require('./users.json')
	res.render('index', {title: 'Homepage', users: users})

});


app.get('/users-ajax', (req, res) => {
	res.send({users})

})

app.get('/users', function (req,res){
	res.render('users',{ users: users})

})



app.get('/search',(req, res) => {
	res.render('search');
});



app.post('/search', urlencodedParser, function(req, res) {
	const data = req.body.Name
	const users = require('./users.json')
	const response = [];

	users.forEach(user => {
		if (user.firstname.indexOf(data) >= 0 ) {
			response.push(user)
		}
	})

	res.send(response);
});

app.get('/add-user', (req, res) => {
	res.render('add-user');

});


app.post('/add', urlencodedParser, function (req, res) {
	const users = require('./users.json')
	users.push(req.body);
	fs.writeFile('users.json', JSON.stringify(users), function (err) {
		if (err) throw err;
	});
	res.redirect('/')
})


 app.listen(port, () => console.log(`Example app listening on port 3000!`))
