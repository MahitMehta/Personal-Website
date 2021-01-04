class Timeline {
    constructor(token) {
        this.token = token;
        this.proxyAuth = `Basic ${this.token}`;
    }

    async months() {
        const endpoint = "/api/timeline/months"
        const data = await fetch(endpoint, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.proxyAuth
            }
        })
            .then(res => res.json())
            .then(data => {
                return data;
            }).catch(() => {
                return []
            });
        return await data;
    }
    async posts(year, month) {
        const endpoint = `/api/timeline/posts?y=${year}&m=${month}`;
        const data = await fetch(endpoint, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.proxyAuth
            }
        })
            .then(res => res.json())
            .then(data => {
                return data;
            }).catch(() => {
                return []
            });
        return await data;
    }
    async setPost(data) {
        const endpoint = `/api/timeline/set-post`;
        const res = await fetch(endpoint, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: data
        })
        return res;
    }
}

export default Timeline;