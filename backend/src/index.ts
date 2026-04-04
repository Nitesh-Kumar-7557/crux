import app from "./app.js";
import config from "./config/index.js";

app.listen(config.server_port, ()=> {
    console.log("Server is up and running...")
})