class Pessoa {
  constructor(numero, ...brinquedos) {
    this.numero = numero;
    this.brinquedos = brinquedos;
    this.adotados = 0;
    this.brinquedosGato = new Set(); // gato não divide
  }

  temBrinquedo(animal) {
    //caso especial do Loco
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

        if (i === animal.brinquedos.length) {
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

export default Pessoa;
