var GraphNode = /** @class */ (function () {
    function GraphNode(idx) {
        this.index = idx;
        this.output = [];
    }
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
            console.log(matrix);
        }
    }
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
    };
    Graph.prototype.getNodeByIndex = function (idx) {
        return this.nodes.filter(function (x) { return x.index == idx; })[0];
    };
    Graph.prototype.getRelation = function (a, b) {
        return this.relations.filter(function (x) { return (x.startNode == a && x.endNode == b) || (x.endNode == a && x.startNode == b); })[0];
    };
    return Graph;
}());
export { Graph };
//# sourceMappingURL=graph.js.map