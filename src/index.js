import criarAnimais from "../data/animais.js";
import AbrigoAnimais from "./AbrigoAnimais.js";

const animais = criarAnimais();
const abrigo = new AbrigoAnimais(animais);

const resultado = abrigo.encontraPessoas(
  "RATO,BOLA",
  "RATO,NOVELO",
  "Rex,Fofo"
);

console.log("Resultado Final:", resultado);
