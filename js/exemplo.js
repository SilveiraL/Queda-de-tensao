const { PythonShell } = require('python-shell');

function sendPython(arquivo, ...argumentos) {
    var python = new PythonShell(arquivo, {
        scriptPath: __dirname + '/../_python',
        args: argumentos
    });

    python.once('message', message => {
        alert(message);
    });
}

document.querySelector('button').onclick = () => {
    const cabo = document.getElementById('cabo').value;
    const tensao = document.getElementById('tensao').value;
    const fp = document.getElementById('fp').value;
    sendPython('teste.py', cabo, tensao, fp);
}