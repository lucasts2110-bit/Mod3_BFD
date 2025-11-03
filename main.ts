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

class Biblioteca {
    public livros: Livro[] = [];
    public usuarios: Usuario[] = [];

    adicionarLivro(livro: Livro) {
        this.livros.push(livro);
        console.log(`Livro "${livro.titulo}" adicionado à biblioteca.`);
    }

    adicionarUsuario(usuario: Usuario) {
        this.usuarios.push(usuario);
        console.log(`Usuário "${usuario.nome}" adicionado à biblioteca.`);
    }

    async emprestarLivro(titulo: string, usuario: Usuario): Promise<void> {
        console.log(`Enprestando o livro "${titulo}" para ${usuario.nome}.`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        const livro = this.livros.find(l => l.titulo === titulo);
        if (livro) {
            usuario.emprestarLivro(livro);
        } else {
            console.log(`O Livro "${titulo}" não foi encontrado na biblioteca.`);
        }
    }

    async devolverLivro(titulo: string, usuario: Usuario): Promise<void> {
        console.log(`O usuario "${usuario.nome}" devolvel o livro ${titulo} para a biblioteca.`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        const livro = usuario.livrosEmprestados.find(l => l.titulo === titulo);
        if (livro) {
            usuario.devolverLivro(livro);
        } else {
            console.log(`O Livro "${titulo}" não está disponivel para "${usuario.nome}".`);
        }
    }
}

class Usuario{
    public nome:string;
    public livrosEmprestados:Livro[] = [];

    constructor(nome:string){
        this.nome = nome;
    }
    emprestarLivro(livro:Livro){
        if(livro.disponivel){
            livro.disponivel = false;
            this.livrosEmprestados.push(livro)
            console.log(`${this.nome} emtregou o livro "${livro.titulo}".`);
        }else{
            console.log(`O livro "${livro.titulo}" não está disponível.`)
        }
    }
    devolverLivro(livro: Livro){
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

async function main(){
    const biblioteca = new Biblioteca();

const livro1 = new Livro("O principe", "Nicolau maquiavel", true);
const livro2 = new Livro("Noites brancas", "Fiódor Dostoiévski", false);
const livro3 = new Livro("A arte da guerra", "Sun tzu", true);

biblioteca.adicionarLivro(livro1);
biblioteca.adicionarLivro(livro2);
biblioteca.adicionarLivro(livro3);

const user1 = new Usuario("Éden");
biblioteca.adicionarUsuario(user1);

await biblioteca.emprestarLivro("O principe", user1);
await biblioteca.emprestarLivro("Noites brancas", user1);
await biblioteca.emprestarLivro("A arte da guerra", user1);

await biblioteca.devolverLivro("O principe", user1);
await biblioteca.devolverLivro("Noites brancas", user1);
}
main().catch(console.error);