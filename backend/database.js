const onexit = require("./exit.js");
const fs = require('fs');
const clientsPath = `${__dirname}/database/clients.json`;
const clients = LoadClients ();

function exitHandler(options, exitCode) {
    if (options.cleanup) console.log('clean');
    if (exitCode || exitCode === 0) console.log(exitCode);
    SaveClients ();
    if (options.exit) process.exit();
}
//onexit (exitHandler);

function SaveClients ()
{
    fs.writeFile(clientsPath, JSON.stringify(clients), 'utf8', function (err) {
        if (err) throw err;
    });
}

function LoadClients ()
{
    return JSON.parse(fs.readFileSync(clientsPath));
}

function GetClients()
{
    return clients;
}

function AddClients(...nclients)
{
    console.log("Salvando " + nclients);
    nclients.forEach(element => {
        clients.push(element)
    });
    SaveClients();
    return {sucess:true};
}

function ModClients(...clients)
{

}

function DelClients(...clients)
{

}

module.exports = 
{
    GetClients,
    AddClients
};