class Animal {
  constructor(nome, raca, ...brinquedos) {
    this.nome = nome;
    this.raca = raca;
    this.brinquedos = brinquedos;
  }
}

const Animais = [
  new Animal("Rex", "cão", "RATO", "BOLA"),
  new Animal("Mimi", "gato", "BOLA", "LASER"),
  new Animal("Fofo", "gato", "BOLA", "RATO", "LASER"),
  new Animal("Zero", "gato", "RATO", "BOLA"),
  new Animal("Bola", "cão", "CAIXA", "NOVELO"),
  new Animal("Bebe", "cão", "LASER", "RATO", "BOLA"),
  new Animal("Loco", "jabuti", "SKATE", "RATO"),
];

class AbrigoAnimais {
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {}
}

export { AbrigoAnimais as AbrigoAnimais };
