import * as Gr from "./graph"

interface INodePoint {
    x: number;
    y: number;
}

interface IPresenter {
    render(style?: string | CanvasGradient | CanvasPattern, domElement?: HTMLCanvasElement) : void;
}

class NodePresenter implements IPresenter {

    public node: Gr.GraphNode;
    public point: INodePoint;
    protected dom: HTMLCanvasElement;

    constructor(node: Gr.GraphNode, point: INodePoint, domElement?: HTMLCanvasElement) {
        this.node = node;
        this.point = point;
        this.dom = domElement;
    }

    render(style?: string | CanvasGradient | CanvasPattern, domElement?: HTMLCanvasElement): void {
        domElement = domElement || this.dom;
        var context = domElement.getContext("2d");
        context.beginPath();   
        context.fillStyle = style;
        context.arc(this.point.x, this.point.y, 50, 0, 360);
        context.stroke();
    }
}

class RelationPresenter implements IPresenter {
    public relation: Gr.Relation;

    constructor(rel: Gr.Relation, domElement?: HTMLCanvasElement) {
        this.relation = rel;
    }

    render(style?: string | CanvasGradient | CanvasPattern, domElement?: HTMLCanvasElement): void {
        console.log("hi mark");
    }
}

export class GraphPresenter implements IPresenter {

    protected nodePresenters: NodePresenter[];
    protected relationPresenters: RelationPresenter[];
    protected graph: Gr.Graph;

    protected domElement: HTMLCanvasElement;

    constructor(graph: Gr.Graph, points: INodePoint[], domElement?: HTMLCanvasElement) {
        this.nodePresenters = [];
        this.relationPresenters = [];
        this.graph = graph;

        graph.nodes.forEach((node, i) => {
            this.nodePresenters.push(new NodePresenter(node, points[i] || points[0], domElement));
        });

        graph.relations.forEach(x => this.relationPresenters.push(new RelationPresenter(x, domElement)));
    }

    public render(style?: string | CanvasGradient | CanvasPattern, domElement?: HTMLCanvasElement): void {
        domElement = domElement || this.domElement;
        this.nodePresenters.forEach(x => x.render(style, domElement));
        this.relationPresenters.forEach(x => x.render(style, domElement));
    }

    public getNodePresenter(nodeIndex: number): NodePresenter {
        return this.nodePresenters.filter(x => x.node.index == nodeIndex)[0];
    }

    public getRelationPresenter(firsNode: number, seconNode: number) {
        let relData = this.graph.getRelation(this.graph.getNodeByIndex(firsNode), this.graph.getNodeByIndex(seconNode));
        return this.relationPresenters.filter(x => x.relation == relData);
    }

}