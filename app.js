const express = require('express');
const Rating = require('./modules/rating');
const mongoose = require('mongoose');
const app = express();

const uri = 'mongodb+srv://Yazan:test123@cluster0.leyf7ua.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    })
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});



app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.render('home', { title: 'Rate a course' });
})
app.get('/admin', (req, res) => {
    Rating.find()
        .then(result => {
            res.render('admin', { ratings: result })
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error retrieving ratings');
        });
})
app.post('/', (req, res) => {
    const rate = new Rating(req.body);
    rate.save()
        .then(result => {
            console.log('Rating saved');
            res.redirect('/');
        })
        .catch((err) => {
            console.error(err);
        });
})