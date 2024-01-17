const grigliaHtml = document.getElementById('griglia')
const play = document.getElementById('play');
const selectDifficolta = document.getElementById('difficolta');


play.addEventListener('click', function () {

    //dichiaro e azzero l'array prima di iniziare
    let numbers = []

    //pulisco la griglia prima di generarne una nuova
    grigliaHtml.innerHTML = "";
    
    //SECTION Scelta difficoltà
    const difficolta = selectDifficolta.value;
    var righe, colonne;

    switch (difficolta){
        case 'easy':
            righe = 10;
            colonne = 10;
            break;
        case 'medium':
            righe = 9;
            colonne = 9;
            break;
        case 'hard':
            righe = 7;
            colonne = 7;
            break;
    }

    //SECTION bomb generator
    const bombArray = [];

    while (bombArray.length < 16) {
        const bombNumber = getRandomNumber(1, righe * colonne);

        if (!bombArray.includes(bombNumber)) {
            bombArray.push(bombNumber);
        }
    }

    //stampa in console dei numeri-bomba
    console.log(bombArray);

    //SECTION generazione griglia
    for(let i=1; i<= (righe*colonne); i++ ){
        
        //carico i numeri nell'array
        numbers.push(i)

        //creazione cella
        let box = document.createElement("div")

        //NOTE Dimensioni griglia in base alla difficoltà
        if (righe===10 && colonne===10){
            box.classList.toggle("box-easy")
        }else if(righe===9 && colonne===9){
            box.classList.toggle("box-medium")
        }else if(righe===7 && colonne===7){
            box.classList.toggle("box-hard")
        }
     
        //Creazione sotto-cella per dare meglio lo stile
        let numeroSpan = document.createElement("span");

        //inserimento numero cella
        numeroSpan.innerHTML = i;

        // Aggiunta dello span alla cella
        box.appendChild(numeroSpan);
        
        //inserisco il tutto nella griglia
        grigliaHtml.append(box)

        //NOTE Cambio colore al click, controllo bombe e somma punti
        var counter=0;
        var gameOverFlag = false;
        var clickedBox = [];

        box.addEventListener('click', function (){
            //Se il gioco è già finito, non ricomincia
            if (gameOverFlag) {
            return;
            }

            //NOTE cambio colore cella, blocco del click, segnapunti e condizioni di game over
            if(bombArray.includes(numbers[i-1])){
                box.classList.add("gameOver")
                gameOverFlag = true;
                console.log('Cella cliccata:'+ numbers[i-1]);
                console.log('Punteggio finale: ' + counter)
                console.log('GAME OVER')
                alert('game over')
            }else if(!clickedBox.includes(numbers[i - 1])){
                box.classList.add("active")
                counter++;
                clickedBox.push(numbers[i - 1]);
                console.log('Cella cliccata:'+ numbers[i-1]);
                console.log('Punteggio attuale:' + counter)
            }

            //alert in caso di vittoria
            if(counter===(righe*colonne)-16){
            alert('YOU WIN')
            }
        })
    }
})

//NOTE Random Number function
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}