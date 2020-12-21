const express = require('express')
const app = express()
const server = require('http').createServer(app)

const admin = require('firebase-admin')
const serviceAccount = require('./key.json')

const path = require('path')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://portfolio-5ce5f.firebaseio.com'
})

const db = admin.firestore()

app.get('/api/timeline/months', (req, res) => {
    const ref = db.collection('timeline')
    ref.get().then(response => {
        const months = response.docs.map(doc => doc.id)
        res.send(months)
    }).catch(err => {
        res.send(err)
    })
})

app.get('/api/timeline', (req, res) => {
    const errMsg = 'Either a internal server error occurred or the requested data can not be retrieved at this time'

    const year = req.query.y
    const month = req.query.m
    if (!year || !month) {
        res.send('Please provide the required query parameters!')
        return
    }
    const date = `y${year}m${month}`
    const ref = db.collection(`timeline/${date}/events`)
    ref.get().then(response => {
        const data = response.docs.map(doc => {
            const docObj = {}
            docObj[doc.id] = doc.data()
            return docObj
        })
        let resObj = {}
        resObj[date] = data
        res.send(resObj)
    }).catch(() => {
        res.send(errMsg)
    })
}) 

app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});
  

const PORT = process.env.PORT || 5000
server.listen(PORT)