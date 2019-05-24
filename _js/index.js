const { PythonShell } = require('python-shell');

function sendPython(arquivo, ...argumentos) {
    var python = new PythonShell(arquivo, {
        scriptPath: __dirname + '/../_python',
        args: argumentos
    });

    python.on('message', message => {
        alert(message);
    });
}

sendPython('teste.py', 1, 2, 3, 4);