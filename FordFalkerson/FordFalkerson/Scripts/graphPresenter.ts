import { Graph, Relation, GraphNode } from "./graph"
import { start } from "repl";
import { encode } from "punycode";

interface NodePresenterOptions {
    startX: number;
    startY: number;
    radius: number;
}

export interface LineOptions {
    x1: number,
    y1: number,
    x2: number,
    y2: number
}

class NodePresenter {

    public nodeIndex(): number {
        return this.node.index;
    }

    protected node: GraphNode;

    public options: NodePresenterOptions;
    public nodeStyle: string | CanvasGradient | CanvasPattern;

    constructor(node: GraphNode) {
        this.node = node;
    }

    public render(canvasContext: CanvasRenderingContext2D): void {
        let oldStyle = canvasContext.strokeStyle;

        canvasContext.beginPath();
        canvasContext.strokeStyle = this.nodeStyle || oldStyle;
        canvasContext.arc(this.options.startX, this.options.startY, this.options.radius, 0, Math.PI * 2);

        canvasContext.textAlign = "center";
        canvasContext.font = this.options.radius * 2 + "px";
        canvasContext.strokeText(this.node.index.toString(), this.options.startX, this.options.startY, this.options.radius / 2);

        if (this.node.markData) {
            let prevNode = (this.node.prevNode && this.node.prevNode.index.toString()) || 0;
            let markData = this.node.markData;
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
    }

    public isCurNode(node: GraphNode) {
        return (node.index == this.node.index);
    }
}

class RelationPresenter {

    protected relation: Relation;
    public relationStyle: string | CanvasGradient | CanvasPattern;

    protected startNodePresenter: NodePresenter;
    protected endNodePresenter: NodePresenter;

    constructor(relation: Relation, startNode: NodePresenter, endNode: NodePresenter) {
        this.relation = relation;

        this.startNodePresenter = startNode;
        this.endNodePresenter = endNode;
    }

    public render(context: CanvasRenderingContext2D): void {


        let startNode: NodePresenter = this.startNodePresenter;
        let endNode: NodePresenter = this.endNodePresenter;

        let oldStyle = context.strokeStyle;
        context.strokeStyle = this.relationStyle || oldStyle;

        context.beginPath();


        let relationLine: LineOptions = this.getRelationLine(startNode, endNode);

        context.fillText("d = " + this.relation.d, (relationLine.x1 + relationLine.x2) / 2, (relationLine.y1 + relationLine.y2 - 20) / 2);
        context.fillText("r = " + this.relation.r, (relationLine.x1 + relationLine.x2) / 2, (relationLine.y1 + relationLine.y2 + 20) / 2);


        context.moveTo(relationLine.x1, relationLine.y1);
        context.lineTo(relationLine.x2, relationLine.y2);
        context.stroke();

        context.strokeStyle = oldStyle;
    }

    protected getRelationLine(startNode: NodePresenter, endNode: NodePresenter): LineOptions {
        let difY = endNode.options.startY - startNode.options.startY;
        let difX = endNode.options.startX - startNode.options.startX;

        let c = Math.sqrt(Math.pow(difY, 2) + Math.pow(difX, 2));
        let a = difY / c;
        let b = difX / c;
        return {
            x1: startNode.options.startX + startNode.options.radius * b,
            y1: startNode.options.startY + startNode.options.radius * a,
            x2: endNode.options.startX - endNode.options.radius * b,
            y2: endNode.options.startY - endNode.options.radius * a
        }
    }

    public isCurRelation(rel: Relation) {
        return this.relation == rel;
    }
}

export class GrapthPresenter {

    protected grath: Graph;

    protected relationPresenters: RelationPresenter[];
    protected nodePresenters: NodePresenter[];

    protected domElement: HTMLCanvasElement;

    constructor(graph: Graph, domElement: HTMLCanvasElement) {
        this.grath = graph;
        this.domElement = domElement;
        this.initPresenters(graph);
    }


    public render(sortNodes: boolean = false) {

        let context = this.domElement.getContext("2d");
        context.clearRect(0, 0, this.domElement.width, this.domElement.height);

        // Пересчёт координат и простановка
        let options: NodePresenterOptions[] = this.getNodePresenterOptions(sortNodes);
        this.nodePresenters.forEach(x => { x.options = x.options || options.shift(); x.render(context); });

        // Отрисовка связей и вызов отрисоки вершин
        this.relationPresenters.forEach(x => {
            x.render(context);
        });
    }

    public setNodeStyle(idx: number, style: string | CanvasGradient | CanvasPattern) {
        let node: NodePresenter = this.getNodePresenter(this.grath.getNodeByIndex(idx));
        node.nodeStyle = style;
    }

    public setRelationStyle(idxStart: number, idxEnd: number, style: string | CanvasGradient | CanvasPattern) {
        let relation = this.grath.getRelation(this.grath.getNodeByIndex(idxStart), this.grath.getNodeByIndex(idxEnd));
        let relPresenter = this.relationPresenters.filter(x => x.isCurRelation(relation))[0];
        relPresenter.relationStyle = style || "black";
    }

    public getGraph(): Graph {
        return this.grath;
    }

    public clearStyles(): void {
        let nodes = this.nodePresenters.filter(x => x.nodeStyle);
        nodes.forEach(x => x.nodeStyle = null);

        let rel = this.relationPresenters.filter(x => x.relationStyle);
        rel.forEach(x => x.relationStyle = null);
    }

    public addRelation(start: NodePresenter, end: NodePresenter, r: number): boolean {

        let nodeStart = this.grath.getNodeByIndex(start.nodeIndex());
        let nodeEnd = this.grath.getNodeByIndex(end.nodeIndex());
        let curRel = this.grath.getRelation(nodeStart, nodeEnd);

        if (!curRel) {
            curRel = this.grath.addRelation(nodeStart.index, nodeEnd.index, r);
            this.relationPresenters.push(new RelationPresenter(curRel, start, end));
            return true;
        }
        else {
            curRel.r = r;
            return false;
        }
    }

    public addNode(x: number, y: number): boolean {
        let node: GraphNode = new GraphNode(this.nodePresenters.length + 1);
        this.grath.addNode(node);
        let presenter: NodePresenter = new NodePresenter(node);
        presenter.options = {
            startX: x,
            startY: y,
            radius: 30
        }
        this.nodePresenters.push(presenter);
        return true;
    }

    public getNodePresenterByCoordinates(x: number, y: number): NodePresenter {
        return this.nodePresenters.filter(node => Math.pow(x - node.options.startX, 2) + Math.pow(y - node.options.startY, 2) <= Math.pow(node.options.radius, 2))[0];
    }

    public drawLine(line: LineOptions): void {
        let context = this.domElement.getContext("2d");
        context.moveTo(line.x1, line.y1);
        context.lineTo(line.x2, line.y2);
        context.stroke();
    }

    protected initPresenters(graph: Graph): void {
        let that = this;
        that.relationPresenters = [];
        that.nodePresenters = [];

        // Проходим по всем связям
        graph.relations.forEach(function (relation) {
            let firstNode = that.getNodePresenter(relation.startNode);
            let seconNode = that.getNodePresenter(relation.endNode);

            that.relationPresenters.push(new RelationPresenter(relation, firstNode, seconNode));
        });
    }

    protected getNodePresenter(node: GraphNode): NodePresenter {
        let nodePresenter: NodePresenter = this.nodePresenters.filter(x => x.isCurNode(node))[0];
        if (!nodePresenter) {
            nodePresenter = new NodePresenter(node);
            this.nodePresenters.push(nodePresenter);
        }
        return nodePresenter;
    }

    protected getNodePresenterOptions(sortNodes: boolean = false): NodePresenterOptions[] {
        let centerX = this.domElement.width / 2;
        let centerY = this.domElement.height / 2;

        let nodeCount = this.grath.nodes.length;

        let rad = Math.min(centerX, centerY) / 7;
        let grad = 2 * Math.PI / nodeCount;

        let options: NodePresenterOptions[] = [];
        for (let i = 0; i < nodeCount; i++) {
            options.push({
                startX: centerX + this.domElement.width * Math.cos(i * grad + Math.PI) / 3,
                startY: centerY + this.domElement.height * Math.sin(i * grad + Math.PI) / 3,
                radius: rad
            })
        }

        if (!sortNodes) options = options.sort((a, b) => a.startX - b.startX);
        return options;
    }
}