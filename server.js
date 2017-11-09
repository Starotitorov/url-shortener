const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const config = require('./config');
const Url = require('./models/Url');
const { HttpError } = require('./lib/errors');
const errorHandler = require('errorhandler');
const UrlShortener = require('./lib/UrlShortener');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(require('./middleware/sendHttpError'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.post('/api/shorten', (req, res, next) => {
    const longUrl = req.body.url;

    Url.findOne({ longUrl }, (err, doc) => {
        const protocol = req.protocol;
        const host = req.get('host');

        if (err) {
            return next(err);
        }

        if (doc) {
            return res.json({
                shortUrl: UrlShortener.generate(protocol, host, doc)
            });
        }

        const url = new Url({
            longUrl
        });

        url.save((err, doc) => {
            if (err) {
                return next(err);
            }

            res.json({ shortUrl: UrlShortener.generate(protocol, host, doc) });
        })
    });
});

app.get('/:encodedId', (req, res, next) => {
    const docId = UrlShortener.parse(req.params.encodedId);

    Url.findOne({ _id: docId }, (err, doc) => {

        if (err) {
            return next(err);
        }

        if (!doc) {
            return next(new HttpError(404));
        }

        res.redirect(doc.longUrl);
    })
});

app.use((err, req, res, next) => {
    if (typeof err === 'number') {
        err = new HttpError(err);
    }

    if (err instanceof HttpError) {
        res.sendHttpError(err);
    } else {
        if (app.get('env') === 'development') {
            errorHandler()(err, req, res, next);
        } else {
            err = new HttpError(500);
            res.sendHttpError(err);
        }
    }
});

const port = process.env.PORT || config.get('port');
const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
