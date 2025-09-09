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

export default Animal;
