const displayScore = document.querySelector("#score")
const grid = document.querySelector(".grid")
const scor = document.querySelector("#nam")

let score = 0

const boarWidth = 600
const boarheight = 300

const blockwidth = 100
const blockheigth = 20

// for ball 

let xDirection = 5
let yDirection = 5

// set user 
const users = [230, 10]
let userPosition = users

// set ball
const balls = [240, 30]
let ballsPosition = balls

// setuser
const user = document.createElement('div')
user.classList.add('userCls')
grid.appendChild(user)
drawUser()


/// draw user
function drawUser() {
    user.style.left = `${userPosition[0]}px`
    user.style.bottom = `${userPosition[1]}px`
}


// set balls

const ball = document.createElement('div')
ball.classList.add('ballCls')
grid.appendChild(ball)
drawBall()

function drawBall() {
    ball.style.left = `${ballsPosition[0]}px`
    ball.style.bottom = `${ballsPosition[1]}px`
}


/// set blocks 

class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis]

    }
}


let blocks = [
    new Block(30, 270),
    new Block(140, 270),
    new Block(250, 270),
    new Block(360, 270),
    new Block(470, 270),

    new Block(30, 240),
    new Block(140, 240),
    new Block(250, 240),
    new Block(360, 240),
    new Block(470, 240),

    new Block(30, 210),
    new Block(140, 210),
    new Block(250, 210),
    new Block(360, 210),
    new Block(470, 210)
]

// console.log(blocks.length)


function drawBlocks() {
    for (let i = 0; i < blocks.length; i++) {
        const blockss = document.createElement('div')
        blockss.classList.add('blockCls')
        blockss.style.left = `${blocks[i].bottomLeft[0]}px`
        blockss.style.bottom = `${blocks[i].bottomLeft[1]}px`
        grid.appendChild(blockss)
    }
}

drawBlocks()

// move users

function moveUser(e) {
    switch (e.key) {
        case 'ArrowLeft':
            if (userPosition[0] > 0) {
                userPosition[0] -= 10
                drawUser()
            }
            break;

        case 'ArrowRight':
            if (userPosition[0] < (boarWidth - 100)) {
                userPosition[0] += 10
                drawUser()
            }
            break;
    }
}

document.addEventListener('keydown', moveUser)



/// move ball

function moveBall() {
    ballsPosition[0] += xDirection
    ballsPosition[1] += yDirection
    drawBall()
    checkforCollection()
}

let settime
settime = setInterval(moveBall, 30)



/// check for collection 

function checkforCollection() {
    for (let i = 0; i < blocks.length; i++) {
        if (ballsPosition[0] > blocks[i].bottomLeft[0] &&
            ballsPosition[0] < (blocks[i].bottomLeft[0] + 80) &&
            ballsPosition[1] > blocks[i].bottomLeft[1] &&
            (ballsPosition[1] + 20) < (blocks[i].bottomLeft[1] + 80)
        ) {
            const allblocks = document.querySelectorAll('.blockCls')
            allblocks[i].classList.remove('blockCls')
            blocks.splice(i, 1)
            changeDirection()
            score++
            displayScore.textContent = score
            displayScore.style.color = 'green'



        }
        if (blocks.length == 0) {
            displayScore.textContent = "you win"
            clearInterval(settime)
            document.removeEventListener('keydown', moveUser)
        }
    }

    if (ballsPosition[1] <= 0) {
        // scor.style.display='none'
        // displayScore.innerHTML="you lose"
        // clearInterval(settime)
        // document.removeEventListener('keydown',moveUser)
        changeDirection()


    }

    if (ballsPosition[0] >= (boarWidth - 20) ||
        ballsPosition[0] <= 0 ||
        ballsPosition[1] >= (boarheight - blockheigth)
    ) {
        changeDirection()
    }

    /// user collection  ///

    if (ballsPosition[0] < (userPosition[0] + 100) &&
        ballsPosition[1] < (userPosition[1] + 20)
    ) {
        changeDirection()
    }

}
function changeDirection() {

    if (xDirection == 5 & yDirection == 5) {
        yDirection = -5
        return
    }

    if (xDirection == 5 & yDirection == -5) {
        xDirection = -5
        return
    }
    if (xDirection == -5 & yDirection == -5) {
        yDirection = 5
        return
    }
    if (xDirection == -5 & yDirection == 5) {
        xDirection = 5
        return
    }
}
