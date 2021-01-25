exports.months = (_, res, db) => {
    const ref = db.collection('timeline')
    ref.get().then(response => {
        const months = response.docs.map(doc => doc.id)
        res.send(months)
    }).catch(() => res.sendStatus(500))
}

exports.posts = (req, res, db) => {
    const year = req.query.y
    const month = req.query.m
    if (!year || !month) {
        res.sendStatus(400)
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
        res.sendStatus(500)
    })
}

exports.setPost = (req, res, db) => {
    const { title, description, links } = req.body
    const allLinks = links.map(({ name, link }) => {
        const refObj = {};
        refObj[name] = link
        return refObj
    })
    const date = new Date()
    const year = date.getUTCFullYear()
    const month = (date.getUTCMonth() + 1) / 10 < 1 ? `0${date.getUTCMonth() + 1}` : date.getUTCMonth() + 1
    const postDate = `y${year}m${month}`
    const currentEvents = db.collection(`timeline/${postDate}/events`)
    currentEvents.get()
        .then(response => {
            const eventCount = response.docs.length
            const postDocRef = db.doc(`timeline/${postDate}`)
            postDocRef.set({ timestamp: Date.now() }).then(() => {
                const newPostRef = db.doc(`timeline/${postDate}/events/${eventCount + 1}`)
                newPostRef.set({
                    header: title,
                    description: description,
                    links: allLinks,
                    timestamp: Date.now()
                }).then(() => {
                    res.sendStatus(200)
                }).catch(_ => res.sendStatus(500))
            }).catch(_ => res.sendStatus(500))
        }).catch(_ => res.sendStatus(500))
}

exports.deletePost = (req, res, db) => {
    const { hide, postMonth, eventNumber} = req.body
    if (hide) {
        res.sendStatus(400)
        return 
    }
    const postRef = db.doc(`timeline/${postMonth}/events/${eventNumber}`)
    postRef.delete().then(() => {
        res.sendStatus(200)
    }).catch(() => res.sendStatus(500))
}