const express = require('express');
if (!shortId) return res.status(500).json({ error: 'Failed to generate id' });
}


const doc = new Url({
shortId,
longUrl,
expireAt: expireAt ? new Date(expireAt) : null
});
await doc.save();


// prime cache
await redis.set(`short:${shortId}`, longUrl, 'EX', 60 * 60 * 24);


return res.json({ shortUrl: `${BASE}/s/${shortId}` });
} catch (err) {
console.error(err);
return res.status(500).json({ error: 'Server error' });
}
});


// GET /s/:shortId -> redirect
app.get('/s/:shortId', async (req, res) => {
try {
const shortId = req.params.shortId;
const cacheKey = `short:${shortId}`;
const cached = await redis.get(cacheKey);
if (cached) {
Url.updateOne({ shortId }, { $inc: { clicks: 1 } }).exec();
return res.redirect(302, cached);
}


const doc = await Url.findOne({ shortId });
if (!doc) return res.status(404).send('Not found');


await redis.set(cacheKey, doc.longUrl, 'EX', 60 * 60 * 24);
Url.updateOne({ shortId }, { $inc: { clicks: 1 } }).exec();


return res.redirect(302, doc.longUrl);
} catch (err) {
console.error(err);
res.status(500).send('Server error');
}
});


// GET meta
app.get('/api/info/:shortId', async (req, res) => {
try {
const shortId = req.params.shortId;
const doc = await Url.findOne({ shortId }).lean();
if (!doc) return res.status(404).json({ error: 'Not found' });
return res.json({ shortId: doc.shortId, longUrl: doc.longUrl, clicks: doc.clicks, createdAt: doc.createdAt, expireAt: doc.expireAt });
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Server error' });
}
});


app.listen(PORT, () => console.log(`Listening on ${PORT}`));
