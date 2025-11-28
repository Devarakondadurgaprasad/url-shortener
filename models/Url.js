const mongoose = require('mongoose');


const UrlSchema = new mongoose.Schema({
shortId: { type: String, required: true, unique: true, index: true },
longUrl: { type: String, required: true },
owner: { type: String, default: null },
createdAt: { type: Date, default: Date.now },
expireAt: { type: Date, default: null },
clicks: { type: Number, default: 0 }
});


UrlSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });


module.exports = mongoose.model('Url', UrlSchema);
