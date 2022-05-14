

let deck = [];
const tipos = [ 'C', 'D', 'S', 'H' ];
const letras = [ 'J', 'Q', 'K', 'A' ];

let puntosJugador = 0,
    puntosComputadora = 0;

const btnPedirCarta = document.querySelector( '#btnPedirCarta' );
const btnDetener = document.querySelector( '#btnDetener' );
const btnNuevoJuego = document.querySelector( '#btnNuevoJuego' );

const divCartasJugador = document.querySelector( '#jugador-cartas' );
const divCartasComputadora = document.querySelector( '#computadora-cartas' );

const puntosHTML = document.querySelectorAll('small');

//fxpara crear deck

const crearDeck = () => {

    for ( let i = 2; i <= 10; i++ ){
       
        for ( tipo of tipos ){
            deck.push( i + tipo );
        }
    }

    for ( letra of letras ){
        for ( tipo of tipos ){
            deck.push( letra + tipo );
        }
    }
    
    deck = _.shuffle( deck );
    console.log( deck );
    
    return deck;
};

crearDeck();


//funcion para pedir carta


const pedirCarta = ()=>{
    
    if (deck.length === 0) {
        throw('No hay cartas');
    } else {
        let carta = deck.pop();
        return carta; 
    }
  
}

pedirCarta();


//funcion para calcular puntos

const valorCarta = ( carta )=>{

    const valor = carta.substring(0, carta.length - 1);

    return ( isNaN( valor ) ?
                (valor === 'A') ? 11 : 10
                : valor * 1)

}


//turno pc

const turnoComputadora = ( puntosMinimos )=>{

    do {
        const carta = pedirCarta();
    
        puntosComputadora += valorCarta( carta );
        puntosHTML[1].innerText = puntosComputadora;
    
        const imgCarta = document.createElement( 'img' );
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add( 'carta' );
    
        divCartasComputadora.append( imgCarta );

        if ( puntosJugador > 21 ){
            break;
       } }

       while ( (puntosComputadora<puntosMinimos) && (puntosMinimos <= 21) );


       setTimeout( ()=>{ 
           
            if ( puntosComputadora === puntosMinimos ){
                alert( 'Empate' )
                } else if (puntosMinimos > 21) { 
                alert( 'Computadora gana' )
                } else if ( puntosComputadora > 21 ){
                alert( 'Jugador gana' )
                } else {
                alert( 'Computadora gana' )
                }
        }, 1000);
}


//eventos

btnPedirCarta.addEventListener( 'click', ()=>{ 

    const carta = pedirCarta();
    
    puntosJugador += valorCarta( carta );
    puntosHTML[0].innerText = puntosJugador;

    const imgCarta = document.createElement( 'img' );
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add( 'carta' );

    divCartasJugador.append( imgCarta );

    if ( puntosJugador > 21 ){
        console.log( 'Perdiste' );
        btnPedirCarta.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    } else if ( puntosJugador === 21){
        console.log( 'Ganaste' );
        btnPedirCarta.disabled = true;
        turnoComputadora(puntosJugador);
    }

});

btnDetener.addEventListener( 'click', ()=>{ 
    
    btnPedirCarta.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador)})


btnNuevoJuego.addEventListener( 'click', ()=>{

    deck = [];
    deck = crearDeck();
    
    puntosJugador = 0;
    puntosComputadora = 0;
    
    puntosHTML[0].innerText= 0;
    puntosHTML[1].innerText = 0;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';

    btnDetener.disabled = false;
    btnPedirCarta.disabled = false;
    
})