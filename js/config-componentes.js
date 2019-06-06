const $ = require('jquery');

class Atributo {
    constructor(id, atributo) {
        this.dom = $('<div>')
            .addClass('row')
            .addClass('p-2')
            .append(
                $('<span>')
                    .addClass('col-6')
                    .addClass('text-dark')
                    .html(atributo + ': ')
            ).append(
                $('<input>')
                    .attr('type', 'text')
                    .addClass('col-6')
                    .addClass('rounded')
                    .addClass('border-secondary')
                    .addClass('px-1')
            );

        $('#atributos').append(this.dom);
    }
}

const componente = JSON.parse(localStorage.getItem('componente'));
$('title').html('Configurações do ' + componente.tipo);

let atributos = [];

switch (componente.tipo) {
    case 'transformador':
        atributos.push(new Atributo('pa', 'Potência aparente'));
        atributos.push(new Atributo('ca', 'Carga acumulada'));
        atributos.push(new Atributo('fa', 'Fase'));
        break;

    case 'nó':
        atributos.push(new Atributo('ca', 'Carga acumulada'));
        break;
}

$('#cancelar').click(() => {
    window.close();
});