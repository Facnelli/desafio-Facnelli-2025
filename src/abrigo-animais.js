import Pessoa from "../src/models/Pessoa.js";
import criarAnimais from "./data/Animais.js";

class AbrigoAnimais {
  //construtor de pessoas
  constructor() {
    this.pessoas = new Map();
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    //cria/reseta os animais para o abrigo
    const Animais = criarAnimais();

    //trata a entrada
    const brinquedos1 = brinquedosPessoa1.split(",");
    const brinquedos2 = brinquedosPessoa2.split(",");
    let nomes = ordemAnimais.split(",");

    console.log(nomes);

    //coloca o loco na segunda posição se ele estiver na primeira
    if (nomes[0] === "Loco" && nomes.length > 1) {
      // troca com o segundo
      [nomes[0], nomes[1]] = [nomes[1], nomes[0]];
    }

    console.log(nomes);
    const ordem = nomes.map((nome) => Animais[nome]);

    //verifica animal válido
    const verificaAnimal = ordem.every((a) => a != null);
    const verificaDuplicado = new Set(nomes).size === nomes.length; //compara tamanho sem repetição com tamanho total
    if (!verificaAnimal || !verificaDuplicado) {
      return { erro: "Animal inválido", lista: null };
    }

    //constroi pessoas
    const pessoa1 = new Pessoa(1, ...brinquedos1);
    const pessoa2 = new Pessoa(2, ...brinquedos2);

    this.pessoas.set(pessoa1.numero, pessoa1);
    this.pessoas.set(pessoa2.numero, pessoa2);

    //para cada bichinho em ordem de animais
    for (const bichinho of ordem) {
      //verifica se pessoa1 pode adotar
      if (pessoa1.temBrinquedo(bichinho) && pessoa1.permitidoAdotar(bichinho)) {
        bichinho.adotar(pessoa1);
        pessoa1.adotou(bichinho);
      }
    }

    //verifica se pessoa2 tem os brinquedos certos
    for (const bichinho of ordem) {
      //verifica se pessoa2 pode adotar
      if (pessoa2.temBrinquedo(bichinho) && pessoa2.permitidoAdotar(bichinho)) {
        //verifica se outra pessoa também pode adotar
        if (bichinho.dono === "abrigo") {
          bichinho.adotar(pessoa2);
          pessoa2.adotou(bichinho);
        } else {
          //volta pro abrigo se duas pessoas poderem adotar
          bichinho.adotar("abrigo"); //tadinho
        }
      }
    }

    //verificação se o Loco está sozinho
    for (const pessoa of [pessoa1, pessoa2]) {
      if (
        pessoa.adotados === 1 &&
        typeof Animais.Loco.dono === "object" &&
        Animais.Loco.dono.numero === pessoa.numero
      ) {
        //volta Loco pro abrigo se a pessoa tentar adotar só ele
        pessoa.desadotou();
        Animais.Loco.adotar("abrigo");
      }
    }

    //cria lista final no formato da saída
    const lista = nomes
      .map((nome) => {
        const a = Animais[nome];
        if (typeof a.dono === "object")
          return `${a.nome} - pessoa ${a.dono.numero}`;
        return `${a.nome} - ${a.dono}`;
      })
      .sort(); //coloca em ordem alfabética para adequar a saída do teste

    const resultado = { erro: false, lista };
    return resultado;
  }
}

export { AbrigoAnimais as AbrigoAnimais };
