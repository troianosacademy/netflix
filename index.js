const express = require('./config/express');
const mongoose = require('./config/mongoose');
const { port, env } = require('./config/vars');

mongoose.connect();
express.listen(port, () => console.log(`server started on port ${port} (${env})`));
