const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const restaurants = [
    { id: 1, name: "Botanist", address: "Vancouver, BC, Canada", work_time: "Opens 11:30AM", imgUrl: "https://s26.picofile.com/file/8457696950/res1.jpg", stars: "4" },
    { id: 2, name: "Canoe", address: "Toronto, ON, Canada", work_time: "Opens 10:30AM", imgUrl: "https://s27.picofile.com/file/8457696968/res2.jpg", stars: "3" },
    { id: 3, name: "Richmond Station", address: "Calgary, AB, Canada", work_time: "Opens 4:30PM", imgUrl: "https://s26.picofile.com/file/8457696976/res3.jpg", stars: "5" },
    { id: 4, name: "St. Lawrence Restaurant", address: "Vancouver, BC, Canada ", work_time: "Opens 21:00AM", imgUrl: "https://s27.picofile.com/file/8457697200/res4.jpg", stars: "4" },
    { id: 5, name: "Aloette Restaurant", address: "Toronto, ON, Canada", work_time: "Opens 09:30AM", imgUrl: "https://s26.picofile.com/file/8457697218/res5.jpg", stars: "2" },
    { id: 6, name: "AnnaLena", address: "Vancouver, BC, Canada ", work_time: "Opens 11:30AM", imgUrl: "https://s26.picofile.com/file/8457697226/res6.jpg", stars: "4" },
]
app.get("/", (req, res) => {
    res.send("Searching Restaurants Webapp");
});
app.get("/api/restaurants", (req, res) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.send(restaurants);
});
app.get("/api/restaurants/:id", (req, res) => {
    const restaurant = restaurants.find(c => c.id === parseInt(req.params.id));
    if (!restaurant) return res.status(404).send("restaurant with the given id not found");
    res.send(restaurant);
});
app.post("/api/restaurants", (req, res) => {
    const result = validateCourse(req.body)

    if (result.error) return res.status(400).send(result.error.details[0].message);

    const restaurant = {
        id: restaurants.length + 1,
        name: req.body.name,
        address: req.body.address,
        work_time: req.body.work_time,
        imgUrl: req.body.imgUrl,
        stars: req.body.stars
    }
    courses.push(restaurant);
    res.send(restaurant);
});
app.put("/api/restaurants/:id", (req, res) => {
    const restaurant = restaurants.find(c => c.id === parseInt(req.params.id));
    if (!restaurant) return res.status(404).send("restaurant with the given id not found");

    const result = validateCourse(req.body)

    if (result.error) return res.status(400).send(result.error.details[0].message);


    restaurant.name = req.body.name;
    res.send(restaurant);
})

app.delete("/api/restaurants/:id", (req, res) => {
    const restaurant = restaurants.find(c => c.id === parseInt(req.params.id));
    if (!restaurant) return res.status(404).send("restaurant with the given id not found");

    const index = restaurants.indexOf(restaurant);
    restaurants.splice(index, 1);

    res.send(restaurant);
})

function validateCourse(restaurant) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(restaurant, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server is running on port ${port}...`))