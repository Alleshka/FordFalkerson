import { GraphNode } from "./graph";
var NodePresenter = /** @class */ (function () {
    function NodePresenter(node) {
        this.node = node;
    }
    NodePresenter.prototype.nodeIndex = function () {
        return this.node.index;
    };
    NodePresenter.prototype.render = function (canvasContext) {
        var oldStyle = canvasContext.strokeStyle;
        canvasContext.beginPath();
        canvasContext.strokeStyle = this.nodeStyle || oldStyle;
        canvasContext.arc(this.options.startX, this.options.startY, this.options.radius, 0, Math.PI * 2);
        canvasContext.textAlign = "center";
        canvasContext.font = this.options.radius * 2 + "px";
        canvasContext.strokeText(this.node.index.toString(), this.options.startX, this.options.startY, this.options.radius / 2);
        if (this.node.markData) {
            var prevNode = (this.node.prevNode && this.node.prevNode.index.toString()) || 0;
            var markData = this.node.markData;
            if (markData < 0) {
                markData = Math.abs(markData);
                prevNode += "-";
            }
            canvasContext.textAlign = "center";
            canvasContext.font = this.options.radius + "px";
            canvasContext.fillText("[" + prevNode + "; " + markData + "]", this.options.startX, this.options.startY - this.options.radius - 10, 2 * this.options.radius);
        }
        canvasContext.stroke();
        if (this.node.isStockOrEnd) {
            canvasContext.beginPath();
            canvasContext.arc(this.options.startX, this.options.startY, this.options.radius * 0.8, 0, Math.PI * 2);
            canvasContext.stroke();
        }
        canvasContext.strokeStyle = oldStyle;
    };
    NodePresenter.prototype.isCurNode = function (node) {
        return (node.index == this.node.index);
    };
    return NodePresenter;
}());
var RelationPresenter = /** @class */ (function () {
    function RelationPresenter(relation, startNode, endNode) {
        this.relation = relation;
        this.startNodePresenter = startNode;
        this.endNodePresenter = endNode;
    }
    RelationPresenter.prototype.render = function (context) {
        var startNode = this.startNodePresenter;
        var endNode = this.endNodePresenter;
        var oldStyle = context.strokeStyle;
        context.strokeStyle = this.relationStyle || oldStyle;
        context.beginPath();
        var relationLine = this.getRelationLine(startNode, endNode);
        context.fillText("d = " + this.relation.d, (relationLine.x1 + relationLine.x2) / 2, (relationLine.y1 + relationLine.y2 - 20) / 2);
        context.fillText("r = " + this.relation.r, (relationLine.x1 + relationLine.x2) / 2, (relationLine.y1 + relationLine.y2 + 20) / 2);
        context.moveTo(relationLine.x1, relationLine.y1);
        context.lineTo(relationLine.x2, relationLine.y2);
        context.stroke();
        context.strokeStyle = oldStyle;
    };
    RelationPresenter.prototype.getRelationLine = function (startNode, endNode) {
        var difY = endNode.options.startY - startNode.options.startY;
        var difX = endNode.options.startX - startNode.options.startX;
        var c = Math.sqrt(Math.pow(difY, 2) + Math.pow(difX, 2));
        var a = difY / c;
        var b = difX / c;
        return {
            x1: startNode.options.startX + startNode.options.radius * b,
            y1: startNode.options.startY + startNode.options.radius * a,
            x2: endNode.options.startX - endNode.options.radius * b,
            y2: endNode.options.startY - endNode.options.radius * a
        };
    };
    RelationPresenter.prototype.isCurRelation = function (rel) {
        return this.relation == rel;
    };
    return RelationPresenter;
}());
var GrapthPresenter = /** @class */ (function () {
    function GrapthPresenter(graph, domElement) {
        this.grath = graph;
        this.domElement = domElement;
        this.initPresenters(graph);
    }
    GrapthPresenter.prototype.render = function (sortNodes) {
        if (sortNodes === void 0) { sortNodes = false; }
        var context = this.domElement.getContext("2d");
        context.clearRect(0, 0, this.domElement.width, this.domElement.height);
        // Пересчёт координат и простановка
        var options = this.getNodePresenterOptions(sortNodes);
        this.nodePresenters.forEach(function (x) { x.options = x.options || options.shift(); x.render(context); });
        // Отрисовка связей и вызов отрисоки вершин
        this.relationPresenters.forEach(function (x) {
            x.render(context);
        });
    };
    GrapthPresenter.prototype.setNodeStyle = function (idx, style) {
        var node = this.getNodePresenter(this.grath.getNodeByIndex(idx));
        node.nodeStyle = style;
    };
    GrapthPresenter.prototype.setRelationStyle = function (idxStart, idxEnd, style) {
        var relation = this.grath.getRelation(this.grath.getNodeByIndex(idxStart), this.grath.getNodeByIndex(idxEnd));
        var relPresenter = this.relationPresenters.filter(function (x) { return x.isCurRelation(relation); })[0];
        relPresenter.relationStyle = style || "black";
    };
    GrapthPresenter.prototype.getGraph = function () {
        return this.grath;
    };
    GrapthPresenter.prototype.clearStyles = function () {
        var nodes = this.nodePresenters.filter(function (x) { return x.nodeStyle; });
        nodes.forEach(function (x) { return x.nodeStyle = null; });
        var rel = this.relationPresenters.filter(function (x) { return x.relationStyle; });
        rel.forEach(function (x) { return x.relationStyle = null; });
    };
    GrapthPresenter.prototype.addRelation = function (start, end, r) {
        var nodeStart = this.grath.getNodeByIndex(start.nodeIndex());
        var nodeEnd = this.grath.getNodeByIndex(end.nodeIndex());
        var curRel = this.grath.getRelation(nodeStart, nodeEnd);
        if (!curRel) {
            curRel = this.grath.addRelation(nodeStart.index, nodeEnd.index, r);
            this.relationPresenters.push(new RelationPresenter(curRel, start, end));
            return true;
        }
        else {
            curRel.r = r;
            return false;
        }
    };
    GrapthPresenter.prototype.addNode = function (x, y) {
        var node = new GraphNode(this.nodePresenters.length + 1);
        this.grath.addNode(node);
        var presenter = new NodePresenter(node);
        presenter.options = {
            startX: x,
            startY: y,
            radius: 30
        };
        this.nodePresenters.push(presenter);
        return true;
    };
    GrapthPresenter.prototype.getNodePresenterByCoordinates = function (x, y) {
        return this.nodePresenters.filter(function (node) { return Math.pow(x - node.options.startX, 2) + Math.pow(y - node.options.startY, 2) <= Math.pow(node.options.radius, 2); })[0];
    };
    GrapthPresenter.prototype.drawLine = function (line) {
        var context = this.domElement.getContext("2d");
        context.moveTo(line.x1, line.y1);
        context.lineTo(line.x2, line.y2);
        context.stroke();
    };
    GrapthPresenter.prototype.initPresenters = function (graph) {
        var that = this;
        that.relationPresenters = [];
        that.nodePresenters = [];
        // Проходим по всем связям
        graph.relations.forEach(function (relation) {
            var firstNode = that.getNodePresenter(relation.startNode);
            var seconNode = that.getNodePresenter(relation.endNode);
            that.relationPresenters.push(new RelationPresenter(relation, firstNode, seconNode));
        });
    };
    GrapthPresenter.prototype.getNodePresenter = function (node) {
        var nodePresenter = this.nodePresenters.filter(function (x) { return x.isCurNode(node); })[0];
        if (!nodePresenter) {
            nodePresenter = new NodePresenter(node);
            this.nodePresenters.push(nodePresenter);
        }
        return nodePresenter;
    };
    GrapthPresenter.prototype.getNodePresenterOptions = function (sortNodes) {
        if (sortNodes === void 0) { sortNodes = false; }
        var centerX = this.domElement.width / 2;
        var centerY = this.domElement.height / 2;
        var nodeCount = this.grath.nodes.length;
        var rad = Math.min(centerX, centerY) / 7;
        var grad = 2 * Math.PI / nodeCount;
        var options = [];
        for (var i = 0; i < nodeCount; i++) {
            options.push({
                startX: centerX + this.domElement.width * Math.cos(i * grad + Math.PI) / 3,
                startY: centerY + this.domElement.height * Math.sin(i * grad + Math.PI) / 3,
                radius: rad
            });
        }
        if (!sortNodes)
            options = options.sort(function (a, b) { return a.startX - b.startX; });
        return options;
    };
    return GrapthPresenter;
}());
export { GrapthPresenter };
//# sourceMappingURL=graphPresenter.js.map