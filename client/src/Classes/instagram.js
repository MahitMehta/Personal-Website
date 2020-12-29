class Instagram {
    async posts() {
        const endpoint = "/api/instagram/posts"
        const data = await fetch(endpoint)
            .then(res => res.json())
            .then(data => {
                return data;
            }).catch(() => {
                return []
            });
        return await data;
    }
}

export default Instagram;