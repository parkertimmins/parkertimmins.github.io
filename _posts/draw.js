

const canvas = document.getElementById("canvas")

canvas.height = 800
canvas.width = 800

const ctx = canvas.getContext("2d");


const xMin = -12
const xMax = 12
const yMin = -12
const yMax = 12


function drawAxes() {
    // background
    ctx.fillStyle = "#263645";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    drawLine([0, yMin], [0, yMax], 1.5, {color: 'floralwhite'}) // x axis
    drawLine([xMin, 0], [xMax, 0], 1.5, {color: 'floralwhite'}) // y axis

    // minor x axes
    for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++)
        drawLine([x, yMin], [x, yMax], 0.4, {color:'floralwhite'})

    // minor y axes
    for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++)
        drawLine([xMin, y], [xMax, y], 0.4, {color:'floralwhite'})
}

let [a, b] = [3, 4]
let [c, d] = [2, 1]

drawCanvas();

// 3.1 => [1, 1, 1, 0.1] ; -2.5 => [-1, -1, -0.5]
function increments(a) {
    const aAbs = Math.abs(a)
    return Array(Math.floor(aAbs))
        .fill(1)
        .concat(aAbs % 1)
        .map(i => i * (a > 0 ? 1 : -1))
}

// repeat c+di a+bi times
function drawRepeatedTriangles(color) {
    let [x, y] = [0, 0] 
    const style = {color, lineDash: [3, 3]}
    increments(a).forEach((aInc) => {
        const nextX = x + c * aInc
        const nextY = y + d * aInc
        drawLine([x, y], [nextX, y], 3, style) // horizontal
        drawLine([nextX, y], [nextX, nextY], 3, style); // vertical
        [x, y] = [nextX, nextY]
    })

    increments(b).forEach((bInc) => {
        // for non-integer b's, need to handle smaller last triangle
        const nextX = x - d * bInc
        const nextY = y + c * bInc
        drawLine([x, y], [x, nextY], 3, style) // horizontal
        drawLine([x, nextY], [nextX, nextY], 3, style); // vertical 
        [x, y] = [nextX, nextY]
    })
}

function drawCanvas() {
    clear();
    drawAxes();
    
    const product = [a * c - b * d, a * d + b * c]

    abColor = 'coral'
    cdColor = 'chartreuse'
    drawRepeatedTriangles(cdColor);

    // draw expanded a+bi
    drawLine([0, 0], [a * c, a * d], 3, {color: abColor, lineDash: [3, 3]}) 
    drawLine([a * c, a * d], product, 3, {color: abColor, lineDash: [3, 3]}) 


    // draw a+bi
    drawLine([0, 0], [a, b], 3, {color: abColor})
    drawLine([0, 0], [a, 0], 3, {color: abColor})
    drawLine([a, 0], [a, b], 3, {color: abColor}) 
    drawPoint([a, b], abColor)

    // c+di
    drawLine([0, 0], [c, d], 3, {color: cdColor})
    drawLine([0, 0], [c, 0], 3, {color: cdColor})
    drawLine([c, 0], [c, d], 3, {color: cdColor})
    drawPoint([c, d], cdColor)

    // draw result and line to result
    drawLine([0, 0], product, 3, {color: abColor, lineDash: [3, 3]})
    drawPoint(product, 'magenta')
}



function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    return [x, y]
}

let movingAB = false
let movingCD = false
canvas.addEventListener('mousedown', function(e) {
    const [canvasX, canvasY] = getCursorPosition(canvas, e)
    const distAB = distance(...gridToCanvas(a, b), canvasX, canvasY) 
    const distCD  = distance(...gridToCanvas(c, d), canvasX, canvasY) 
    
    // 5px circle ? :shrug
    if (distAB < 10) {  
        movingAB = true
    } else if (distCD < 10) {
        movingCD = true
    }
})

canvas.addEventListener('mouseup', function(e) {
    movingAB = false
    movingCD = false
})

canvas.addEventListener('mousemove', function(e) {
    if (movingAB) {
        [a, b] = canvasToGrid(...getCursorPosition(canvas, e))
        drawCanvas();
    } else if (movingCD) {
        [c, d] = canvasToGrid(...getCursorPosition(canvas, e))
        drawCanvas();
    }
})

document.getElementById('swaporder').addEventListener('click', function(e) {
    [a, b, c, d] = [c, d, a, b] 
    drawCanvas();
})


function distance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
}

function canvasToGrid(canvasX, canvasY) {
    const xRange = xMax - xMin 
    const yRange = yMax - yMin 
    const x = (canvasX / canvas.width) * xRange + xMin
    const y = (1 - (canvasY / canvas.height)) * yRange + yMin
    return [x, y]
}

// convert grid point to canvas point
// canvas origin is top left
function gridToCanvas(x, y) {
    const xRange = xMax - xMin 
    const yRange = yMax - yMin 
    const canvasX = canvas.width * (x - xMin) / xRange
    const canvasY = canvas.height * (yMax - y) / yRange
    return [canvasX, canvasY]
}


function drawPoint(pt1, color='red') {
    const [x1, y1] = gridToCanvas(...pt1)
    const radius = 5
   
    ctx.fillStyle = color
    ctx.beginPath();
    ctx.arc(x1, y1, radius, 0, Math.PI*2);
    ctx.closePath();
    ctx.fill();
}

function drawLine(pt1, pt2, width, styles={color: 'white'}) {
    const [x1, y1] = gridToCanvas(...pt1)
    const [x2, y2] = gridToCanvas(...pt2)

    ctx.lineWidth = width
   
    ctx.strokeStyle = styles.color
    if (styles.hasOwnProperty('lineDash')) {
        ctx.setLineDash(styles.lineDash)
    } else {
        ctx.setLineDash([])
    }

    ctx.beginPath()       // Start a new path
    ctx.moveTo(x1, y1)    // Move the pen to (30, 50)
    ctx.lineTo(x2, y2)  // Draw a line to (150, 100)
    ctx.stroke()          // Render the path
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}


