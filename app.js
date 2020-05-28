const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const { getHomePage } = require('./routes/index');
const { getLoginPage, loginUser, addAdmin, addDonorDetails } = require('./routes/user');

// const { addUser } = require('./addUser');

require('dotenv').config();

const app = express();

// for(let i = 10; i <= 66; i++) {
//     addUser('TVE18CS0' + i, 'cse18' + i);
// }

app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', getHomePage);

app.get('/login', getLoginPage);
app.post('/login', loginUser);

app.post('/student/:username/adddetails', addDonorDetails);


app.post('/add/admin', addAdmin);


app.listen(process.env.PORT, (err) => {
    if(!err) {
        console.log('Server is running...');
        console.log('Listening to port ' + process.env.PORT);
    } else {
        console.log(err);
    }
})



