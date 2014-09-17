function draw() {
    var canvas = document.getElementById('animation');
    var ctx = canvas.getContext('2d');
    var canvasSize = canvas.width; // = height because square canvas assumed

    var N = 20;
    var gap = 2;
    var rectSize = Math.floor((canvasSize - gap * (N + 1)) / N);
    var jump = rectSize + gap;
    var gridSize = rectSize * N + gap * (N+1); 
    var start = (canvasSize - gridSize) / 2;
    
    ctx.fillRect(0, 0, canvasSize, canvasSize);

    for (i = 0; i < N; i++) {
        for (j = 0; j < N; j++) {
            ctx.clearRect(start + j * jump, start + i * jump, rectSize,rectSize);
        }
    }
    
}



// Declare Percolation namespace:
function Percolation(N) {
    // Constructor
    // how to? if ( N <= 0) { throw "Grid size must be > 0"); }

    var size = N;
    var uf = new WeightedQuickUnionUF(N*N+2);
    var topUF = new WeightedQuickUnionUF(N*N+2);
    
    var opened = [];
    for (var i = 0; i < N * N; i++) {
        opened[i] = false;
    }


    var xyTo1D = function(i, j) {
        return size * (i - 1) + j;
    }

    var checkBounds = function(i, j) {
        if (i <= 0 || i > size) { throw "row index i out of bounds"; }
        if (j <= 0 || j > size) { throw "column index j out of bounds"; }
    }

    this.open = function(i, j) {
        checkBounds(i, j);
        opened[xyTo1D(i, j)] = true;
        //series of if statements to connect to neighbors
        return 0;
    }
    
    this.isOpen = function(i, j) {
        checkBounds(i,j);
        return opened[xyTo1D(i, j)];
    }

    this.isFull = function(i, j) {
        checkBounds(i, j);
        return topUF.connected(xyTo1D(i, j), 0);
    }

    this.percolates = function() {
        return uf.connected(0, size * size + 1);
        return 0;
    }
}

// Declare weighted quick union union-find namespace:
function WeightedQuickUnionUF(N) {
    
    // Constructor
    var id = [];
    var sz = []; 
    this.count = N;
    for (i=0; i<N; i++) {
        id[i] = i; // id[i] = parent of i
        sz[i] = 1; // sz[i] = number of objects in subtree rooted at i
    }

    // Returns the component id for the component containing site
    this.find = function(p) {
        while (p != id[p]) {
            p = id[p];
        }
        return p;
    }

    this.connected = function(p, q) {
        return this.find(p) === this.find(q);
    }

    this.union = function(p, q) {
        var rootP = this.find(p);
        var rootQ = this.find(q);
        if (rootP === rootQ) { return; }
        
        // make smaller root point to large one
        if (sz[rootP] < sz[rootQ]) {
            id[rootP] = rootQ; sz[rootQ] += sz[rootP];
        } else {
            id[rootQ] = rootP; sz[rootP] += sz[rootQ];
        }
    }

} 






function test() {
    var uf = new WeightedQuickUnionUF(10);
    uf.union(2,3);
    for (i = 0; i < 10; i++) {
        alert(uf.find(i));
    }
}
