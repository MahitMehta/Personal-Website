const jwt = require('jsonwebtoken')

const dotenv = require('dotenv')
dotenv.config()

function addAdminToken(res, maxTime) {
    const deadline = { deadline: Date.now() + maxTime }
    const adminToken = jwt.sign(deadline, process.env.MAHITM_ACCESS_TOKEN_SECRET)
    res.cookie("adminToken", adminToken, {
        maxAge: maxTime,
        httpOnly: true,
        secure: process.env.PRODUCTION ? true : false
    })
}

exports.login = (req, res) => res.render('admin.ejs', {"csrfToken": req.csrfToken()})

exports.verifyCreds = (req, res) => {
    const headers = req.headers
    const auth = headers['authorization']
    if (!auth) {
        res.sendStatus(400)
        return
    }
    const encodedCreds = auth.split('Basic ')[1]
    const buff = Buffer.from(encodedCreds, 'base64')
    const decodedCreds = buff.toString('ascii')
    const creds = decodedCreds.split(':')
    const [email, pass] = creds

    const adminEmail = process.env.MAHITM_ADMIN_EMAIL
    const adminPass = process.env.MAHITM_ADMIN_PASS

    if (email === adminEmail && pass === adminPass) {
        const maxTime = 5 * 60 * 1000
        addAdminToken(res, maxTime)
        res.send({ admin: true }) 
    } else {
        res.send({ admin: false })
    }
}

exports.logout = (_, res) => {
    addAdminToken(res, 0)
    res.sendStatus(200)
}