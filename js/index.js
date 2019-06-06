const $ = require('jquery');

var objetoEdicao = $();


class Componente {
    constructor(nome_componente) {
        this.componente = $('<div>')
            .addClass(nome_componente)
            .addClass('componentes')
            .addClass('bg-primary')
            .addClass('mx-4')
            .css('position', 'absolute')

        $('main').append(this.componente);
    }
}

$('.componentes').click(e => {
    objetoEdicao = new Componente(e.target.id);
});

$('main').mousemove(e => {
    const x = e.clientX;
    const y = e.clientY;

    objetoEdicao.componente.css('left', x).css('top', y + );
    console.log(x, y)
});