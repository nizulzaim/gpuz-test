const cmd = require('node-cmd');

module.exports = function() {
    process.stdin.resume();//so the program will not close instantly

    function exitHandler(options, err) {
        cmd.get(
            `wmic process where name='GPU-Z.exe' delete`,
            function(err, data, stderr){
                if (options.cleanup) console.log('clean');
                if (err) console.log(err.stack);
                if (options.exit) process.exit()
            }
        );
    }

    process.on('exit', exitHandler.bind(null,{cleanup:true}));
    process.on('SIGINT', exitHandler.bind(null, {exit:true}));
    process.on('uncaughtException', exitHandler.bind(null, {exit:true}));
}