const gpuz = require('gpu-z')
const readline = require('readline');
const chalk = require('chalk')
const cmd = require('node-cmd');
const fkill = require('fkill');
const exitHandler = require('./exit-handler')

let i = 0

let doJob = () => {
    let sensors = gpuz.getData().sensors
    
    if (i > 0) {
        process.stdout.moveCursor(0,-1);
        for (j = 1; j < i; j++) {
            process.stdout.moveCursor(0,-1);
            process.stdout.clearLine();
        }
        i = 0
    }

    for (let key in sensors) {
        let unit = sensors[key].unit
        if (unit.substring(0,2) === "%%") {
            unit = "%"
        } else if (unit.substring(1,1) === "C") {
            unit = "Celcius"
        }
        let result = `${chalk.cyan(key)} : ${chalk.green.bold(sensors[key].value.toFixed(sensors[key].digits))} ${unit}`
        if (key) {
            process.stdout.write(result + '\n')
            i++
        }
    }
}

let proc = cmd.get(
    'GPU-Z.exe -minimized',
    function(err, data, stderr){
        if (err) {
            process.exit()
        }
    }
);

setTimeout(() => {
    doJob()
    setInterval(doJob, 1000)
}, 5000)

exitHandler()