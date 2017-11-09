const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const Url = require('./models/Url');
const Utils = require('./utils');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const generateShortUrl = (req, doc) => {
    const host = `${req.protocol}://${req.get('host')}/`;

    return host + Utils.encode(doc._id);
};

app.post('/api/shorten', (req, res, next) => {
    const longUrl = req.body.url;

    Url.findOne({ longUrl }, (err, doc) => {
        if (err) {
            return next(err);
        }

        if (doc) {
            return res.json({
                shortUrl: generateShortUrl(req, doc)
            });
        }

        const url = new Url({
            longUrl
        });

        url.save((err, doc) => {
            if (err) {
                return next(err);
            }

            res.json({ shortUrl: generateShortUrl(req, doc) });
        })
    });
});

const port = process.env.PORT || config.get('port');
const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
