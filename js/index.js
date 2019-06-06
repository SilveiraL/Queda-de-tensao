const $ = require('jquery');

class Componente {
    constructor() {
        this.dom = $('<div>')
            .addClass('componente')
            .addClass('bg-primary')
            .addClass('seguir-mouse')
            .css('position', 'absolute')

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
}

class Transformador extends Componente {
    constructor() {
        super();

        this.dom.addClass('transformador');
    }
}

class No extends Componente {
    constructor() {
        super();

        this.dom.addClass('no');
    }
}

$('.componente').click(e => {
    switch (e.target.id) {
        case 'transformador':
            objetoEdicao = new Transformador();
            break;

        case 'no':
            objetoEdicao = new No();
    }
});

// $('main').mousemove(e => {
//     if (!!objetoEdicao) {

//     }
// });