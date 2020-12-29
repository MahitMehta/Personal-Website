const createError = require('http-errors')
const fetch = require('node-fetch')

exports.posts = (req, res, next) => {
    const accessToken  = 'IGQVJYeDEyX3dQWDgyQ2tUZA2V1M1ZAMRDFaY2wwRjJiSEJwX1IxdW83ei1VenRmOGVXb09sOWdKR2RscXk2NHJsV3c0UjVOSGVNUmxuc3QzNFdfNHZAZAYkpEVTVBclNyVnh6NnlYaENFOFdiSjN6VUhDUgZDZD'
    const endpoint = 'https://graph.instagram.com/me/media?'
    const postLimit = req.query.postLimit || 15
    const params = {
        fields: 'id,media_type,media_url,username,timestamp,caption,permalink',
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
    .then(data => res.send(data.data))
    .catch(() => next(createError(500, 'Internal Server Error')))
}