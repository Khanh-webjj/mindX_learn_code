// array lưu trữ trạng thái của từng cell trong bảng
let startingState = ["","","","","","","","",""]; 
let boardState = [...startingState];
let players = ["X","O"];
let indexCurrentPlayer = 0;
let currentPlayer = players[indexCurrentPlayer];
let gameActive = false;

// Khai báo các phần tử html
const cells = document.querySelectorAll('.cell');
const playerTurn = document.getElementById('turned-player');
const gameTitle = document.getElementById('game-title');
const startBtn = document.getElementById('start-btn');
const playAgainBtn = document.getElementById('play-again-btn');

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

//Định nghĩa đường dẫn hình ảnh (thay thế cho đường dẫn thực tế)
const imagePaths = {
    "X": "./asset/x.png",
    "O": "./asset/o.png"
}

// Hàm tạo HTML cho thẻ <image>
function getPlayerImageHtml(player) {
    const src = imagePaths[player];
    // Sử dụng thẻ <img> trong innerHTML
    return `<img src=${src} alt=${player} loading="lazy">`;
}

// starting-game function
const startGame = ()=>{
    if (gameActive) {
        return; // nếu đang chơi thì không kích hoạt hàm
    }

    console.log('start game')

    gameActive = true;
    gameTitle.textContent = "Hãy chiến đấu hết mình!"
    playerTurn.textContent = currentPlayer

    cells.forEach(cell => {
        console.log(`loading cell ${cell.getAttribute('data-index')}`)
        cell.addEventListener('click', handleCellClick);
        cell.classList.remove('disabled');
    });

    // disable start button, enable play-again button
    startBtn.disabled = true
    playAgainBtn.disabled = false
}

// hàm xử lý click vào ô cờ
function handleCellClick(clickedCellEvent){
    console.log("cell clicked");

    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    // Kiểm tra: trò chơi phải đang hoạt động và ô đó phải trống
    if (boardState[clickedCellIndex] !== "" || !gameActive){
        return;
    }

    console.log('click accepted')
    // cập nhật trạng thái và giao diện
    boardState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = getPlayerImageHtml(currentPlayer);
    
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
    boardState = [...startingState];
    currentPlayer = players[0];
    gameActive = false; //Thiết lập trạng thái ban đầu

    // cập nhật giao diện
    gameTitle.textContent = "Hãy chiến đấu hết mình!"
    playerTurn.textContent = currentPlayer;

    // Xóa nội dung và hiệu ứng trên các ô
    cells.forEach(cell => {
        cell.innerHTML = "";
        cell.classList.remove('winning-cell');
        cell.classList.add('disabled');
        cell.removeEventListener('click', handleCellClick)
    });

    //start new game
    startGame();
}

// Gắn event cho 2 nút
startBtn.addEventListener('click', startGame)
playAgainBtn.addEventListener('click', restartGame)

// Tải trang: vô hiệu hóa ô cờ ngay từ đầu
cells.forEach(cell => cell.classList.add('disabled'));
playAgainBtn.disabled = true; // đảm bảo nút chơi lại bị vô hiệu hóa khi mới tải