const express = require('./config/express');
const mongoose = require('./config/mongoose');
const startup = require('./config/startup');

const { port, env } = require('./config/vars');

mongoose.connect();

(async () => await startup())();

express.listen(port, () => console.log(`server started on port ${port} (${env})`));
