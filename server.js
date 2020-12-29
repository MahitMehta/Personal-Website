const express = require('express')
const app = express()
const server = require('http').createServer(app)

const admin = require('firebase-admin')
const serviceAccount = require('./key.json')

const path = require('path')
const createError = require('http-errors')

const timeline = require('./routes/timeline')
const instagram = require('./routes/instagram')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://portfolio-5ce5f.firebaseio.com'
})

const db = admin.firestore()

app.use(express.static(path.join(__dirname, 'client/build')))
app.use((req, res, next) => {
    const forbidden = () => next(createError(403, "This Resource is Forbidden"))
    const headers = req.headers
    if (headers['sec-fetch-site'] !== 'same-origin') forbidden()
    next();
})

app.get('/api/timeline/months', (req, res, next) => timeline.months(req, res, next, db))
app.get('/api/timeline/posts', (req, res, next) => timeline.posts(req, res, next, db)) 

app.get('/api/instagram/posts', instagram.posts)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});
  

const PORT = process.env.PORT || 5000
server.listen(PORT)