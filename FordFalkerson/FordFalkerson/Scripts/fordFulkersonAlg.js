import * as Gr from "./graph";
var FordFalkerson = /** @class */ (function () {
    function FordFalkerson() {
    }
    FordFalkerson.prototype.runAlg = function (graph, viz) {
        var that = this;
        var queue = [];
        var curNode;
        var emptyNode = new Gr.GraphNode(0);
        while (true) {
            graph.source.markData = Infinity;
            graph.source.prevNode = emptyNode;
            queue.push(graph.source);
            while (queue.length != 0) {
                curNode = queue.shift();
                if (viz) {
                    viz.addStep("Выбираем вершину", function () {
                        var node = viz.presenter.getNodePresenter(curNode.index);
                        node.render("green");
                    });
                }
                var neightboards = curNode.output.map(function (x) { return curNode == x.startNode ? x.endNode : x.startNode; }).filter(function (x) {
                    var rel = graph.getRelation(curNode, x);
                    return (rel.d < rel.r) && (!x.prevNode || (x == graph.end));
                });
                neightboards.forEach(function (x) {
                    x.prevNode = curNode;
                    var relation = graph.getRelation(curNode, x);
                    if (relation.d < relation.r && relation.startNode == curNode) {
                        x.markData = Math.min(relation.r - relation.d, Math.abs(x.prevNode.markData));
                    }
                    else {
                        x.markData = (-1) * Math.min(Math.abs(x.prevNode.markData), relation.d);
                    }
                    if (x != graph.end) {
                        queue.push(x);
                        queue = queue.sort(that.nodeComparer);
                    }
                    else {
                        that.stockWasVisited(graph);
                    }
                });
            }
            if (!graph.end.prevNode)
                break;
            else {
                that.clearMarks(graph);
            }
        }
        console.log(graph);
        var result = 0;
        graph.source.output.forEach(function (x) { return result += x.d; });
        return result;
    };
    FordFalkerson.prototype.nodeComparer = function (a, b) {
        return a.index - b.index;
    };
    FordFalkerson.prototype.stockWasVisited = function (graph) {
        var curNode = graph.end;
        while (curNode != graph.source) {
            var relation = graph.getRelation(curNode, curNode.prevNode);
            relation.d = (relation.d || 0) + curNode.markData;
            curNode.prevNode.markData = curNode.markData;
            curNode.markData = null;
            curNode = curNode.prevNode;
        }
        curNode.markData = Infinity;
    };
    FordFalkerson.prototype.clearMarks = function (graph) {
        graph.nodes.forEach(function (x) {
            x.markData = 0;
            x.prevNode = null;
        });
    };
    return FordFalkerson;
}());
export { FordFalkerson };
//# sourceMappingURL=fordFulkersonAlg.js.map