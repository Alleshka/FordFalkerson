﻿export class GraphNode {

    private static _emtyNode: GraphNode = new GraphNode(0);;
    public static emptyNode(): GraphNode {
        return GraphNode._emtyNode;
    }

    public index: number;
    public prevNode: GraphNode;
    public output: Relation[];
    public markData: number;

    public isStockOrEnd: boolean;

    constructor(idx: number) {
        this.index = idx;
        this.output = [];
        this.isStockOrEnd = false;
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

    protected _source: GraphNode;
    protected _stock: GraphNode;

    public source(value?: GraphNode) {
        if (value) {
            this._source = value;
            value.isStockOrEnd = true;
        }
        else {
            return this._source;
        }
    }

    public stock(value?: GraphNode) {
        if (value) {
            this._stock = value;
            value.isStockOrEnd = true;
        }
        else {
            return this._stock;
        }
    }

    constructor(matrix?: number[][]) {
        this.nodes = [];
        this.relations = [];

        if (matrix) {

            for (let i: number = 0; i < matrix.length; i++) {
                let node: GraphNode = new GraphNode(i + 1);
                this.addNode(node);
            }


            for (let i: number = 0; i < matrix.length; i++) {
                for (let j: number = i; j < matrix[i].length; j++) {
                    if (matrix[i][j] > 0) this.addRelation((i + 1), (j + 1), matrix[i][j]);
                }
            }
        }
    }

    public toOptions() {
        let matrix: number[][] = [];

        for (let i: number = 0; i < this.nodes.length; i++) {
            matrix[i] = [];
            for (let j: number = 0; j < this.nodes.length; j++) {
                let rel = this.relations.filter(rel => rel.startNode.index == (i+1) && rel.endNode.index == (j + 1))[0];
                matrix[i][j] = (rel && rel.r) || 0;
            }
        }

        return {
            source: (this.source() && this.source().index) || 1,
            stock: (this.stock() && this.stock().index) || (this.nodes.length),
            matrix: matrix
        }
    }


    public addNode(node: GraphNode) {
        this.nodes.push(node);
    }

    public addRelation(idxStart: number, idxEnd: number, r: number): Relation {
        let start: GraphNode = this.getNodeByIndex(idxStart);
        let end: GraphNode = this.getNodeByIndex(idxEnd);

        let rel = new Relation(start, end, r);
        start.output.push(rel);
        end.output.push(rel);
        this.relations.push(rel);
        return rel;
    }

    public getNodeByIndex(idx: number): GraphNode {
        return this.nodes.filter(x => x.index == idx)[0];
    }

    public getRelation(a: GraphNode, b: GraphNode) {
        return this.relations.filter(x => (x.startNode == a && x.endNode == b) || (x.endNode == a && x.startNode == b))[0];
    }

    public getNeightboards(index: number) {
        let that = this;
        let curNode = this.getNodeByIndex(index);
        return curNode.output.map(x => curNode == x.startNode ? x.endNode : x.startNode);
    }
}