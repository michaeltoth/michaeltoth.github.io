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


/*
// Declare Percolation namespace:
function Percolation(N) {
    // Constructor
    var size = N;
    var uf = new WeightedQuickUnionUF(N*N+2);
    var topUF = new WeightedQuickUnionUF(N*N+2);
    // opened = 2d boolean array of size N initialized to false;

    var xyTo1D = function(i, j) {
        return size * (i - 1) + j;
    }

    var checkBounds = function(i, j) {
        return 0;
        //throwing exception in JS?
    }

    this.open(i, j) {
        //checkBounds(i,j);
        //opened[i,j] = true;
        //series of if statements to connect to neighbors
        return 0;
    }

    this.isOpen(i, j) {
        //checkBounds(i,j);
        //return opened[i, j];
        return 0;
    }

    this.isFull(i, j) {
        //checkBounds(i, j);
        //return topUF.connected(xyTo1D(i, j), 0);
        return 0;
    }

    this.percolates() {
        //return uf.connected(0, size * size + 1);
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

    this.union = function(p, q) {
        var rootP = find(p);
        var rootQ = find(q);
        if (rootP == rootQ) { return; }
        
        // make smaller root point to large one
        if (sz[rootP] < sz[rootQ]) {
            id[rootP] = rootQ; sz[rootQ] += sz[rootP];
        } else {
            id[rootQ] = rootP; sz[rootP] += sz[rootQ];
        }
    }

}
*/
