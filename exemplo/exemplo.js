var { PythonShell } = require('python-shell');

document.querySelector('button').onclick = () => {

    const num = document.querySelector('input').value;

    var python = new PythonShell('exemplo.py', {
        scriptPath: __dirname,
        args: [num]
    });

    python.on('message', function (message) {
        alert(message);
    });
}