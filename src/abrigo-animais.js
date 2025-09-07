class Animal {
  constructor(nome, raca, ...brinquedos) {
    this.nome = nome;
    this.raca = raca;
    this.dono = "abrigo";
    this.brinquedos = brinquedos;
  }
  adotar(dono) {
    this.dono = dono;
  }
}

const Animais = {
  Rex: new Animal("Rex", "cão", "RATO", "BOLA"),
  Mimi: new Animal("Mimi", "gato", "BOLA", "LASER"),
  Fofo: new Animal("Fofo", "gato", "BOLA", "RATO", "LASER"),
  Zero: new Animal("Zero", "gato", "RATO", "BOLA"),
  Bola: new Animal("Bola", "cão", "CAIXA", "NOVELO"),
  Bebe: new Animal("Bebe", "cão", "LASER", "RATO", "BOLA"),
  Loco: new Animal("Loco", "jabuti", "SKATE", "RATO"),
};

class Pessoa {
  constructor(numero, ...brinquedos) {
    this.numero = numero;
    this.brinquedos = brinquedos;
    this.adotados = 0;
    this.brinquedosGato = new Set(); // gato não divide
  }

  temBrinquedo(animal) {
    if (animal.nome === "Loco") {
      if (
        animal.brinquedos.every((brinquedo) =>
          this.brinquedos.includes(brinquedo)
        )
      ) {
        return true;
      }
    }

    let i = 0;

    for (const brinquedo of this.brinquedos) {
      if (brinquedo === animal.brinquedos[i]) {
        i++;

        if (i >= animal.brinquedos.length) {
          return true;
        }
      }
    }

    return false;
  }

  permitidoAdotar(animal) {
    //não pode adotar mais do que três
    if (this.adotados >= 3) {
      return false;
    }
    //se esta adotando um gato ou já adotou um antes
    if (animal.raca === "gato" || this.brinquedosGato.size > 0) {
      //para cada brinquedo do animal verifica se há conflito com algum já adotado
      for (const brinquedo of animal.brinquedos) {
        if (this.brinquedosGato.has(brinquedo)) {
          return false;
        }
      }
    }

    return true;
  }

  adotou(animal) {
    this.adotados++;

    if (animal.raca === "gato") {
      for (const brinquedoAnimal of animal.brinquedos) {
        this.brinquedosGato.add(brinquedoAnimal);
      }
    }
  }

  desadotou() {
    this.adotados--;
  }
}

class AbrigoAnimais {
  //construtor de pessoas
  constructor() {
    this.pessoas = new Map();
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    console.log("=== Entrada ===");
    console.log("Brinquedos Pessoa 1:", brinquedosPessoa1);
    console.log("Brinquedos Pessoa 2:", brinquedosPessoa2);
    console.log("Ordem dos Animais:", ordemAnimais);

    //trata a entrada
    const brinquedos1 = brinquedosPessoa1.split(",");
    const brinquedos2 = brinquedosPessoa2.split(",");
    const nomes = ordemAnimais.split(",");
    const ordem = nomes.map((nome) => Animais[nome]);

    //verifica animal válido
    const verificaAnimal = ordem.every((a) => a != null);
    const verificaDuplicado = new Set(nomes).size === nomes.length; //compara tamanho sem repetição com tamanho total
    if (!verificaAnimal || !verificaDuplicado) {
      console.log("Animal inválido");
      return { erro: "Animal inválido", lista: null };
    }

    //constroi pessoas
    const pessoa1 = new Pessoa(1, ...brinquedos1);
    const pessoa2 = new Pessoa(2, ...brinquedos2);

    this.pessoas.set(pessoa1.numero, pessoa1);
    this.pessoas.set(pessoa2.numero, pessoa2);

    for (const bichinho of ordem) {
      //verifica se a pessoa já adotou o máximo (3)
      if (pessoa1.adotados < 3) {
        //verifica se pessoa1 tem os brinquedos certos na ordem certa
        if (
          pessoa1.temBrinquedo(bichinho) &&
          pessoa1.permitidoAdotar(bichinho)
        ) {
          bichinho.adotar(pessoa1);
          pessoa1.adotou(bichinho);
        }
      }
    }

    //verifica se pessoa2 tem o s brinquedos certos
    for (const bichinho of ordem) {
      //verifica se a pessoa já adotou o máximo (3)
      if (pessoa2.adotados < 3) {
        //verifica se pessoa2 tem os brinquedos certos na ordem certa
        if (
          pessoa2.temBrinquedo(bichinho) &&
          pessoa2.permitidoAdotar(bichinho)
        ) {
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
    }

    //verificação se o Loco está sozinho
    for (const pessoa of [pessoa1, pessoa2]) {
      if (
        pessoa.adotados === 1 &&
        typeof Animais.Loco.dono === "object" &&
        Animais.Loco.dono.numero === pessoa.numero
      ) {
        pessoa.desadotou();
        Animais.Loco.adotar("abrigo");
      }
    }

    const lista = nomes
      .map((nome) => {
        const a = Animais[nome];
        if (typeof a.dono === "object")
          return `${a.nome} - pessoa ${a.dono.numero}`;
        return `${a.nome} - ${a.dono}`;
      })
      .sort(); //coloca em ordem alfabética para adequar a saída do teste

    const resultado = { erro: false, lista };
    // LOG da saída
    console.log("=== Saída ===", resultado);
    return resultado;
  }
}

new AbrigoAnimais().encontraPessoas("RATO,BOLA", "RATO,NOVELO", "Rex,Fofo");

export { AbrigoAnimais as AbrigoAnimais };
