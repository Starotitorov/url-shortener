const mongoose = require('../lib/mongoose');
const Counter = require('./Counter');
const Schema = mongoose.Schema;

const schema = new Schema({
    _id: {
        type: Number,
        index: true
    },
    longUrl: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

schema.pre('save', function(next){
    const doc = this;

    Counter.findByIdAndUpdate(
        { _id: 'url_count' },
        { $inc: { seq: 1 } },
        (err, counter) => {
            if (err) {
                return next(err);
            }

            doc._id = counter.seq;
            next();
        }
    );
});

module.exports = mongoose.model('Url', schema);
