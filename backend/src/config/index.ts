import "dotenv/config";

const config = {
    server_port: Number(process.env.SERVER_PORT) || 8000,
    client_url: process.env.CLIENT_URL,
    db : {
        url: process.env.DB_URL,
        name: process.env.POSTGRES_DB,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
    },
    node_env: process.env.NODE_ENV,
    jwt_secret: process.env.JWT_SECRET,
}


export default config;