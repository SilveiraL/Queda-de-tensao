const $ = require('jquery');

class Atributo {
    constructor(id, atributo, select) {
        this.id = id;
        this.input = null;
        this.atributo = atributo;

        if (!!select) {
            this.input = $('<select>')
                .attr('name', 'Fase')
                .addClass('col-5')
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
                .addClass('col-5')
                .addClass('rounded')
                .addClass('border-secondary')
                .addClass('px-1');
        }

        this.dom = $('<div>')
            .addClass('row')
            .addClass('p-2')
            .append(
                $('<span>')
                    .addClass('col-7')
                    .addClass('text-dark')
                    .html(atributo + ': ')
            ).append(this.input);

        $('#atributos').append(this.dom);
    }

    getText() {
        return this.input.val();
    }

    setText(attr) {
        this.input.val(attr);
        return this;
    }
}

function normalizar(text) {
    text = text.toLowerCase();
    text = text.replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'a');
    text = text.replace(new RegExp('[ÉÈÊ]', 'gi'), 'e');
    text = text.replace(new RegExp('[ÍÌÎ]', 'gi'), 'i');
    text = text.replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'o');
    text = text.replace(new RegExp('[ÚÙÛ]', 'gi'), 'u');
    text = text.replace(new RegExp('[Ç]', 'gi'), 'c');
    return text;
}

function cancelar() {
    window.close();
}

function salvar(atributos) {
    let config = {
        id: null,
        attrs: {}
    }

    atributos.forEach(atributo => {
        const chave = normalizar(atributo.id).replace(/ /g, '-');
        const valor = atributo.getText();
        if (chave == 'id') config.id = valor;
        else config.attrs[chave] = valor;
    });

    localStorage.setItem('componente', JSON.stringify(config));
    cancelar();
}

const componente = JSON.parse(localStorage.getItem('componente'));
console.log(componente);
localStorage.setItem('componente', '');

let atributos = [new Atributo('id', 'Id')];

if (!!componente.id) atributos[0].setText(componente.id);

switch (componente.tipo) {
    case 'transformador':
        atributos.push(new Atributo('pa', 'Potência aparente [kVA]'));
        atributos.push(new Atributo('ca', 'Carga acumulada'));
        atributos.push(new Atributo('fa', 'Fase', ['Monofásico', 'Bifásico', 'Trifásico']));

        if (!!componente.attrs.pa) atributos[1].setText(componente.attrs.pa);
        if (!!componente.attrs.ca) atributos[2].setText(componente.attrs.ca);
        if (!!componente.attrs.fa) atributos[3].setText(componente.attrs.fa);
        break;

    case 'nó':
        atributos.push(new Atributo('ca', 'Carga acumulada'));
        if (!!componente.attrs.ca) atributos[1].setText(componente.attrs.ca);
        break;
}

$('#cancelar').click(() => cancelar());

$('#salvar').click(() => salvar(atributos));

$(document).keydown(key => {
    switch (key.keyCode) {
        case 13: // Enter
            salvar(atributos);
            break;

        case 27: // ESC
            cancelar();
            break;
    }
});