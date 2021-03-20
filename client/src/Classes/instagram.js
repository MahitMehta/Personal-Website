class Instagram {
    constructor(token) {
        this.token = token;
        this.proxyAuth = `Basic ${this.token}`;
    }

    async posts() {
        const endpoint = `/api/instagram/posts`
        const data = await fetch(endpoint, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.proxyAuth,
            },
        })
            .then(res => res.json())
            .then(({posts, ignoreKey}) => {
                const filteredData = posts.filter(({ caption }) => {
                    if (!caption) return true
                    return !caption.includes(ignoreKey)
                });
                return filteredData;
            }).catch(() => {
                return []
            });
        return await data;
    }
}

export default Instagram;