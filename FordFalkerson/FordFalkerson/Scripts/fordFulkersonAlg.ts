import * as Gr from "./graph"
import { Vuzualizer } from "./AlgVisualisator";

export class FordFalkerson {

    public runAlg(graph: Gr.Graph, viz?: Vuzualizer): number {
        let that = this;

        let queue: Gr.GraphNode[] = [];
        let curNode: Gr.GraphNode;

        let emptyNode = new Gr.GraphNode(0);

        while (true) {

            graph.source.markData = Infinity;
            graph.source.prevNode = emptyNode;
            queue.push(graph.source);

            while (queue.length != 0) {
                curNode = queue.shift();
                if (viz) {
                    viz.addStep("Выбираем вершину", function () {
                        let node = viz.presenter.getNodePresenter(curNode.index);
                        node.render("green");
                    });
                }


                let neightboards = curNode.output.map(x => curNode == x.startNode ? x.endNode : x.startNode).filter(x => {
                    let rel = graph.getRelation(curNode, x);
                    return (rel.d < rel.r) && (!x.prevNode || (x == graph.end));
                });

                neightboards.forEach(x => {
                    x.prevNode = curNode;

                    let relation = graph.getRelation(curNode, x);
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

            if (!graph.end.prevNode) break;
            else {
                that.clearMarks(graph);
            }



        }

        console.log(graph);
        let result = 0;

        graph.source.output.forEach(x => result += x.d);
        return result;
    }

    protected nodeComparer(a: Gr.GraphNode, b: Gr.GraphNode): number {
        return a.index - b.index;
    }

    protected stockWasVisited(graph: Gr.Graph): void {
        let curNode = graph.end;

        while (curNode != graph.source) {
            let relation = graph.getRelation(curNode, curNode.prevNode);
            relation.d = (relation.d || 0) + curNode.markData;
            curNode.prevNode.markData = curNode.markData;
            curNode.markData = null;
            curNode = curNode.prevNode;
        }
        curNode.markData = Infinity;
    }

    protected clearMarks(graph: Gr.Graph): void {
        graph.nodes.forEach(x => {
            x.markData = 0;
            x.prevNode = null;
        })
    }
}