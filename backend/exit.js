function OnExitProcess (callback) {
    process.stdin.resume();//so the program will not close instantly

    //do something when app is closing
    process.on('exit', callback.bind(null,{cleanup:true}));

    //catches ctrl+c event
    process.on('SIGINT', callback.bind(null, {exit:true}));

    // catches "kill pid" (for example: nodemon restart)
    process.on('SIGUSR1', callback.bind(null, {exit:true}));
    process.on('SIGUSR2', callback.bind(null, {exit:true}));

    //catches uncaught exceptions
    process.on('uncaughtException', callback.bind(null, {exit:true}));
}

module.exports = OnExitProcess;