import * as FF from "./fordFulkersonAlg"
import * as Gr from "./graph"
import * as Presenter from "./graphPresenter"
import { Vuzualizer } from "./AlgVisualisator"

//let graph = new Gr.Graph();
//graph.addNode(new Gr.GraphNode(1));
//graph.addNode(new Gr.GraphNode(2));
//graph.addNode(new Gr.GraphNode(3));
//graph.addNode(new Gr.GraphNode(4));
//graph.addNode(new Gr.GraphNode(5));
//graph.addNode(new Gr.GraphNode(6));
//graph.addNode(new Gr.GraphNode(7));
//graph.addNode(new Gr.GraphNode(8));

//graph.addRelation(1, 2, 7);
//graph.addRelation(1, 3, 4);
//graph.addRelation(1, 4, 9);
//graph.addRelation(2, 3, 3);
//graph.addRelation(2, 5, 5);
//graph.addRelation(3, 6, 11);
//graph.addRelation(4, 7, 7);
//graph.addRelation(4, 6, 3);
//graph.addRelation(5, 3, 8);
//graph.addRelation(5, 8, 3);
//graph.addRelation(7, 8, 4);
//graph.addRelation(8, 6, 2);

//graph.source = graph.getNodeByIndex(1);
//graph.end = graph.getNodeByIndex(6);

let graph = new Gr.Graph();
graph.addNode(new Gr.GraphNode(1));
graph.addNode(new Gr.GraphNode(2));
graph.addNode(new Gr.GraphNode(3));
graph.addNode(new Gr.GraphNode(4));
graph.addNode(new Gr.GraphNode(5));

graph.addRelation(1, 2, 20);
graph.addRelation(1, 3, 30);
graph.addRelation(1, 4, 10);
graph.addRelation(2, 3, 40);
graph.addRelation(2, 5, 30);
graph.addRelation(3, 4, 10);
graph.addRelation(3, 5, 20);
graph.addRelation(4, 5, 20);

graph.source = graph.getNodeByIndex(1);
graph.end = graph.getNodeByIndex(5);

let presenter = new Presenter.GraphPresenter(graph,
    [
        { x: 10, y: 10 },
        { x: 60, y: 60 },
        { x: 120, y: 120 },
        { x: 180, y: 180 },
        { x: 220, y: 220 },
        { x: 270, y: 270 },
    ], 
    <HTMLCanvasElement>document.getElementById("canvas")
);
presenter.render("black", <HTMLCanvasElement>document.getElementById("canvas"))

let viz = new Vuzualizer();
viz.presenter = presenter;

let alg = new FF.FordFalkerson();
alg.runAlg(graph, viz);

document.getElementById("canvas").onclick = (e) => {
    viz.getStep(Math.floor(Math.random() * (viz.steps.length - 1)));
}

