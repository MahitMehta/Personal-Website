const createError = require('http-errors')
const fetch = require('node-fetch')
const reasourceToken = "bWFoaXRtLXByb3h5LXRva2VuOmQyNjIxNjI4LTNkMWMtNDBjYS05OGFkLWMzODk3NDc2ZDdlYQ==";

const validToken = (token, next) => {
    if (!token) next(createError(403))
    const slicedToken = token.split('Basic ')
    if (slicedToken[1] === reasourceToken) return 
    else next(createError(403))
}

exports.posts = (req, res, next) => {
    validToken(req.headers['authorization'], next)
    const accessToken  = 'IGQVJYeDEyX3dQWDgyQ2tUZA2V1M1ZAMRDFaY2wwRjJiSEJwX1IxdW83ei1VenRmOGVXb09sOWdKR2RscXk2NHJsV3c0UjVOSGVNUmxuc3QzNFdfNHZAZAYkpEVTVBclNyVnh6NnlYaENFOFdiSjN6VUhDUgZDZD'
    const endpoint = 'https://graph.instagram.com/me/media?'
    const postLimit = req.query.postLimit || 15
    const params = {
        fields: 'id,media_url,timestamp,permalink',
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