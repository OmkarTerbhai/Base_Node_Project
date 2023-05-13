const { ServerConfig, Logger } = require('./config');
const express = require('express');
const apiRoutes = require('./routes');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, async () => {
    console.log("Successfully started the server on port :"+ServerConfig.PORT);
    Logger.info("Successfully started server", {});

    const { Airport , City } = require('./models');
    const city = await City.findByPk(2);
    console.log(city);

    await City.destroy({
        where: {
            id: 4
        }
    });

})

//Bad Code incoming
// DO NOT TRY THIS AT HOME


