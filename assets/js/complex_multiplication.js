

const canvas = document.getElementById("canvas")

canvas.height = 800
canvas.width = 800

const ctx = canvas.getContext("2d");


let xMin = -12
let xMax = 12
let yMin = -12
let yMax = 12


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


let image_index = 0;
let frame_index = 0;
function downloadImg() {
    const dataUrl = canvas.toDataURL("image/png");
    document.write(`<img download="${name}" src="${dataUrl}"/>`);
    document.write(`<a download="${image_index}_${frame_index}.png" href="${dataUrl}"/>download</a>`);
    frame_index += 1;
}

function nextImg() {
    frame_index = 0;
    image_index+= 1;
}

// make images for gifs
//drawGifs()
function drawGifs() {
    abColor = 'coral'
    cdColor = 'chartreuse'

    // draw horizontal
    clear();
    drawAxes();

    downloadImg()
    drawLine([0, 0], [1, 0], 4, {color: abColor})
    downloadImg()
    drawLine([0, 0], [2, 0], 4, {color: abColor})
    downloadImg()
    drawLine([0, 0], [3, 0], 4, {color: abColor})
    downloadImg()

    nextImg();

    // draw c+di as a 1s w/o c+di segments
    clear();
    drawAxes();
    downloadImg()
    drawLine([0, 0], [2, 1], 4, {color: abColor, lineDash: [3, 3]})
    downloadImg()
    drawLine([0, 0], [4, 2], 4, {color: abColor, lineDash: [3, 3]})
    downloadImg()
    drawLine([0, 0], [6, 3], 4, {color: abColor, lineDash: [3, 3]})
    downloadImg()
    
    nextImg();

    // draw c+di as a 1s
    clear();
    drawAxes();
    downloadImg()
    let [x, y] = [0, 0] 
    const style = {color: cdColor, lineDash: [3, 3]}
    increments(a).forEach((aInc) => {
        const nextX = x + c * aInc
        const nextY = y + d * aInc
        
        drawLine([x, y], [nextX, nextY], 3, {color: abColor, lineDash: [3, 3]}) // diagonal
        drawLine([x, y], [nextX, y], 3, style) // horizontal
        drawLine([nextX, y], [nextX, nextY], 3, style); // vertical
        [x, y] = [nextX, nextY]

        if (aInc != 0)
            downloadImg()
    })
    
    nextImg();

    // draw c+di normal and flipped by 90 degrees
    clear();
    drawAxes();
    drawLine([0, 0], [c, d], 3, {color: cdColor})
    drawLine([0, 0], [c, 0], 3, {color: cdColor, lineDash: [3, 3]})
    drawLine([c, 0], [c, d], 3, {color: cdColor, lineDash: [3, 3]})
    drawPoint([c, d], cdColor)
    downloadImg()

    clear();
    drawAxes();
    drawLine([0, 0], [-d, c], 3, {color: cdColor})
    drawLine([0, 0], [0, c], 3, {color: cdColor, lineDash: [3, 3]})
    drawLine([0, c], [-d, c], 3, {color: cdColor, lineDash: [3, 3]})
    drawPoint([-d, c], cdColor)
    downloadImg()

    nextImg()

    // draw vertical
    clear();
    drawAxes();
    // leave in horizontal
    drawLine([0, 0], [3, 0], 4, {color: abColor})
    downloadImg()
    drawLine([3, 0], [3, 1], 4, {color: abColor})
    downloadImg()
    drawLine([3, 0], [3, 2], 4, {color: abColor})
    downloadImg()
    drawLine([3, 0], [3, 3], 4, {color: abColor})
    downloadImg()
    drawLine([3, 0], [3, 4], 4, {color: abColor})
    downloadImg()

    nextImg()

    // draw topo vertical, now diagonal segment
    // draw c+di as a 1s
    clear();
    drawAxes();
    [x, y] = [0, 0] 
    increments(a).forEach((aInc) => {
        const nextX = x + c * aInc
        const nextY = y + d * aInc
        drawLine([x, y], [nextX, nextY], 3, {color: abColor, lineDash: [3, 3]}) // diagonal
        drawLine([x, y], [nextX, y], 3, {color: cdColor, lineDash: [3, 3]}) // horizontal
        drawLine([nextX, y], [nextX, nextY], 3, {color: cdColor, lineDash: [3, 3]}); // vertical
        [x, y] = [nextX, nextY]
    })
    downloadImg()
    increments(b).forEach((bInc) => {
        // for non-integer b's, need to handle smaller last triangle
        const nextX = x - d * bInc
        const nextY = y + c * bInc
        drawLine([x, y], [nextX, nextY], 3, {color: abColor, lineDash: [3, 3]}) // diagonal
        drawLine([x, y], [x, nextY], 3, {color: cdColor, lineDash: [3, 3]}) // horizontal
        drawLine([x, nextY], [nextX, nextY], 3, {color: cdColor, lineDash: [3, 3]}); // vertical 
        [x, y] = [nextX, nextY]
        if (bInc != 0)
            downloadImg()
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



function getCursorPosition(canvas, e) {
    const rect = canvas.getBoundingClientRect()
    let x;
    let y; 
    if(e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend'){
        const touch = e.touches[0];
        x = touch.clientX - rect.left;
        y = touch.clientY - rect.top;
    } else if (e.type == 'mousedown' || e.type == 'mouseup' || e.type == 'mousemove') {
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
    }

    return [x, y]
}

let movingAB = false
let movingCD = false

function holdMouse(e) {
    e.preventDefault();
    const [canvasX, canvasY] = getCursorPosition(canvas, e)
    const distAB = distance(...gridToCanvas(a, b), canvasX, canvasY) 
    const distCD  = distance(...gridToCanvas(c, d), canvasX, canvasY) 
   
    // 20px circle ? :shrug
    if (distAB < 20) {  
        movingAB = true
    } else if (distCD < 20) {
        movingCD = true
    }
}

function releaseMouse(e) {
    movingAB = false
    movingCD = false
}

function moveMouse(e) {
    if (movingAB) {
        [a, b] = canvasToGrid(...getCursorPosition(canvas, e))
        drawCanvas();
    } else if (movingCD) {
        [c, d] = canvasToGrid(...getCursorPosition(canvas, e))
        drawCanvas();
    }
}

// handlers for regular mouse
canvas.addEventListener('mousedown', holdMouse);
canvas.addEventListener('mousemove', moveMouse); 
canvas.addEventListener('mouseup', releaseMouse)

// handlers for mobile
canvas.addEventListener('touchstart', holdMouse);
canvas.addEventListener('touchmove', moveMouse); 
canvas.addEventListener('touchend', releaseMouse)

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


