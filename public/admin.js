const cookies = document.cookie.split("; ");
cookies.forEach(cookie => {
    const cookieSplit = cookie.split("=");
    const cookieName = cookieSplit[0];
    if (cookieName === "adminToken") {
        const adminToken = cookieSplit[1];
        if (adminToken) {
            const tokenOBJ = { adminToken: adminToken };
            const body = JSON.stringify(tokenOBJ);
            fetch('/example', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body
            }).then(res => res.json())
            .then(data => console.log(data))
        }
    }
})

const labels = document.querySelectorAll(".label");
const fields = document.querySelectorAll(".field");

labels.forEach((_, idx) => {
    fields[idx].addEventListener("input", () => {
        if (fields[idx].value === "") labels[idx].style.display = "flex";
        else labels[idx].style.display = "none";
    });
});

const form = document.querySelector(".login-form");

form.addEventListener("submit", e => {
    e.preventDefault();
    const email = fields[0].value; 
    const pass = fields[1].value; 
    const data = `${email}:${pass}`;
    const authToken = `Basic ${btoa(data)}`;

    const endpoint = "/admin/verify-creds";
    fetch(endpoint, {
        credentials: 'same-origin',
        method: "GET",
        headers: {
            'Content-Type': 'application/html',
            'CSRF-Token': csrfToken,
            'Authorization': authToken
        },
    })
    .then(res => res.json())
    .then(data => {
        const admin = data.admin; 
        if (admin) {
            const origin = window.location.origin;
            window.location.href = origin;
        } else console.warn("Incorrect Email or Password!");
    })
    .catch(() => () => {
        fields[0].value = "";
        fields[1].value = "";
        window.alert("Session Ended, Please Reload");
    })
});