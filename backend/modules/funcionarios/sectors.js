const database = require('../database.js');

function BySector (txt)
{
    //console.log(database.clients, txt);
    const clients = database.GetClients();
    return clients.reduce((bs, c) =>
    {
        console.log(txt + " != " + c.sector);
        if(c.sector == txt || c.sector.includes(txt)) bs.push(c);
        return bs;
    }, []);
}

module.exports = BySector;