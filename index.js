const app = require('./app');

const port = process.env.PORT || 3000;

// Listen on environment port or 3000
app.listen(port, () => console.log(`Listening on port ${port}`));
