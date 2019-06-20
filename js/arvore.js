class NoArvoreBinaria {
    constructor(id, valor) {
        this.id = id;
        this.valor = valor;
        this.esquerda = null;
        this.direita = null;
    }

    print() {
        console.log(`Id: ${this.id}\nValor: ${this.valor}`);
        return this;
    }

    printArvore(raiz = this) {
        if (raiz != null) {
            this.printArvore(raiz.esquerda);
            console.log(`[${raiz.id}]`);
            this.printArvore(raiz.direita);
        }
    }

    inserir(id, valor = null) {
        if (id < this.id) {
            if (this.esquerda == null) this.esquerda = new NoArvoreBinaria(id, valor);
            else this.esquerda.inserir(id, valor);
        }
        else {
            if (this.direita == null) this.direita = new NoArvoreBinaria(id, valor);
            else this.direita.inserir(id, valor);
        }

        return this;
    }

    buscar(id) {
        if (id < this.id) {
            if (this.esquerda != null) return this.esquerda.buscar(id);
            else return null;
        }
        else if (id > this.id) {
            if (this.direita != null) return this.direita.buscar(id);
            else return null;
        }
        else return this;
    }
}

class Arvore {
    constructor(id, parent = null) {
        this.id = id;
        this.childs = [];
        this.parent = parent;
        return this;
    }

    print() {
        console.log(this);
        return this;
    }

    printArvore(raiz = this) {
        if (raiz != null) {
            this.printArvore(raiz.esquerda);
            console.log(`[${raiz.id}]`);
            this.printArvore(raiz.direita);
        }
    }

    push(arvore) {
        arvore.parent = this;
        this.childs.push(arvore);
        return this;
    }

    child(id) {
        for (let node of this.childs) {
            if (node.id == id) return node;
        }
    }

    remove() {
        if (this.parent != null) {
            this.parent.childs.forEach((node, index) => {
                if (node.id == this.id) this.parent.childs.splice(index, 1);
            });
        }

        return this;
    }

    update(arvore) {
        if (this.parent != null) {
            arvore.id = this.id;
            arvore.parent = this.parent;
            this.parent.childs.forEach((node, index) => {
                if (node.id == this.id) {
                    this.parent.childs[index] = arvore;
                }
            });
        }

        return this;
    }

    queryNode(id) {
        if (id == this.id) return this;
        else {
            for (let node of this.childs) {
                console.log(node);
            }
        }
    }
}

const arvore = new Arvore(1);
arvore.push(new Arvore(2));
arvore.push(new Arvore(3));
arvore.push(new Arvore(4));

arvore.child(3);
arvore.print();
