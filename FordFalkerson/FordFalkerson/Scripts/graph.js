var GraphNode = /** @class */ (function () {
    function GraphNode(idx) {
        this.index = idx;
        this.output = [];
        this.isStockOrEnd = false;
    }
    ;
    GraphNode.emptyNode = function () {
        return GraphNode._emtyNode;
    };
    GraphNode._emtyNode = new GraphNode(0);
    return GraphNode;
}());
export { GraphNode };
var Relation = /** @class */ (function () {
    function Relation(start, end, r) {
        this.startNode = start;
        this.endNode = end;
        this.r = r;
        this.d = 0;
    }
    return Relation;
}());
export { Relation };
var Graph = /** @class */ (function () {
    function Graph(matrix) {
        this.nodes = [];
        this.relations = [];
        if (matrix) {
            for (var i = 0; i < matrix.length; i++) {
                var node = new GraphNode(i + 1);
                this.addNode(node);
            }
            for (var i = 0; i < matrix.length; i++) {
                for (var j = i; j < matrix[i].length; j++) {
                    if (matrix[i][j] > 0)
                        this.addRelation((i + 1), (j + 1), matrix[i][j]);
                }
            }
        }
    }
    Graph.prototype.source = function (value) {
        if (value) {
            this._source = value;
            value.isStockOrEnd = true;
        }
        else {
            return this._source;
        }
    };
    Graph.prototype.stock = function (value) {
        if (value) {
            this._stock = value;
            value.isStockOrEnd = true;
        }
        else {
            return this._stock;
        }
    };
    Graph.prototype.toOptions = function () {
        var matrix = [];
        var _loop_1 = function (i) {
            matrix[i] = [];
            var _loop_2 = function (j) {
                var rel = this_1.relations.filter(function (rel) { return rel.startNode.index == (i + 1) && rel.endNode.index == (j + 1); })[0];
                matrix[i][j] = (rel && rel.r) || 0;
            };
            for (var j = 0; j < this_1.nodes.length; j++) {
                _loop_2(j);
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.nodes.length; i++) {
            _loop_1(i);
        }
        return {
            source: (this.source() && this.source().index) || 1,
            stock: (this.stock() && this.stock().index) || (this.nodes.length),
            matrix: matrix
        };
    };
    Graph.prototype.addNode = function (node) {
        this.nodes.push(node);
    };
    Graph.prototype.addRelation = function (idxStart, idxEnd, r) {
        var start = this.getNodeByIndex(idxStart);
        var end = this.getNodeByIndex(idxEnd);
        var rel = new Relation(start, end, r);
        start.output.push(rel);
        end.output.push(rel);
        this.relations.push(rel);
        return rel;
    };
    Graph.prototype.getNodeByIndex = function (idx) {
        return this.nodes.filter(function (x) { return x.index == idx; })[0];
    };
    Graph.prototype.getRelation = function (a, b) {
        return this.relations.filter(function (x) { return (x.startNode == a && x.endNode == b) || (x.endNode == a && x.startNode == b); })[0];
    };
    Graph.prototype.getNeightboards = function (index) {
        var that = this;
        var curNode = this.getNodeByIndex(index);
        return curNode.output.map(function (x) { return curNode == x.startNode ? x.endNode : x.startNode; });
    };
    return Graph;
}());
export { Graph };
//# sourceMappingURL=graph.js.map