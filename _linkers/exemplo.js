var { PythonShell } = require('python-shell');
var path = require('path');

document.querySelector('button').onclick = () => {

    const num = document.querySelector('input').value;

    var python = new PythonShell('exemplo.py', {
        scriptPath: path.join(__dirname, '../_python/'),
        args: [num]
    });

    python.on('message', function(message) {
        alert(message);
    });
}