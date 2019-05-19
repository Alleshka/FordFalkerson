

export class GraphNode {

    public index: number;
    public prevNode: GraphNode;
    public output: Relation[];
    public markData: number;

    constructor(idx: number) {
        this.index = idx;
        this.output = [];
    }
}

export class Relation {
    public d: number;
    public r: number;

    public startNode: GraphNode;
    public endNode: GraphNode;

    constructor(start: GraphNode, end: GraphNode, r: number) {
        this.startNode = start;
        this.endNode = end;
        this.r = r;
        this.d = 0;
    }
}

export class Graph {
    public nodes: GraphNode[];
    public relations: Relation[];

    public source: GraphNode;
    public end: GraphNode;


    constructor(matrix?: number[][]) {
        this.nodes = [];
        this.relations = [];

        if (matrix) {
            console.log(matrix);
        }
    }


    public addNode(node: GraphNode) {
        this.nodes.push(node);
    }

    public addRelation(idxStart: number, idxEnd: number, r: number) {
        let start: GraphNode = this.getNodeByIndex(idxStart);
        let end: GraphNode = this.getNodeByIndex(idxEnd);

        let rel = new Relation(start, end, r);
        start.output.push(rel);
        end.output.push(rel);
        this.relations.push(rel);
    }

    public getNodeByIndex(idx: number): GraphNode {
        return this.nodes.filter(x => x.index == idx)[0];
    }

    public getRelation(a: GraphNode, b: GraphNode) {
        return this.relations.filter(x => (x.startNode == a && x.endNode == b) || (x.endNode == a && x.startNode == b))[0];
    }

}