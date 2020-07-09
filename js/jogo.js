let altura = 0
let largura = 0
let vidas = 1

// tempo do jogo
let tempo = 10

let criaMosquitoTempo = 1500

// capturando o que está após o ponto de interrogação no href
// Usando o método replace para substituir o ponto de interrogação por um espaço vazio
let nivel = window.location.search.replace('?', '')
console.log(nivel);

// Ajustando a dificuldade do jogo
if (nivel === 'normal') {
    criaMosquitoTempo = 1500
} else if (nivel === 'dificil') {
    criaMosquitoTempo = 1000
} else if (nivel === 'muito-dificil') {
    criaMosquitoTempo = 750
}

/**
 * Função que ajusta o tamanho da parte utilizavel da tela
 * conforme o usuario ajusta o tamanho da tela do navegador
 */
function ajustaTamanho() {
    //capturando a altura e largura da pagina
    altura = window.innerHeight
    largura = window.innerWidth
    // console.log(altura, largura);
}

ajustaTamanho()

/**
 * Definindo e exibição do cronômetro no jogo
 */
let cronometro = setInterval(() => {
    tempo -= 1

    // Se o tempo chegar a zero, significa que venceu
    if (tempo < 0) {
        clearInterval(cronometro)
        clearInterval(criaMosquito)
        window.location.href = 'vitoria.html'
    } else {
        document.getElementById('cronometro').innerHTML = tempo
    }
}, 1000)

/**
 * Função que gera uma posição randômica na tela utilizavel
 * para inserir um mosquito
 */
function posicaoRandomica() {
    // Remover o mosquito anterior (caso exista)
    if(document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove()

        if (vidas > 3) {
            //interrompe o jogo
            window.location.href = 'game_over.html'
        } else {
            document.getElementById(`v${vidas}`).src = "img/coracao_vazio.png"
            vidas++
        }  
    }

    // Gerando valores aleatorios de posição na tela, considerando o tamanho ajustado da tela 
    // é subtraído 90 deste resultado para poder considerar o tamanho da imagem do mosquito
    let posicaoX = Math.floor(Math.random() * largura) - 90
    let posicaoY = Math.floor(Math.random() * altura) - 90

    // Caso a posição seja menor que zero, recebe zero, para evitar posições negativas e a imagem sair da tela
    posicaoX = posicaoX < 0 ? 0 : posicaoX
    posicaoY = posicaoY < 0 ? 0 : posicaoY

    // console.log(posicaoX, posicaoY);

    // Criando o elemento HTML
    let mosquito = document.createElement('img')
    mosquito.src = 'img/mosquito.png'
    mosquito.className = `${tamanhoAleatorio()} ${ladoAleatorio()}`

    // Definindo a posição do elemento HTML na tela
    mosquito.style.left = `${posicaoX}px`
    mosquito.style.top = `${posicaoY}px`

    // Definindo o position como absolute para utilizar os parametros left e top
    mosquito.style.position = 'absolute'

    // Removendo o mosquito ao clique do mouse
    mosquito.onclick = function() {
        this.remove()
    }

    // Definindo um id para o elemento, para posteriormente removê-lo na proxima iteração
    mosquito.id = 'mosquito'

    // Inserindo o elemento HTML na tela
    document.body.appendChild(mosquito)
}

/**
 * Retorna uma referencia de classe para um tamanho aleatorio do 
 * mosquito na tela
 * 
 * ver o arquivo css/style.css
 */
function tamanhoAleatorio() {
    //gera um numero aleatorio entre 0 e 3
    let classe = Math.floor(Math.random() * 3)

    // Retorna uma classe referente ao tamanho do mosquito indicado no arquivo css
    switch (classe) {
        case 0:
            return 'mosquito1'
        case 1:
            return 'mosquito2'
        case 2:
            return 'mosquito3'    
    }

}

/**
 * Define a geração do mosquito con orientações diferentes horizontalmente no eixo X
 */
function ladoAleatorio() {
    //gera um numero aleatorio entre 0 e 2
    let classe = Math.floor(Math.random() * 2)

    // Retorna uma classe referente à orientação no eixo x do mosquito
    switch (classe) {
        case 0:
            return 'ladoA'
        case 1:
            return 'ladoB'   
    }
}





