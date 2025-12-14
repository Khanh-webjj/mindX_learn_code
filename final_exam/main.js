// array lưu trữ trạng thái của từng cell trong bảng
let startingState = ["","","","","","","","",""]; 
let boardState = startingState;
let players = ["X","O"];
let indexCurrentPlayer = 0;
let currentPlayer = players[indexCurrentPlayer];
let gameActive = false;

// Khai báo các phần tử html
const cells = document.querySelectorAll('.cell')
const playerTurn = document.getElementById('turned-player')
const gameTitle = document.getElementById('game-title')
const startBtn = document.getElementById('start-btn')
const playAgainBtn = document.getElementById('play-again-btn')

// Các điều kiện thắng
const winningCondition = [
    [0, 1, 2], // Hàng ngang
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // Hàng dọc
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // Đường chéo
    [2, 4, 6]
]

// starting-game function
const startGame = ()=>{
    if (gameActive) {
        return; // nếu đang chơi thì không kích hoạt hàm
    }

    gameActive = true;
    gameTitle.textContent = "Hãy chiến đấu hết mình!"
    playerTurn.textContent = currentPlayer

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
        cell.classList.remove('disabled');
    });

    // disable start button, enable play-again button
    startBtn.disabled = true
    playAgainBtn.disabled = false
}

// hàm xử lý click vào ô cờ
function handleCellClick(clickedCellEvent){
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    // Kiểm tra: trò chơi phải đang hoạt động và ô đó phải trống
    if (boardState[clickedCellIndex] !== "" || !gameActive){
        return;
    }

    // cập nhật trạng thái và giao diện
    boardState[clickedCellIndex] = currentPlayer;
    
    // Kiểm tra kết quả sau khi đánh
    handleResultValidation();
}

// Hàm kiểm tra kết quả Thắng / Hòa 
function handleResultValidation() {
    let roundWon = false;
    let winningCombo = null;

    for (let i = 0; i < winningCondition.length; i++){
        const winCondition = winningCondition[i]
        let a = boardState[winCondition[0]]
        let b = boardState[winCondition[1]]
        let c = boardState[winCondition[2]]

        // Bỏ theo bất kỳ ô nào còn trống
        if (a=="" || b=="" || c==""){
            continue
        }
        // Kiểm tra 3 ô có giống nhau không
        if (a==b && b==c){
            roundWon = true;
            winningCombo = winCondition;
            break;
        }
    }

    if (roundWon) {
        gameTitle.textContent = `Người chơi ${currentPlayer} đã chiến thắng!\nBấm chơi để lại bắt đầu lại!`
        gameActive = false;

        // Highlight các ô thắng
        winningCombo.forEach(index => {
            cells[index].classList.add('winning-cell')
        })
        return;
    }

    // Kiểm tra Hòa (Tất cả ô đều được đánh và không ai thắng)
    let roundDraw = !boardState.includes("");
    if (roundDraw) {
        gameTitle.textContent = 'Chưa có người chiến thắng!\nBấm chơi lại để bắt đầu lại!'
        gameActive = false;
        return;
    }

    // Nếu chưa thắng hoặc hòa thì chuyển người chơi
    changePlayer();
}

function changePlayer() {
    indexCurrentPlayer = (indexCurrentPlayer+1 < players.length) ? (indexCurrentPlayer+1) : 0 ;
    currentPlayer = players[indexCurrentPlayer];
    playerTurn.textContent = currentPlayer;
}

// Hàm chơi lại (Play-Again/Reset)
function restartGame(){
    // Reset biến trạng thái
    boardState = startingState;
    currentPlayer = players[0];
    gameActive = false; //Thiết lập trạng thái ban đầu

    // cập nhật giao diện
    gam
}