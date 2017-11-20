const uri = process.env.NODE_ENV === 'production'
    ? process.env.MONGO_URI
    : "mongodb://localhost/url-shortener";

module.exports = {
    port: 3000,
    secret: "secretKey",
    mongoose: {
        uri,
        options: {
            server: {
                socketOptions: {
                    keepAlive: 1
                }
            }
        }
    }
};
