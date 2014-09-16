function draw() {
    var canvas = document.getElementById('animation');
    var ctx = canvas.getContext('2d');
    var canvasSize = canvas.width; // = height because square canvas assumed

    var N = 20;
    var gap = 2;
    var rectSize = Math.floor((canvasSize-gap*(N+1))/N);
    var gridSize = rectSize*N + gap*(N+1); 
    var start = (canvasSize - gridSize) / 2;
    
    ctx.fillRect(0,0,canvasSize,canvasSize);

    for (i=0; i<N; i++) {
        for (j=0; j<N; j++) {
            ctx.clearRect(start+j*(rectSize+gap),start+i*(rectSize+gap),rectSize,rectSize);
        }
    }
    
}

function percolation() {
    var size;

}


