const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'renderer/public')));

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "renderer/views"));

// Home route
app.get("/", (req, res) => {
    res.render("index", { weather: null, error: null });
});

// Handle form
app.post("/weather", async (req, res) => {
    const city = req.body.city;
    const apiKey = "7913cd56ee2b0f7c548ede0a1cdeb4a4"; 

    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        const data = response.data;
        const weather = {
            city: data.name,
            temp: data.main.temp,
            humidity: data.main.humidity,
            description: data.weather[0].description
        };

        res.render("index", { weather, error: null });
    } catch (err) {
        res.render("index", { weather: null, error: "City not found!" });
    }
});

app.listen(PORT, () => {
    console.log(`Express server running at http://localhost:${PORT}`);
});

