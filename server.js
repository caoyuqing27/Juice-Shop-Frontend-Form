const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    // server-side validation
    if (typeof email !== "string" || typeof password !== "string") {
        return res.status(400).json({
            message: "Invalid request."
        });
    }

    // check if any fields are empty
    if (email.trim() === "" || password === "") {
        return res.status(400).json({
            message: "Email and password are required."
        });
    }

    // check if email contains @
    if (!email.includes("@")) {
        return res.status(400).json({
            message: "Please enter a valid email address."
        });
    }

    // check password length
    if (password.length < 8) {
        return res.status(400).json({
            message: "Password must be at least 8 characters."
        });
    }

    return res.status(200).json({
        message: "Login validation successful."
    });
});

app.listen(PORT, () => {
    console.log(`Login form running at http://localhost:${PORT}`);
});