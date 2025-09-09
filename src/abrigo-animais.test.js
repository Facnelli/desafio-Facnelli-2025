import { AbrigoAnimais } from "./abrigo-animais";

describe("Abrigo de Animais", () => {
  test("Deve rejeitar animal inválido", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "CAIXA,RATO",
      "RATO,BOLA",
      "Lulu"
    );
    expect(resultado.erro).toBe("Animal inválido");
    expect(resultado.lista).toBeFalsy();
  });

  test("Deve rejeitar animal duplicado", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA",
      "RATO,NOVELO",
      "Rex,Rex"
    );
    expect(resultado.erro).toBe("Animal inválido");
    expect(resultado.lista).toBeFalsy();
  });

  test("Deve encontrar pessoa para um animal", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA",
      "RATO,NOVELO",
      "Rex,Fofo"
    );
    expect(resultado.lista).toEqual(["Fofo - abrigo", "Rex - pessoa 1"]);
    expect(resultado.erro).toBeFalsy();
  });

  test("Deve encontrar pessoa para um animal intercalando brinquedos", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "BOLA,LASER",
      "BOLA,NOVELO,RATO,LASER",
      "Mimi,Fofo,Rex,Bola"
    );
    expect(resultado.lista).toEqual([
      "Bola - abrigo",
      "Fofo - pessoa 2",
      "Mimi - abrigo",
      "Rex - abrigo",
    ]);
    expect(resultado.erro).toBeFalsy();
  });

  test("Gato não divide brinquedos", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "BOLA,RATO,LASER",
      "",
      "Mimi,Fofo"
    );
    expect(resultado.lista).toEqual(["Fofo - abrigo", "Mimi - pessoa 1"]);
  });

  test("Pessoa não pode adotar mais de três animais", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "LASER,SKATE,RATO,BOLA,CAIXA,NOVELO",
      "",
      "Rex,Bola,Loco,Bebe"
    );
    expect(resultado.lista).toEqual([
      "Bebe - abrigo",
      "Bola - pessoa 1",
      "Loco - pessoa 1",
      "Rex - pessoa 1",
    ]);
  });

  test("Dois candidatos aptos -> ninguém leva o animal", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA",
      "RATO,BOLA",
      "Rex"
    );
    expect(resultado.lista[0]).toBe("Rex - abrigo");
  });

  test("Loco é adotado se tem companhia", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,SKATE,BOLA",
      "",
      "Loco,Rex"
    );
    expect(resultado.erro).toBeFalsy();
    expect(resultado.lista).toEqual(["Loco - pessoa 1", "Rex - pessoa 1"]);
  });

  test("Loco não é adotado sozinho", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "SKATE,RATO",
      "",
      "Loco"
    );
    expect(resultado.erro).toBeFalsy();
    expect(resultado.lista).toEqual(["Loco - abrigo"]);
  });

  test("Teste Loco + gato", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "SKATE,RATO,BOLA",
      "",
      "Loco,Zero"
    );
    expect(resultado.erro).toBeFalsy();
    expect(resultado.lista).toEqual(["Loco - abrigo", "Zero - abrigo"]);
  });

  test("Teste gato + Loco", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "SKATE,RATO,BOLA",
      "",
      "Zero,Loco"
    );
    expect(resultado.erro).toBeFalsy();
    expect(resultado.lista).toEqual(["Loco - abrigo", "Zero - pessoa 1"]);
  });
});
