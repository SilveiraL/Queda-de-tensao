const $ = require('jquery');

class Atributo {
    constructor(id, atributo) {
        this.input = $('<input>')
            .attr('type', 'text')
            .addClass('col-6')
            .addClass('rounded')
            .addClass('border-secondary')
            .addClass('px-1')

        this.dom = $('<div>')
            .addClass('row')
            .addClass('p-2')
            .append(
                $('<span>')
                    .addClass('col-6')
                    .addClass('text-dark')
                    .html(atributo + ': ')
            ).append(this.input);

        $('#atributos').append(this.dom);
    }

    getText() {
        return this.input.val();
    }
}

const componente = JSON.parse(localStorage.getItem('componente'));
$('title').html('Configurações do ' + componente.tipo);

let atributos = [new Atributo('id', 'Id')];

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

$('#salvar').click(() => {

});