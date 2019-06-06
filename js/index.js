const $ = require('jquery');
const electron = require('electron');
const BrowserWindow = electron.remote.BrowserWindow;
const Menu = electron.remote.Menu;

const menu = Menu.getApplicationMenu();

const menu_novo = menu.getMenuItemById('novo');
const menu_abrir = menu.getMenuItemById('abrir');
const menu_salvar = menu.getMenuItemById('salvar');

let componentes = [];
let componentesDeletados = [];

Array.prototype.top = function () {
    return this[this.length - 1];
}

class Componente {
    constructor(tipo, id) {
        this.dom = $('<div>')
            .addClass('componente')
            .addClass('bg-primary')
            .addClass('seguir-mouse')
            .css('position', 'absolute')

        this.id = id;
        this.tipo = tipo;
        this.attrs = [];

        const main = $('main');

        main.append(this.dom).mousemove(e => {
            if (this.dom.hasClass('seguir-mouse')) {
                let x = e.clientX;
                let y = e.clientY;

                x -= parseInt(this.dom.css('width').replace('px', '')) / 2;
                y -= parseInt(this.dom.css('height').replace('px', '')) / 2;

                this.dom.css('left', x).css('top', y);
            }
        });

        main.click(e => {
            if (this.dom.hasClass('seguir-mouse')) {
                this.dom.removeClass('seguir-mouse');

                this.dom.dblclick(e => {
                    this.abrirConfiguracoes();
                });

                console.log(this.getX(), this.getY());
            }
        });
    }

    setX(x) {
        this.dom.css('left', x);
    }

    setY(y) {
        this.dom.css('top', y);
    }

    getX() {
        return parseInt(this.dom.css('left').replace('px', ''));
    }

    getY() {
        return parseInt(this.dom.css('top').replace('px', ''));
    }

    setVisible(bool) {
        if (bool) this.dom.css('display', 'block');
        else this.dom.css('display', 'none')
    }

    addMain() {
        $('main').append(this.dom);
    }

    abrirConfiguracoes() {
        localStorage.setItem('componente', JSON.stringify(this));

        const config = new BrowserWindow({
            title: 'Configurações do componente',
            width: 400, height: 300,
            autoHideMenuBar: true,
            icon: './img/icon.png',
            show: false,
            webPreferences: {
                nodeIntegration: true
            },
            resizable: false
        });

        config.loadFile('./windows/config-componentes.html');

        config.once('ready-to-show', () => {
            config.show();
        });

        config.once('close', () => {
            const message = JSON.parse(localStorage.getItem('componente'));
            const attrs = message.attrs;
            this.id = message.id;

            switch (this.tipo) {
                case 'transformador':
                    this.attrs = { 'pa': attrs.pa, 'ca': attrs.ca, 'fa': attrs.fa }
                    break;

                case 'nó':
                    this.attrs = { 'ca': attrs.ca }
                    break;
            }

            console.log(this);
        });
    }
}

class Transformador extends Componente {
    constructor() {
        super('transformador', 'T');

        this.dom.addClass('transformador');
    }
}

class No extends Componente {
    constructor() {
        super('nó', 'N');

        this.dom.addClass('no');
    }
}

$('.componente').click(e => {
    switch (e.target.id) {
        case 'transformador':
            componentes.push(new Transformador());
            break;

        case 'no':
            componentes.push(new No());
    }
});

$(document).keypress(key => {
    switch (key.keyCode) {
        case 26: // Ctrl + z
            if (componentes.length > 0) {
                let componente = componentes.pop();
                componente.setVisible(false);
                componentesDeletados.push(componente);
            }
            break;

        case 25: // Ctrl + y
            if (componentesDeletados.length > 0) {
                let componente = componentesDeletados.pop();
                componente.setVisible(true);
                componentes.push(componente);
            }
            break;
    }

    console.log(key.keyCode);
});