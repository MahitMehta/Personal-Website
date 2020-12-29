class Timeline {
    async months() {
        const endpoint = "/api/timeline/months"
        const data = await fetch(endpoint)
            .then(res => res.json())
            .then(data => {
                return data;
            }).catch(() => {
                return []
            });
        return await data;
    }
    async posts(year, month) {
        const endpoint = `/api/timeline/posts?y=${year}&m=${month}`
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

export default Timeline;