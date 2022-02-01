const database = require('../database.js');

function ByMount (mount)
{
    const n = parseInt(mount);
    //console.log(database.clients, mount);
    const clients = database.GetClients();
    //if(!clients) return [];
    return clients.reduce((bs, c)=>
    {
        const bd = c.birthDay.split("-")[1];
        if(parseInt(bd) == n) bs.push(c);
        return bs;
    }, []);
}

module.exports = ByMount;//{ ByMount };