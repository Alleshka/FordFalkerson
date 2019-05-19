var NodePresenter = /** @class */ (function () {
    function NodePresenter(node, point, domElement) {
        this.node = node;
        this.point = point;
        this.dom = domElement;
    }
    NodePresenter.prototype.render = function (style, domElement) {
        domElement = domElement || this.dom;
        var context = domElement.getContext("2d");
        context.beginPath();
        context.fillStyle = style;
        context.arc(this.point.x, this.point.y, 50, 0, 360);
        context.stroke();
    };
    return NodePresenter;
}());
var RelationPresenter = /** @class */ (function () {
    function RelationPresenter(rel, domElement) {
        this.relation = rel;
    }
    RelationPresenter.prototype.render = function (style, domElement) {
        console.log("hi mark");
    };
    return RelationPresenter;
}());
var GraphPresenter = /** @class */ (function () {
    function GraphPresenter(graph, points, domElement) {
        var _this = this;
        this.nodePresenters = [];
        this.relationPresenters = [];
        this.graph = graph;
        graph.nodes.forEach(function (node, i) {
            _this.nodePresenters.push(new NodePresenter(node, points[i] || points[0], domElement));
        });
        graph.relations.forEach(function (x) { return _this.relationPresenters.push(new RelationPresenter(x, domElement)); });
    }
    GraphPresenter.prototype.render = function (style, domElement) {
        domElement = domElement || this.domElement;
        this.nodePresenters.forEach(function (x) { return x.render(style, domElement); });
        this.relationPresenters.forEach(function (x) { return x.render(style, domElement); });
    };
    GraphPresenter.prototype.getNodePresenter = function (nodeIndex) {
        return this.nodePresenters.filter(function (x) { return x.node.index == nodeIndex; })[0];
    };
    GraphPresenter.prototype.getRelationPresenter = function (firsNode, seconNode) {
        var relData = this.graph.getRelation(this.graph.getNodeByIndex(firsNode), this.graph.getNodeByIndex(seconNode));
        return this.relationPresenters.filter(function (x) { return x.relation == relData; });
    };
    return GraphPresenter;
}());
export { GraphPresenter };
//# sourceMappingURL=graphPresenter.js.map