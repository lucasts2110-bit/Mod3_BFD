class Livro{
    public titulo:string;
    public autor:string;
    public disponivel:boolean;

    constructor(titulo:string, autor:string, disponivel:boolean=true){
        this.titulo = titulo;
        this.autor = autor;
        this.disponivel = disponivel;
    }
}

class Usuario{
    public nome:string;
    public livrosEmprestados:Livro[] = [];

    constructor(nome:string){
        this.nome = nome;
    }
    emprestar(livro:Livro){
        if(livro.disponivel){
            livro.disponivel = false;
            this.livrosEmprestados.push(livro)
            console.log(`${this.nome} emprestou livro "${livro.titulo}".`);
        }else{
            console.log(`O livro "${livro.titulo}" não está disponível.`)
        }
    }
    devolver(livro: Livro){
        let index = this.livrosEmprestados.indexOf(livro)

        if(index !== -1){
            livro.disponivel = true;
            this.livrosEmprestados.splice(index, 1);
            console.log(`${this.nome} devolveu o livro "${livro.titulo}".`)
        }else{
            console.log(`Esse livro ${livro.titulo} não está disponivel para "${this.nome}".`);
        }
    }
}


const livro1 = new Livro("O principe", "Nicolau maquiavel", true);
const livro2 = new Livro("Noites brancas", "Fiódor Dostoiévski", false);
const user1 = new Usuario("Éden");


user1.emprestar(livro1)
user1.emprestar(livro2)
user1.devolver(livro1)