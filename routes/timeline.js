const createError = require('http-errors')

exports.months = (req, res, next, db) => {
    const ref = db.collection('timeline')
    ref.get().then(response => {
        const months = response.docs.map(doc => doc.id)
        res.send(months)
    }).catch(err => {
        next(createError(500, "Internal Server Error"))
    })
}

exports.posts = (req, res, next, db) => {
    const errMsg = 'Either a internal server error occurred or the requested data can not be retrieved at this time'

    const year = req.query.y
    const month = req.query.m
    if (!year || !month) {
        next(createError(400, "Please provide the required query parameters!"))
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
        next(createError(500, "Internal Server Error"))
    })
}