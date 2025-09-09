class Pessoa {
  constructor(numero, ...brinquedos) {
    this.numero = numero;
    this.brinquedos = brinquedos;
    this.adotados = [];
    this.brinquedosGato = new Set(); // gato não divide
    this.gatosAdotados = 0;
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
      } else {
        return false;
      }
    }

    let i = 0;
    //verifica se tem todos os brinquedos e se estão na ordem
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
    if (this.adotados.length >= 3) {
      return false;
    }
    //se esta adotando um gato ou ja adotou um antes
    if (animal.raca === "gato" || this.gatosAdotados != 0) {
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
    this.adotados.push(animal.nome);

    if (animal.raca === "gato") {
      this.gatosAdotados++;
    }

    //adiciona na lista de brinquedosGato
    for (const brinquedoAnimal of animal.brinquedos) {
      this.brinquedosGato.add(brinquedoAnimal);
    }
  }

  //desadota o animal =( é usado apenas caso tente levar o Loco sozinho
  desadotou() {
    //tira do array
    const index = this.adotados.indexOf("Loco");
    if (index !== -1) {
      this.adotados.splice(index, 1);
    }
  }
}

export default Pessoa;
