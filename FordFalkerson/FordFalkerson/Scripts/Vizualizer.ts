import { GrapthPresenter } from "./graphPresenter"
import { GraphNode, Graph } from "./graph";
import { setTimeout, clearTimeout } from "timers";

import { FordFalkerson } from "./fordFulkersonAlg"


export class Vizualizer {
    protected graphPresenter: GrapthPresenter;

    protected steps: GraphCommand[];
    protected curStep: number;

    protected canvasElem: HTMLCanvasElement; // Элемент презентера
    protected logElem: HTMLTextAreaElement; // Элемент лога
    protected selectElem: HTMLSelectElement; // Выбор шаблона

    protected resultElem: HTMLLabelElement; // Элемент с результатом

    protected grahpGenerator: GraphGenerator;

    constructor() {
        this.steps = [];
        this.grahpGenerator = new GraphGenerator();
        this.initElements();
        this.curStep = 0;
    }

    protected initElements(): void {
        this.resultElem = <HTMLLabelElement>document.getElementById("result");
        this.selectElem = <HTMLSelectElement>document.getElementById("templates");
        this.canvasElem = <HTMLCanvasElement>document.getElementById("canvas");
        this.logElem = <HTMLTextAreaElement>document.getElementById("log");

        for (let i = 0; i < this.grahpGenerator.templateCount(); i++) {
            let elem = document.createElement("option");
            elem.value = i.toString();
            elem.text = "Шаблон " + (i + 1);
            this.selectElem.add(elem, null);
        }

        this.selectElem.addEventListener("change", this.onChangeTemplate.bind(this));
        this.onChangeTemplate(); // Первичное значение

        (<HTMLButtonElement>document.getElementById("next")).addEventListener("click", this.nextStep.bind(this));
        (<HTMLButtonElement>document.getElementById("auto")).addEventListener("click", this.runAlgAuto.bind(this));
        (<HTMLButtonElement>document.getElementById("refresh")).addEventListener("click", this.refresh.bind(this));
    }

    public addCommand(cmd: GraphCommand) {
        this.steps.push(cmd);
    }

    public nextStep() {
        if (this.curStep < this.steps.length - 1) {
            this.curStep++;
            this.steps[this.curStep].execute(this.graphPresenter);
            this.logElem.insertAdjacentText("afterbegin","\n" + "\n" + this.steps[this.curStep].descr);
        }
    }

    protected runAlgAuto() {
        let that = this;
        for (let i = 0; i < this.steps.length; i++) {
            setTimeout(function (i) {
                that.nextStep();
            }, 1500 * (i + 1));
        }
    }

    protected refresh() {
        let templateNumber: number = Number(this.selectElem.value);

        this.graphPresenter = new GrapthPresenter(this.grahpGenerator.getGraphTemplate(templateNumber), this.canvasElem); // Генерим граф для презентера
        this.graphPresenter.render(); // Рендерим его

        this.curStep = 0;
    }

    // Если сменился шаблон
    protected onChangeTemplate() {
        this.steps = [];
        this.logElem.innerText = "";
        let templateNumber: number = Number(this.selectElem.value);

        this.graphPresenter = new GrapthPresenter(this.grahpGenerator.getGraphTemplate(templateNumber), this.canvasElem); // Генерим граф для презентера
        this.graphPresenter.render(); // Рендерим его

        let alg = new FordFalkerson();
        let result = alg.runAlg(this.grahpGenerator.getGraphTemplate(templateNumber), this); // Сюда подставляем другой граф, чтобы он был "чистый"
        this.resultElem.innerText = "максимальный поток = " + result;
    }
}

class GraphGenerator {
    private templates: (() => Graph)[];

    constructor() {
        this.templates = [];
        this.templates.push(() => {
            let graph = new Graph();
            graph.addNode(new GraphNode(1));
            graph.addNode(new GraphNode(2));
            graph.addNode(new GraphNode(3));
            graph.addNode(new GraphNode(4));
            graph.addNode(new GraphNode(5));

            graph.addRelation(1, 2, 20);
            graph.addRelation(1, 3, 30);
            graph.addRelation(1, 4, 10);
            graph.addRelation(2, 3, 40);
            graph.addRelation(2, 5, 30);
            graph.addRelation(3, 4, 10);
            graph.addRelation(3, 5, 20);
            graph.addRelation(4, 5, 20);

            graph.source(graph.getNodeByIndex(1));
            graph.stock(graph.getNodeByIndex(5));
            return graph;
        }),
            this.templates.push(() => {
                let graph = new Graph();
                graph.addNode(new GraphNode(1));
                graph.addNode(new GraphNode(2));
                graph.addNode(new GraphNode(3));
                graph.addNode(new GraphNode(4));
                graph.addNode(new GraphNode(5));
                graph.addNode(new GraphNode(6));
                graph.addNode(new GraphNode(7));
                graph.addNode(new GraphNode(8));

                graph.addRelation(1, 2, 7);
                graph.addRelation(1, 3, 4);
                graph.addRelation(1, 4, 9);
                graph.addRelation(2, 3, 3);
                graph.addRelation(2, 5, 5);
                graph.addRelation(3, 6, 11);
                graph.addRelation(4, 7, 7);
                graph.addRelation(4, 6, 3);
                graph.addRelation(5, 3, 8);
                graph.addRelation(5, 8, 3);
                graph.addRelation(7, 8, 4);
                graph.addRelation(8, 6, 2);

                graph.source(graph.getNodeByIndex(1));
                graph.stock(graph.getNodeByIndex(6));
                return graph;
            });
    }

    public getGraphTemplate(templateNumber: number): Graph {
        return this.templates[templateNumber]();
    }

    public templateCount(): number {
        return this.templates.length;
    }
}



// ----------------------------- Описаны команды для выполнения ------------------------------------------------

abstract class GraphCommand {

    public descr: string;
    public name: string;

    constructor(name: string, descr: string) {
        this.name = name;
        this.descr = descr;;
    }

    public execute(presenter: GrapthPresenter): void {
        this.beforeExecute(presenter);
        this.doExecute(presenter);
        this.afterExecute(presenter);
    }

    public undo(presenter: GrapthPresenter): void {
        this.beforeUndo(presenter);
        this.doExecute(presenter);
        this.afterUndo(presenter);
    }


    abstract doExecute(presenter: GrapthPresenter): void;
    abstract doUndo(presenter: GrapthPresenter): void;


    protected beforeExecute(presenter: GrapthPresenter): void {
        console.log("exec " + this.descr);
    }


    protected beforeUndo(presenter: GrapthPresenter): void {
        console.log("undo" + this.descr);
    }

    protected afterExecute(presenter: GrapthPresenter): void {
        presenter.render();
    }

    protected afterUndo(presenter: GrapthPresenter): void {
        presenter.render();
    }
}


export class BaseCommand extends GraphCommand {

    protected callExec: (graph: GrapthPresenter) => void;
    protected callUndo: (graph: GrapthPresenter) => void;

    constructor(name: string, descr: string, callExec: (graph: GrapthPresenter) => void, callUndo: (graph: GrapthPresenter) => void) {
        super(name, descr);
        this.callExec = callExec;
        this.callUndo = this.callUndo;
    }

    doExecute(graph: GrapthPresenter): void {
        this.callExec(graph);
    }

    doUndo(graph: GrapthPresenter): void {
        this.callUndo(graph);
    }
}

// Начинает рассмотр указанной в конструкторе ячейки
export class GetNodeCellCommand extends GraphCommand {
    protected index: number;

    constructor(nodeIndex: number) {
        super("", "Выбираем вершину с индексом " + nodeIndex);
        this.index = nodeIndex;
    }

    doExecute(graph: GrapthPresenter): void {
        graph.setNodeStyle(this.index, "red");
    }


    doUndo(graph: GrapthPresenter): void {
        graph.setNodeStyle(this.index, undefined);
    }
}

// Начинает рассмотр связи между вершинами, указанными в конструктре
export class GetRelationsCommand extends GraphCommand {

    doExecute(graph: GrapthPresenter): void {
        graph.setRelationStyle(this.indexStart, this.indexend, "blue");
    }

    doUndo(graph: GrapthPresenter): void {
        throw new Error("Method not implemented.");
    }

    protected indexStart: number;
    protected indexend: number;

    constructor(start: number, end: number) {
        super("", "Рассматриваем связь между вершинами [ " + start + " - " + end + "]");
        this.indexStart = start;
        this.indexend = end;
    }
}

export class SetNodeMarksCommand extends GraphCommand {

    protected index: number;
    protected prevNodeIndex: number;

    protected mark: number;

    doExecute(presenter: GrapthPresenter): void {
        let gr = presenter.getGraph();
        let node = gr.getNodeByIndex(this.index);

        node.markData = this.mark;
        node.prevNode = gr.getNodeByIndex(this.prevNodeIndex);
    }

    doUndo(presenter: GrapthPresenter): void {
        let gr = presenter.getGraph();
        let node = gr.getNodeByIndex(this.prevNodeIndex);

        node.markData = null;
        node.prevNode = null;
    }


    constructor(nodeIndex: number, prevNodeInex: number, mark: number) {
        super("", "Проставляем вершине " + nodeIndex + " метку");
        this.index = nodeIndex;
        this.mark = mark;
        this.prevNodeIndex = prevNodeInex;
    }
}

export class GetNeighBoardsCommand extends GraphCommand {

    protected indexes: number[];

    constructor(indexes: number[]) {
        super("", "Рассматриваем соседние вершины без меток или сток");
        this.indexes = indexes;
    }

    doExecute(presenter: GrapthPresenter): void {
        this.indexes.forEach(function (idx) {
            presenter.setNodeStyle(idx, "green");
        });
    }
    doUndo(presenter: GrapthPresenter): void {
        this.indexes.forEach(function (idx) {
            presenter.setNodeStyle(null, "green");
        });
    }
}


export class ClearStyles extends GraphCommand {

    constructor() {
        super("", "Переход к следующему шагу");
    }

    doExecute(presenter: GrapthPresenter): void {
        presenter.clearStyles();
    }

    doUndo(presenter: GrapthPresenter): void {
        // TODO: Сложное сохранение, надо запоминать стили
        console.log("undo???");
    }
}

export class ClearMarksCommand extends GraphCommand {

    constructor() {
        super("", "Очищаем метки на вершинах");
    }

    doExecute(presenter: GrapthPresenter): void {
        presenter.getGraph().nodes.forEach(x => {
            x.markData = 0;
            x.prevNode = null;
        })
    }

    doUndo(presenter: GrapthPresenter): void {
        // TODO: Сложное сохранение, надо запоминать метки
        console.log("undo???");
    }
}

export class VisitStockCommand extends GraphCommand {

    protected index: number;
    protected prevNodeIndex: number;

    constructor(nodeIndex: number, prevNode: number) {
        super("", "Устанавливаем поток d на ребре [" + nodeIndex + " - " + prevNode + "]");
        this.index = nodeIndex;
        this.prevNodeIndex = prevNode;
    }

    doExecute(presenter: GrapthPresenter): void {
        let graph = presenter.getGraph();

        let curNode = graph.getNodeByIndex(this.index);
        let prevNode = graph.getNodeByIndex(this.prevNodeIndex);

        if (curNode != graph.source()) {

            presenter.setRelationStyle(this.index, this.prevNodeIndex, "red");

            let relation = graph.getRelation(curNode, prevNode);
            relation.d = (relation.d || 0) + curNode.markData;
            prevNode.markData = curNode.markData;
            curNode.markData = null;
            curNode = prevNode;
        }
    }

    doUndo(presenter: GrapthPresenter): void {
        // TODO: Сложное сохранение, надо запоминать метки, родителей и подобное
        console.log("undo???");
    }
}

export class EndAlgResult extends GraphCommand {

    protected result: number;

    constructor(result: number) {
        super("", "Алгоритм законен. Результат = " + result);
        this.result = result;
    }

    doExecute(presenter: GrapthPresenter): void {

    }
    doUndo(presenter: GrapthPresenter): void {

    }
}