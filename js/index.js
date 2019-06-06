const $ = require('jquery');

var objetoEdicao;

class Componente {
    constructor(nome_componente) {
        this.componente = $('<div>')
            .addClass(nome_componente)
            .addClass('componente')
            .addClass('bg-primary')
            .css('position', 'absolute')

        $('main').append(this.componente);
    }
}

$('.componente').click(e => {
    objetoEdicao = new Componente(e.target.id);
});

$('main').mousemove(e => {
    if (!!objetoEdicao) {
        let x = e.clientX;
        let y = e.clientY;

        x -= parseInt(objetoEdicao.componente.css('width').replace('px', '')) / 2;
        y -= parseInt(objetoEdicao.componente.css('height').replace('px', '')) / 2;

        objetoEdicao.componente.css('left', x).css('top', y);
        console.log(x, y);
    }
});