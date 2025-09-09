//Arquivo de teste manual
//roda com "node teste-manual.js"

import criarAnimais from "./data/Animais.js";
import { AbrigoAnimais } from "./abrigo-animais.js";

const animais = criarAnimais();
const abrigo = new AbrigoAnimais(animais);

//cenário para o teste
const resultado = abrigo.encontraPessoas("RATO,BOLA", "RATO,NOVELO", "Rex,Fof");

console.log("Resultado Final:", resultado);
