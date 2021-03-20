const fetch = require('node-fetch')

exports.posts = (req, res) => {
    const accessToken = process.env.MAHITM_INSTAGRAM_ACCESS_TOKEN
    const endpoint = 'https://graph.instagram.com/me/media?'
    const postLimit = req.query.postLimit || 15
    const params = {
        fields: 'id,media_url,timestamp,permalink,caption',
        access_token: accessToken,
        limit: postLimit
    }
    let url = endpoint 
    const keys = Object.keys(params)
    keys.forEach((key, index) => {
        url += `${key}=${params[key]}${index + 1 !== keys.length ? '&' : ''}`
    })
   fetch(url)
    .then(response => response.json())
    .then(data => res.send({posts: data.data, ignoreKey: process.env.MAHITM_INSTAGRAM_IGNORE_KEY}))
    .catch(() => res.sendStatus(500))
}