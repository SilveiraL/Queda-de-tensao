const $ = require('jquery');
const electron = require('electron');

class Atributo {
    constructor(id, atributo, select) {
        this.input = null;
        this.atributo = atributo;

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
    atributos.forEach(atributo => {
        const chave = normalizar(atributo.atributo).replace(/ /g, '-');
        const valor = atributo.getText();
        if (chave == 'id') componente.id = valor;
        else componente.attrs[chave] = valor;
    });

    alert(JSON.stringify(componente));
    cancelar();
}

const componente = JSON.parse(localStorage.getItem('componente'));
console.log(componente)

let atributos = [new Atributo('id', 'Id')];

if (!!componente.id) atributos[0].setText(componente.id);

switch (componente.tipo) {
    case 'transformador':
        atributos.push(new Atributo('p', 'Potência'));
        atributos.push(new Atributo('pa', 'Potência aparente'));
        atributos.push(new Atributo('ca', 'Carga acumulada'));
        atributos.push(new Atributo('fa', 'Fase', ['Monofásico', 'Bifásico', 'Trifásico']));

        if (!!componente.attrs['potencia']) atributos[1].setText(componente.attrs['potencia']);
        if (!!componente.attrs['potencia-aparente']) atributos[2].setText(componente.attrs['potencia-aparente']);
        if (!!componente.attrs['carga-acumulada']) atributos[3].setText(componente.attrs['carga-acumulada']);
        if (!!componente.attrs['fase']) atributos[4].setText(componente.attrs['fase']);
        break;

    case 'nó':
        atributos.push(new Atributo('ca', 'Carga acumulada'));
        if (!!componente.attrs['carga-acumulada']) atributos[1].setText(componente.attrs['carga-acumulada']);
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