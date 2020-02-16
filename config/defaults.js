const uri = process.env.NODE_ENV === 'production'
    ? process.env.MONGO_URI
    : "mongodb://localhost/url-shortener";

module.exports = {
    port: 3000,
    mongoose: {
        uri,
        options: {
            keepAlive: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        }
    }
};
