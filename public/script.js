const form = document.getElementById("loginForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    // client-side validation
    if (email === "" || password === "") {
        message.textContent = "Email and password are required.";
        return;
    }

    // check if email contains @
    if (!email.includes("@")) {
        message.textContent = "Please enter a valid email address.";
        return;
    }

    // check password length
    if (password.length < 8) {
        message.textContent = "Password must be at least 8 characters.";
        return;
    }

    try {
        const response = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();
        message.textContent = result.message;
    } catch (error) {
        message.textContent = "Unable to connect to the server.";
    }
});