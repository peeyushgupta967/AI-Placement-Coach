require("dotenv").config();
const db = require("./config/db");


const app = require("./app");

const PORT = process.env.PORT || 5000;

db.connect((err) => {
    if (err) {
        
        return;
    }

    console.log("Database Connected Successfully");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

