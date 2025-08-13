const html = document.querySelector("html");
const btnFoco = document.querySelector(".app__card-button--foco");
const btnDescansoCurto = document.querySelector(".app__card-button--curto");
const btnDescansoLongo = document.querySelector(".app__card-button--longo");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const banner = document.querySelector(".app__image");
const musicaFocoInput = document.querySelector("#alternar-musica");
const musica = new Audio("/sons/luna-rise-part-one.mp3");
const musicaPlay = new Audio("/sons/play.wav");
const musicaPaused = new Audio("/sons/pause.mp3");
const musicaFim = new Audio("/sons/beep.mp3");
const startPauseBt = document.querySelector("#start-pause");
const nameButton = document.querySelector("#start-pause span");
const iconeBtn = document.querySelector(".app__card-primary-butto-icon");
const tempoNaTela = document.querySelector("#timer");
console.log(iconeBtn);
musica.loop = true;

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musicaFocoInput.addEventListener("change", () => {
  if (musica.paused) {
    console.log;
    musica.play();
  } else {
    musica.pause();
  }
});

btnFoco.addEventListener("click", () => {
  alterarContexto("foco");
  tempoDecorridoEmSegundos = 1500;
  btnFoco.classList.add("active");
});
btnDescansoCurto.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 300;
  alterarContexto("descanso-curto");
  btnDescansoCurto.classList.add("active");
});
btnDescansoLongo.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 900;
  alterarContexto("descanso-longo");
  btnDescansoLongo.classList.add("active");
});
function alterarContexto(contexto) {
  mostrarTempo();
  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `/imagens/${contexto}.png`);
  botoes.forEach((contexto) => {
    contexto.classList.remove("active");
  });

  switch (contexto) {
    case "foco":
      titulo.innerHTML = `
          Otimize sua produtividade,<br />
          <strong class="app__title-strong">mergulhe no que importa.</strong>
      `;
      break;
    case "descanso-curto":
      titulo.innerHTML = `
          Que tal dar uma respirada?<br />
          <strong class="app__title-strong">Faça uma pausa curta!</strong>
      `;
      break;
    case "descanso-longo":
      titulo.innerHTML = `
          Hora de voltar à superfície.<br />
          <strong class="app__title-strong">Faça uma pausa longa.</strong>
      `;
      break;
    default:
      break;
  }
}

const contagemRegressiva = () => {
  if (tempoDecorridoEmSegundos <= 0) {
    musicaFim.play();
    alert("Tempo finalizado");
    zerar();
    return;
  }
  tempoDecorridoEmSegundos -= 1;
  mostrarTempo();
};
startPauseBt.addEventListener("click", iniciarOuPausar);
function iniciarOuPausar() {
  if (intervaloId) {
    musicaPaused.play();
    zerar();
    return;
  }
  musicaPlay.play();
  nameButton.textContent = "Pausar";
  iconeBtn.setAttribute("src", "/imagens/pause.png");
  intervaloId = setInterval(contagemRegressiva, 1000);
}
function zerar() {
  clearInterval(intervaloId);
  iconeBtn.setAttribute("src", "/imagens/play_arrow.png");
  nameButton.textContent = "Começar";
  intervaloId = null;
  return;
}

function mostrarTempo() {
  const tempo = new Date(tempoDecorridoEmSegundos * 1000);
  const tempoFormatado = tempo.toLocaleTimeString("pt-Br", {
    minute: "2-digit",
    second: "2-digit",
  });
  tempoNaTela.innerHTML = `${tempoFormatado}`;
}
mostrarTempo();
