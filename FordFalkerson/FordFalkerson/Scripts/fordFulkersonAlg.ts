import * as Gr from "./graph"
import * as Vizualizer from "./Vizualizer";

export class FordFalkerson {

    public runAlg(graph: Gr.Graph, viz: Vizualizer.Vizualizer): number {
        let that = this;

        let queue: Gr.GraphNode[] = [];
        let curNode: Gr.GraphNode;

        let emptyNode = new Gr.GraphNode(0);

        while (true) {

            graph.source().markData = Infinity;
            graph.source().prevNode = emptyNode;
            viz.addCommand(new Vizualizer.SetNodeMarksCommand(graph.source().index, emptyNode.index, graph.source().markData)); // Команда проставки метки

            queue.push(graph.source());
            while (queue.length != 0) {
                curNode = queue.shift();
                viz.addCommand(new Vizualizer.GetNodeCellCommand(curNode.index)); // Команда рассмотрения вершины

                let neightboards = graph.getNeightboards(curNode.index).filter(x => {
                    let rel = graph.getRelation(curNode, x);
                    return (rel.d < rel.r) && (!x.prevNode || (x == graph.stock()));
                });
                viz.addCommand(new Vizualizer.GetNeighBoardsCommand(neightboards.map(x => x.index))); // Рассматриваем соседей


                neightboards.forEach(x => {
                    x.prevNode = curNode;

                    let relation = graph.getRelation(curNode, x);
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

            if (!graph.stock().prevNode) break;
            else {
                that.clearMarks(graph, viz);
            }
        }


        let result = 0;

        graph.source().output.forEach(x => result += x.d);
        viz.addCommand(new Vizualizer.EndAlgResult(result));

        return result;
    }

    protected nodeComparer(a: Gr.GraphNode, b: Gr.GraphNode): number {
        return a.index - b.index;
    }

    protected stockWasVisited(graph: Gr.Graph, viz: Vizualizer.Vizualizer): void {
        let curNode = graph.stock();

        while (curNode != graph.source()) {
            viz.addCommand(new Vizualizer.VisitStockCommand(curNode.index, curNode.prevNode.index));
            let relation = graph.getRelation(curNode, curNode.prevNode);
            relation.d = (relation.d || 0) + curNode.markData;
            curNode.prevNode.markData = curNode.markData;
            curNode.markData = null;
            curNode = curNode.prevNode;
        }
        curNode.markData = Infinity;
    }

    protected clearMarks(graph: Gr.Graph, viz: Vizualizer.Vizualizer): void {
        graph.nodes.forEach(x => {
            x.markData = 0;
            x.prevNode = null;
        })

        viz.addCommand(new Vizualizer.ClearMarksCommand());
    }
}