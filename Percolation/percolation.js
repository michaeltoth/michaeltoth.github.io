function draw() {
    var canvas = document.getElementById('animation');
    var ctx = canvas.getContext('2d');
    var canvasSize = canvas.width; // = height because square canvas assumed
   
   
    var N = 20; 
    var perc = new Percolation(N);
    perc.open(1,1);
    perc.open(2,1);
    perc.open(3,1);
    perc.open(3,2);
    perc.open(5,1);
    alert(perc.isFull(1,2));
    
    var gap = 1;
    var rectSize = Math.floor((canvasSize - gap * (N + 1)) / N);
    var jump = rectSize + gap;
    var gridSize = rectSize * N + gap * (N+1); 
    var start = (canvasSize - gridSize) / 2;
    
    // Helper function to convert row/col nums to grid locations
    this.loc = function(rowNum) {
        return start + (rowNum - 1) * jump
    }

    this.drawGrid = function() {
        for (var row = 1; row < N + 1; row++) {
            for (var col = 1; col < N + 1; col++) {
                if (perc.isFull(row, col)) {
                    ctx.fillStyle = "blue";
                    ctx.fillRect(this.loc(col), this.loc(row), rectSize, rectSize);
                } else if (perc.isOpen(row, col)) {
                    ctx.fillStyle = "white";
                    ctx.fillRect(this.loc(col), this.loc(row), rectSize, rectSize);
                } else {
                    ctx.fillStyle = "black";
                    ctx.fillRect(this.loc(col), this.loc(row), rectSize, rectSize);
                } 
            }
        }
    }

    drawGrid();
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

        // Mark open in boolean array:
        opened[xyTo1D(i, j)] = true;
        
        // Connect with open neighbors:
        if (i != 1 && this.isOpen(i - 1, j)) {
            uf.union(xyTo1D(i, j), xyTo1D(i - 1, j));
            topUF.union(xyTo1D(1, j), xyTo1D(i - 1, j));
        }
        if (i != size && this.isOpen(i + 1, j)) {
            uf.union(xyTo1D(i, j), xyTo1D(i + 1, j));
            topUF.union(xyTo1D(1, j), xyTo1D(i + 1, j));
        }
        if (j != 1 && this.isOpen(i, j - 1)) {
            uf.union(xyTo1D(i, j), xyTo1D(i, j - 1));
            topUF.union(xyTo1D(i, j), xyTo1D(i, j - 1));
        }
        if (j != size && this.isOpen(i, j + 1)) {
            uf.union(xyTo1D(i, j), xyTo1D(i, j + 1));
            topUF.union(xyTo1D(i, j), xyTo1D(i, j + 1));
        }

        // If in top or bottom row, connect to virtual sites:
        if (i === 1) {
            uf.union(xyTo1D(i, j), 0);
            topUF.union(xyTo1D(i, j), 0);
        }
        if (i === size) {
            // Don't connect topUF.  Prevents backwash problem
            uf.union(xyTo1D(i, j), size * size + 1);
        }


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
    var perc = new Percolation(3);
    alert(perc.isOpen(1,1));
    perc.open(1,1);
    alert(perc.isOpen(1,1));
}
