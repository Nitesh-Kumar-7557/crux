import "dotenv/config";

const config = {
    server_port: Number(process.env.SERVER_PORT) || 8000,
    client_url: process.env.CLIENT_URL
}


export default config;