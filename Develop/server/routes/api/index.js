const path = require('path');
const userRoutes = require('./user-routes');

module.exports = (app) => { 
    app.get('/api', userRoutes);
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/public/index.html'));
    });
};



