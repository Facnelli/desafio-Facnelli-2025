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

    const ordem = nomes.map((nome) => Animais[nome]);

    //verifica animal válido
    const verificaAnimal = ordem.every((a) => a != null);
    const verificaDuplicado = new Set(nomes).size === nomes.length;
    if (!verificaAnimal || !verificaDuplicado) {
      return { erro: "Animal inválido", lista: null };
    }

    //constroi pessoas
    const pessoas = [
      new Pessoa(1, ...brinquedos1),
      new Pessoa(2, ...brinquedos2),
    ];

    for (const pessoa of pessoas) {
      //verifica se tem os brinquedos certos
      for (const bichinho of ordem) {
        //verifica se pode adotar
        if (pessoa.temBrinquedo(bichinho) && pessoa.permitidoAdotar(bichinho)) {
          //verifica se outra pessoa tambem pode adotar
          if (bichinho.dono === "abrigo") {
            bichinho.adotar(pessoa);
            pessoa.adotou(bichinho);
          } else {
            //volta pro abrigo se duas pessoas poderem adotar
            bichinho.dono.desadotou(bichinho.nome);
            bichinho.adotar("abrigo"); //tadinho
          }
        }
      }
    }

    //verificação do Loco sozinho
    for (const pessoa of pessoas) {
      if (pessoa.adotados.length === 1 && pessoa.adotados[0] === "Loco") {
        pessoa.desadotou("Loco");
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
      .sort(); //coloca em ordem alfabética

    const resultado = { erro: false, lista };
    return resultado;
  }
}

export { AbrigoAnimais as AbrigoAnimais };
