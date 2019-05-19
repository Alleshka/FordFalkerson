import * as Gr from "./graph";
import * as Vizualizer from "./Vizualizer";
var FordFalkerson = /** @class */ (function () {
    function FordFalkerson() {
    }
    FordFalkerson.prototype.runAlg = function (graph, viz) {
        var that = this;
        var queue = [];
        var curNode;
        var emptyNode = new Gr.GraphNode(0);
        while (true) {
            graph.source().markData = Infinity;
            graph.source().prevNode = emptyNode;
            viz.addCommand(new Vizualizer.SetNodeMarksCommand(graph.source().index, emptyNode.index, graph.source().markData)); // Команда проставки метки
            queue.push(graph.source());
            while (queue.length != 0) {
                curNode = queue.shift();
                viz.addCommand(new Vizualizer.GetNodeCellCommand(curNode.index)); // Команда рассмотрения вершины
                var neightboards = graph.getNeightboards(curNode.index).filter(function (x) {
                    var rel = graph.getRelation(curNode, x);
                    return (rel.d < rel.r) && (!x.prevNode || (x == graph.stock()));
                });
                viz.addCommand(new Vizualizer.GetNeighBoardsCommand(neightboards.map(function (x) { return x.index; }))); // Рассматриваем соседей
                neightboards.forEach(function (x) {
                    x.prevNode = curNode;
                    var relation = graph.getRelation(curNode, x);
                    viz.addCommand(new Vizualizer.GetRelationsCommand(curNode.index, x.index)); // Рассматриваем связь
                    if (relation.d < relation.r && relation.startNode == curNode) {
                        x.markData = Math.min(relation.r - relation.d, Math.abs(x.prevNode.markData));
                    }
                    else {
                        x.markData = (-1) * Math.min(Math.abs(x.prevNode.markData), relation.d);
                    }
                    viz.addCommand(new Vizualizer.SetNodeMarksCommand(x.index, x.prevNode.index, x.markData)); // Проставляем метку
                    if (x != graph.stock()) {
                        queue.push(x);
                        queue = queue.sort(that.nodeComparer);
                    }
                    else {
                        that.stockWasVisited(graph, viz);
                    }
                });
                viz.addCommand(new Vizualizer.ClearStyles());
            }
            if (!graph.stock().prevNode)
                break;
            else {
                that.clearMarks(graph, viz);
            }
        }
        var result = 0;
        graph.source().output.forEach(function (x) { return result += x.d; });
        viz.addCommand(new Vizualizer.EndAlgResult(result));
        return result;
    };
    FordFalkerson.prototype.nodeComparer = function (a, b) {
        return a.index - b.index;
    };
    FordFalkerson.prototype.stockWasVisited = function (graph, viz) {
        var curNode = graph.stock();
        while (curNode != graph.source()) {
            viz.addCommand(new Vizualizer.VisitStockCommand(curNode.index, curNode.prevNode.index));
            var relation = graph.getRelation(curNode, curNode.prevNode);
            relation.d = (relation.d || 0) + curNode.markData;
            curNode.prevNode.markData = curNode.markData;
            curNode.markData = null;
            curNode = curNode.prevNode;
        }
        curNode.markData = Infinity;
    };
    FordFalkerson.prototype.clearMarks = function (graph, viz) {
        graph.nodes.forEach(function (x) {
            x.markData = 0;
            x.prevNode = null;
        });
        viz.addCommand(new Vizualizer.ClearMarksCommand());
    };
    return FordFalkerson;
}());
export { FordFalkerson };
//# sourceMappingURL=fordFulkersonAlg.js.map