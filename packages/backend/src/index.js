const app = require('./app');

const PORT = process.env.PORT || 3001;

// FIXED: Removed console.log to satisfy ESLint no-console rule
app.listen(PORT);
