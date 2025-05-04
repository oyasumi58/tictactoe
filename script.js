//board[][] directly references the cell instance inside. btw

function Gameboard() {
    let board = []; //put as array as to create a reference rather than copy of variable??
    let player1Score = 0;
    let player2Score = 0;

    let gameStart = false;
    let midRound = false; //flag for stopping turn display append between rounds

    refresh = function() {
        console.log(`before: ${buttonHandler.eventHandlers.size}`);
        buttonHandler.removeCellEvent();
        console.log(`after: ${buttonHandler.eventHandlers.size}`);
        // board = []; this assigns new array
        board.length = 0; //maintains the reference
        setTimeout(displayController.refreshMarkers,200);
        for (i=0; i <= 2; i++) {
            board[i] = []; //create row array
            for (j=0; j <= 2; j++ ) {
                board[i].push(Cell()); //remove printcell in actual
            }
        } 
        for (i=0; i < 9; i++) {
            buttonHandler.buttons[i].setAttribute("class", "cell taken");
        }
        buttonHandler.newRound.removeAttribute("hidden");
        buttonHandler.endGame.removeAttribute("hidden");
        displayController.refreshDisplay();
        midRound = true;
        console.log(`refreshed`);
        console.log(board);
    }
    start = function() {
        for (i=0; i <= 2; i++) {
            board[i] = []; //create row array
            for (j=0; j <= 2; j++ ) {
                board[i].push(Cell()); //remove printcell in actual
            }
        } 
        for (i=0; i < 9; i++) {
            buttonHandler.buttons[i].setAttribute("class", "cell taken");
        }
    }

    place = function(row,column) {
        if (typeof board[row -1][column -1] === "string") {
            console.log('space taken already');
            return ;
        }

        //console.log(board[row -1][column -1].getMark())
        board[row -1][column -1] = board[row -1][column -1].getMark();
        console.log(`Placed at Row ${row} Column ${column}`)
        
        console.log(board);
        appendMarkers(row,column);
        PController.switchCurrentPlayer();
        resultCheck();//>refresh > stuff
        if (midRound === false) {
            displayController.appendStats(); 
        }
        displayController.appendScore();
        }

    printGame = function() {
        // let dispBoard = [];
        // for (i=0; i <= 2; i++) {
        //     dispBoard[i] = []; //row
        //     for (j=0; j <= 2; j++ ) {
        //         if (typeof board[i][j] === "object") {
        //             dispCell = null;
        //         } else if (typeof board[i][j] === "string") {
        //             dispCell = board[i][j];
        //         } else {
        //             console.log("printGame error");
        //         }
        //         //dispCell = board[i][j].getMark(); //works cus you are accessing this specific element which is the cell object
        //         dispBoard[i].push(dispCell);
        //     }
        // }
        console.log(board);
        //console.log(dispBoard);
    }

    newGame = function() {
        // refresh();
        // gameStart = true;
        let p1N = prompt("Player 1 Name");
        let p2N = prompt("Player 2 Name");
        if (p1N !== null && p2N !== null && p1N !== p2N) {
            PController.setPlayers(`${p1N}`,`${p2N}`);
            gameStart = true;
            //console.log(`Gamestart is ${gameStart} here`);
            //buttonHandler.cell();
            for (i=0;i<9;i++) {
                buttonHandler.buttons[i].removeAttribute("class");
                buttonHandler.buttons[i].setAttribute("class", "cell");
            }
            getGameStart();
            displayController.appendStats();
            buttonHandler.startButton.setAttribute("hidden","");
        } else {
            alert("Failed, Try Again");
        }
    }

    newRound = function() {
        buttonHandler.newRound.setAttribute("hidden","");
        buttonHandler.endGame.setAttribute("hidden","");
        buttonHandler.cell();
        PController.resetCurrentPlayer();
        midRound = false;
        displayController.appendStats();
        for (i=0; i < 9; i++) {
            buttonHandler.buttons[i].setAttribute("class", "cell");
        }
    }

    endGame = function() {
        gameStart = false;
        buttonHandler.startButton.removeAttribute("hidden");
        buttonHandler.newRound.setAttribute("hidden","");
        buttonHandler.endGame.setAttribute("hidden","");
        //call up some modal to display winner.
        //modal shld have button to actually refresh
    }

    resultCheck = function() { //pass in board to access current board, not []
        let stringCount = 0;
        //console.log(board);
        for (i=0; i <= 2; i++) { 
            let checkP1WinHori = board[i].every(element => element === "x");
            let checkP2WinHori = board[i].every(element => element === "o");
            if (checkP1WinHori === true) {
                console.log("P1 WIN HORI");
                displayResult("P1Win");
                Game.score("player1");
                refresh();
            } else if (checkP2WinHori === true) {
                console.log("P2 WIN HORI");
                displayResult("P2Win");
                Game.score("player2");
                refresh();
            } else if (board[i].every(element => typeof element === "string")) {
                stringCount += 1; //to prepare draw
            }
        }

        if ((board[0][0] === board[1][0] && board [0][0] === board[2][0]  && board[0][0] === "x") || (board[0][1] === board[1][1] && board [0][1] === board[2][1] && board[0][1] === "x") || (board[0][2] === board[1][2] && board[0][2] === board[2][2] && board[0][2] === "x")) {
            console.log("P1 WIN VERT");
            displayResult("P1Win");
            Game.score("player1");
            refresh();
        } else if ((board[0][0] === board[1][0] && board [0][0] === board[2][0]  && board[0][0] === "o") || (board[0][1] === board[1][1] && board [0][1] === board[2][1] && board[0][1] === "o") || (board[0][2] === board[1][2] && board[0][2] === board[2][2] && board[0][2] === "o")) {
            console.log("P2 WIN VERT");
            displayResult("P2Win");
            Game.score("player2");
            refresh();
        } else if ((board[0][0] === board[1][1] && board [0][0] === board[2][2] && board[0][0] === "x") || (board[0][2] === board[1][1] && board [0][2] === board[2][0] && board[2][0] === "x")) {
            console.log("P1 WIN DIAG");
            displayResult("P1Win");
            Game.score("player1");
            refresh();
        } else if ((board[0][0] === board[1][1] && board [0][0] === board[2][2] && board[0][0] === "o") || (board[0][2] === board[1][1] && board [0][2] === board[2][0] && board[2][0] === "o")) {
            console.log("P2 WIN DIAG");
            displayResult("P2Win");
            Game.score("player2");
            refresh();
        } else if (stringCount === 3) {
            console.log("Draw");
            displayResult("Draw");
            refresh();

        } else {
            console.log("continue");
        }

        stringCount = 0;
    }

    score = function(playerWon) {
        if (playerWon === "player1") {
            return PController.getPlayer1().score += 1;
        } else if (playerWon === "player2") {
            return PController.getPlayer2().score += 1;
        } else {
            console.log("score error");
        }
    }

    getGameStart = function() {
        console.log(`Gamestart is ${gameStart}`)
        return gameStart;
    }
    return {newRound,endGame,start,score,newGame,getGameStart,board,refresh,printGame,place,resultCheck,player1Score,player2Score};
}



function Cell() { //cell factory
    let cellState //private variable
    
    const setMark = function(marker) { //for console setting
        return cellState = marker;
        //console.log(cellState);
    }

    const getMark = function() {
        cellState = PController.passMark();
        //console.log(cellState)
        return `${cellState}`;
    }

    return {setMark,getMark};
}

function Player(name,marker) { //player object factory
    this.name = name;
    this.marker = marker;
    this.score = 0;
    printPlayer = function() {
        console.log(`Name: ${name}, Marker: ${marker}`);
    }
    return {name,marker,score,printPlayer};
}

const PController = (function () { //IIFE
    let currentPlayer;
    setPlayers = function(name1,name2) {
        player1 = Player(name1,"x");
        player2 = Player(name2,"o");
        let players = [player1,player2];
        player1.printPlayer();
        player2.printPlayer();
        currentPlayer = player1; //to make sure it remembers
        return `Current player is ${currentPlayer.name}`;
    }

    resetCurrentPlayer = function() {
        let number = Math.random()*100;
        //console.log(number);
        if (number <= 50) {
            currentPlayer = player1;
        } else {
            currentPlayer = player2;
        }
        return currentPlayer;
    }

    switchCurrentPlayer = function() {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        console.log(`Current player is ${currentPlayer.name}`);
        return currentPlayer;
    }

    passMark = function() {
        console.log(currentPlayer.marker);
        return getCurrentPlayer().marker;
    }


    getCurrentPlayer = function() {
        return currentPlayer;
    }

    getPlayer1 = function() {
        return player1;
    }

    getPlayer2 = function() {
        return player2;
    }
    return {resetCurrentPlayer,getPlayer1, getPlayer2, setPlayers,switchCurrentPlayer,passMark,getCurrentPlayer};
})();


PController.setPlayers("Empty","Empty");
// PController.switchCurrentPlayer();
// PController.switchCurrentPlayer();


//DOM stuff
displayController = (function() {
    const stats = document.querySelector(".stats");
    const container = document.querySelector("#container");
    getContainer = function() {
        return container;
    }
    const buttons = Array.from(document.querySelectorAll(".cell"));

//Stats
    const turnNode = document.createElement("div");
    const scoreNode1 = document.createElement("div");
    const scoreNode2 = document.createElement("div");
    const playerMarker = document.querySelector(".playerMarker");

    refreshDisplay = function() {
        console.log(container);
        container.removeAttribute("class");
        console.log(container);
        container.setAttribute("class","inactive");
        console.log(container);
    }
    

    appendStats = function() {
        //stats stuff
        if (Game.getGameStart() === true) {
            //console.log("AFKJGFhjfgj");
            turnNode.textContent = `Turn: ${PController.getCurrentPlayer().name}`;
            if (PController.getCurrentPlayer().marker === "x") {
                console.log(`p1`);
                container.removeAttribute("class");
                container.setAttribute("class","player1");
            
            } else if (PController.getCurrentPlayer().marker === "o") {
                console.log(`p2`);
                container.removeAttribute("class");
                container.setAttribute("class","player2");
            }  
        } else {
            turnNode.textContent = `Begin the game!`;
        }
        //button stuff
        for (i = 0; i < 9; i++) {
            if (buttons[i].textContent) {
                buttons[i].setAttribute("class","cell taken");
            }
        }
        // console.log(playerMarker);
        if (PController.getPlayer1().name !== "Empty" && PController.getPlayer2().name !== "Empty") {
            playerMarker.textContent = `${PController.getPlayer1().name}: X | ${PController.getPlayer2().name}: O`;
        } else {
            playerMarker.textContent = "Set player names to begin";
        }
    }

    appendScore = function() {
        scoreNode1.textContent = `${player1.name}'s Score: ${player1.score}`;
        scoreNode2.textContent = `${player2.name}'s Score: ${player2.score}`;
    }
    
    stats.appendChild(turnNode);
    stats.appendChild(scoreNode1);
    stats.appendChild(scoreNode2);
    
    appendMarkers = function(row,column) {
        for (i = 0; i < 9; i++) {
            //console.log(buttons[i]);
            let buttonRow = Number(buttons[i].getAttribute("data-row"));
            let buttonCol = Number(buttons[i].getAttribute("data-column"));
            //console.log(`BUTTON: Row ${buttonRow} and Column ${buttonCol}, Cell: Row ${row} and Column ${column}`)
            //let currentPlayer = PController.getCurrentPlayer();
            //console.log(currentPlayer.marker);
            if (buttonRow === row && buttonCol === column) {
                //console.log(`Row ${buttonRow} and Column ${buttonCol} match`);
                let currentPlayer = PController.getCurrentPlayer();
                
                buttons[i].textContent = currentPlayer.marker;
            }
        }
    }

    refreshMarkers = function() {
        for (i = 0; i < 9; i++) {
            buttons[i].textContent = "";
        }
    }
    
    displayResult = function (result) {
        const title = document.querySelector("h1");

        switch (result) {
            case "P1Win":
                title.textContent = `Round Over! ${PController.getPlayer1().name} Wins!`;
                break;
            
            case "P2Win":
                title.textContent = `Round Over! ${PController.getPlayer2().name} Wins!`;
                break;
            
            case "Draw":
                title.textContent = `Round Over! It's a Tie!`;
                break;

            default:
                console.log("display result error");
                break;
        }
    }

    return {getContainer,refreshDisplay,refreshMarkers,buttons,appendStats,appendMarkers, appendScore,displayResult}
})();

buttonHandler = (function addButtonEvent() {
    const buttons = Array.from(document.querySelectorAll(".cell"));  
    const eventHandlers = new Map();

    getButtonsEvent = function() {
        return buttons.some(btn => typeof btn.onclick === "function");
    }

    cell = function() {
        console.log("got new events");
        for (let i = 0; i < 9; i++) {
            let buttonRow = Number(buttons[i].getAttribute("data-row"));
            let buttonCol = Number(buttons[i].getAttribute("data-column"));
            //console.log(buttonRow);
            const eventHandler = createHandler(buttonRow,buttonCol);
            buttons[i].addEventListener("click", eventHandler)
            eventHandlers.set(buttons[i], eventHandler);
        }
        console.log(eventHandlers);
        return eventHandlers;
    }

    function createHandler(buttonRow,buttonCol) {
        return function(e) {
                let targetButton = e.target;
                Game.place(buttonRow,buttonCol);
                console.log(`Placed at Row ${buttonRow} Column ${buttonCol}`);
        }
    }

    removeCellEvent = function() {
        for (let i = 0; i < 2; i++) {
            console.log(eventHandlers.size);
                for (let [button, eventHandler] of eventHandlers) {
                    button.removeEventListener("click", eventHandler);
                } 
            if (eventHandlers.size < 0) {
                    break; 
            }
            eventHandlers.clear();
        }
    }

    const startButton = document.querySelector("#startGame");
    const newRound = document.querySelector("#startRound");
    const endGame = document.querySelector("#endGame");
    begin = function() {
        startButton.addEventListener("click", () => {
            Game.newGame();
            cell();
        })
        newRound.addEventListener("click", () => {
            Game.newRound();
        })
        endGame.addEventListener("click", () => {
            Game.endGame();
        })
    }

    return {newRound,endGame,startButton,buttons,eventHandlers,getButtonsEvent,removeCellEvent,begin,cell};
})();

const Game = Gameboard();
displayController.appendStats();
buttonHandler.begin();
Game.start();
// buttonHandler.cell();

// Game.newGame();
