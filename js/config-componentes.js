const $ = require('jquery');

class Atributo {
    constructor(id, atributo, select) {
        this.input = null;

        if (!!select) {
            this.input = $('<select>')
                .attr('name', 'Fase')
                .addClass('col-6')
                .addClass('rounded')
                .addClass('border-secondary')
                .addClass('px-1')

            select.forEach(option => {
                this.input.append($('<option>').val(option).html(option));
            });
        }
        else {
            this.input = $('<input>')
                .attr('type', 'text')
                .addClass('col-6')
                .addClass('rounded')
                .addClass('border-secondary')
                .addClass('px-1');
        }

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

let atributos = [new Atributo('id', 'Id')];

switch (componente.tipo) {
    case 'transformador':
        atributos.push(new Atributo('p', 'Potência'));
        atributos.push(new Atributo('pa', 'Potência aparente'));
        atributos.push(new Atributo('ca', 'Carga acumulada'));
        atributos.push(new Atributo('fa', 'Fase', ['Monofásico', 'Bifásico', 'Trifásico']));
        break;

    case 'nó':
        atributos.push(new Atributo('ca', 'Carga acumulada'));
        break;
}

$('#cancelar').click(() => {
    window.close();
});

$('#salvar').click(() => {
    atributos.forEach(atributo => {
        alert(atributo.getText());
    });
});