class Animal {
  //cria o animal
  constructor(nome, raca, ...brinquedos) {
    this.nome = nome;
    this.raca = raca;
    this.dono = "abrigo";
    this.brinquedos = brinquedos;
  }
  //relaciona o animal ao novo dono
  adotar(dono) {
    this.dono = dono;
  }
}

export default Animal;
