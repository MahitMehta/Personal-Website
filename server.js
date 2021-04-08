// env. variables setup
require('dotenv').config()

// Express Server Setup
const express = require('express')
const app = express()
const server = require('http').createServer(app)

// Additional Packages and Modules Required
const jwt = require('jsonwebtoken')
const path = require('path')
const cookieParser = require('cookie-parser')
const csrf = require('csurf')
const createError = require('http-errors')

// Routes
const timeline = require('./routes/timeline')
const instagram = require('./routes/instagram')
const adminRoutes = require('./routes/admin')

// Firebase Setup
const admin = require('firebase-admin')
//const serviceAccount = require('./key.json')

const serviceAccount = {
    type: process.env.MAHITM_FIREBASE_TYPE,
    project_id: process.env.MAHITM_FIREBASE_PROJECT_ID,
    private_key_id: process.env.MAHITM_FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.MAHITM_FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.MAHITM_FIREBASE_CLIENT_EMAIL,
    client_id: process.env.MAHITM_FIREBASE_CLIENT_ID,
    auth_uri: process.env.MAHITM_FIREBASE_AUTH_URI,
    token_uri: process.env.MAHITM_FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.MAHITM_FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.MAHITM_FIREBASE_CLIENT_X509_CERT_URL,
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://portfolio-5ce5f.firebaseio.com'
})
const db = admin.firestore()

// ejs setup
app.set('view-engine', 'ejs')

// Middleware 
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'client/build')))
app.use(cookieParser())
const csrfProtection = csrf({ cookie: true })

const validateAdminToken = (req, res, next) => {
    const adminToken = req.cookies.adminToken
    jwt.verify(adminToken, process.env.MAHITM_ACCESS_TOKEN_SECRET, (err, data) => {
        if (err) {
            res.sendStatus(403)
            return 
        }
        if (!data || data.deadline < Date.now()) res.sendStatus(403)
        next()  
    })
}

const validateResourceToken = (req, _, next) => {
    const reasourceToken = process.env.MAHITM_RESOURCE_TOKEN
    const token = req.headers['authorization']
    if (!token) next(createError(403))
    const slicedToken = token.split('Basic ')
    if (slicedToken[1] === reasourceToken) next()
    else next(createError(403))
}

// Admin HTTP Routes 
app.post('/validate-token', validateAdminToken, (_, res) => res.sendStatus(200))
app.post('/api/timeline/set-post', validateAdminToken, (req, res) => timeline.setPost(req, res, db))
app.post('/admin/logout', validateAdminToken, (req, res) => adminRoutes.logout(req, res))
// Timeline Post Edit Routes 
app.delete('/api/timeline/delete-post', validateAdminToken, (req, res) => timeline.deletePost(req, res, db))

app.get('/admin', csrfProtection, (req, res) => adminRoutes.login(req, res))
app.get('/admin/verify-creds', csrfProtection, (req, res) => adminRoutes.verifyCreds(req, res))

// User Routes
app.get('/resume.pdf', (_, res) => {
    res.sendFile(path.join(__dirname, './static/resume.pdf'))
})

app.get('/api/timeline/months', validateResourceToken, (req, res) => timeline.months(req, res, db))
app.get('/api/timeline/posts', validateResourceToken, (req, res) => timeline.posts(req, res, db)) 
app.get('/api/instagram/posts', validateResourceToken, (req, res) => instagram.posts(req, res))
app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
})


const PORT = process.env.PORT || 5000
server.listen(PORT)