import { GrapthPresenter, LineOptions } from "./graphPresenter"
import { GraphNode, Graph } from "./graph";
import { setTimeout, clearTimeout } from "timers";

import { FordFalkerson } from "./fordFulkersonAlg"
import { request } from "https";

// Тут уже слишком много обязанностей, надо будет отрефакторить
export class Vizualizer {
    protected graphPresenter: GrapthPresenter;

    protected steps: GraphCommand[];
    protected curStep: number;

    protected canvasElem: HTMLCanvasElement; // Элемент презентера
    protected logElem: HTMLTextAreaElement; // Элемент лога
    protected selectElem: HTMLSelectElement; // Выбор шаблона

    protected resultElem: HTMLLabelElement; // Элемент с результатом
    protected createModeElem: HTMLInputElement;

    protected saveGrElem: HTMLButtonElement; // Кнопка сохранения графа

    protected grahpGenerator: GraphGenerator;

    constructor() {
        this.steps = [];
        this.grahpGenerator = new GraphGenerator();

        this.curStep = 0;

        this.initElemenst();
        this.addEvents();
    }

    protected initElemenst(): void {
        let that = this;

        this.resultElem = <HTMLLabelElement>document.getElementById("result"); // Текст с результатом
        this.selectElem = <HTMLSelectElement>document.getElementById("templates"); // dropdown с шаблонами
        this.canvasElem = <HTMLCanvasElement>document.getElementById("canvas"); // Область с отображением
        this.logElem = <HTMLTextAreaElement>document.getElementById("log"); // Лог действий
        this.createModeElem = <HTMLInputElement>document.getElementById("createMode"); // Включение/Отключение режима создания графа
        this.saveGrElem = <HTMLButtonElement>document.getElementById("saveGR"); // Кнопка создания графа

        let url = "api/saved";
        let request = new XMLHttpRequest();
        request.open("get", url);
        request.addEventListener("readystatechange", function (result) {

            if (request.readyState == 4 && request.status == 200) {
                let matrices = JSON.parse(request.responseText);
                matrices.forEach((x, i) => {
                    let elem = document.createElement("option");
                    that.grahpGenerator.addTemplate(x);
                    elem.value = i;
                    elem.text = "Шаблон " + (i + 1);
                    that.selectElem.add(elem, null);
                });

                let elem = document.createElement("option");
                elem.value = that.grahpGenerator.templateCount().toString();
                that.grahpGenerator.addTemplate(null);
                elem.text = "Новый граф";
                that.selectElem.add(elem, null);
                that.onChangeTemplate(); // Первичное значение
            }

        });
        request.send();

        document.getElementById("create").hidden = true;
    }

    protected addEvents(): void {
        this.selectElem.addEventListener("change", this.onChangeTemplate.bind(this)); // Событие смены шаблона

        (<HTMLButtonElement>document.getElementById("next")).addEventListener("click", this.nextStep.bind(this)); // Следующий шаг
        (<HTMLButtonElement>document.getElementById("auto")).addEventListener("click", this.runAlgAuto.bind(this)); // Автоматическое воспроизведение
        (<HTMLButtonElement>document.getElementById("refresh")).addEventListener("click", this.refresh.bind(this)); // Сначала

        this.createModeElem.addEventListener("change", this.createModeChange.bind(this)); // Событие включения/отключения режима создания
    }

    // Добавление команды в визуализатор
    public addCommand(cmd: GraphCommand) {
        this.steps.push(cmd);
    }

    // Показ следующего шага
    public nextStep() {
        if (this.curStep < this.steps.length - 1) {
            this.curStep++;
            this.steps[this.curStep].execute(this.graphPresenter);
            this.logElem.insertAdjacentText("afterbegin", "\n" + "\n" + this.steps[this.curStep].descr);
        }
    }

    // Автоматический прогон алгоритма
    protected runAlgAuto() {
        let that = this;
        for (let i = 0; i < this.steps.length; i++) {
            setTimeout(function (i) {
                that.nextStep();
            }, 1500 * (i + 1));
        }
    }

    // Сброс шагов алгоритма
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

        if (this.graphPresenter.getGraph().nodes.length > 0) {
            let alg = new FordFalkerson();
            let result = alg.runAlg(this.grahpGenerator.getGraphTemplate(templateNumber), this); // Сюда подставляем другой граф, чтобы он был "чистый"
            this.resultElem.innerText = "максимальный поток = " + result;
        }
    }

    protected dragLine: LineOptions;
    protected createModeChange(): void {

        let isChecked = this.createModeElem.checked;
        this.canvasElem.draggable = isChecked;
        document.getElementById("viz").hidden = isChecked;
        document.getElementById("create").hidden = !isChecked;


        if (this.createModeElem.checked) {
            this.canvasElem.addEventListener("dragstart", this.onDragStart.bind(this));
            this.canvasElem.addEventListener("drag", this.onDrag.bind(this));
            this.canvasElem.addEventListener("dragend", this.onDragEnd.bind(this));
            this.canvasElem.addEventListener("click", this.onClick.bind(this));
            this.saveGrElem.addEventListener("click", this.saveGraph.bind(this))
        }
        else {
            this.canvasElem.removeEventListener("dragstart", this.onDragStart.bind(this));
            this.canvasElem.removeEventListener("drag", this.onDrag.bind(this));
            this.canvasElem.removeEventListener("dragend", this.onDragEnd.bind(this));
            this.canvasElem.removeEventListener("click", this.onClick.bind(this));
        }
    }

    protected saveGraph(ev: MouseEvent) {
        this.createModeElem.checked = false;
        this.createModeChange();

        console.log("Типа сохранили");
    }

    protected onClick(ev: MouseEvent) {
        this.graphPresenter.addNode(ev.offsetX, ev.offsetY);
        this.graphPresenter.render();
    }

    protected onDragStart(ev: DragEvent): void {
        let node = this.graphPresenter.getNodePresenterByCoordinates(ev.offsetX, ev.offsetY);
        if (node) {
            this.graphPresenter.clearStyles();
            this.dragLine = { x1: 0, x2: 0, y1: 0, y2: 0 };
            this.dragLine.x1 = ev.offsetX;
            this.dragLine.y1 = ev.offsetY;

            node.nodeStyle = "blue";

            this.graphPresenter.render();
        }
    }

    protected onDrag(ev: DragEvent): void {
        if (this.dragLine) {
            let oldNode = this.graphPresenter.getNodePresenterByCoordinates(this.dragLine.x2, this.dragLine.y2);
            if (oldNode) oldNode.nodeStyle = null;

            this.dragLine.x2 = ev.offsetX;
            this.dragLine.y2 = ev.offsetY;


            let nodeStart = this.graphPresenter.getNodePresenterByCoordinates(this.dragLine.x1, this.dragLine.y1);
            if (nodeStart) nodeStart.nodeStyle = "blue";

            let nodeEnd = this.graphPresenter.getNodePresenterByCoordinates(this.dragLine.x2, this.dragLine.y2);
            if (nodeEnd) nodeEnd.nodeStyle = "blue";

            this.graphPresenter.render();

            this.graphPresenter.drawLine(this.dragLine);
        }
    }

    protected onDragEnd(ev: DragEvent): void {
        if (this.dragLine) {
            this.dragLine.x2 = ev.offsetX;
            this.dragLine.y2 = ev.offsetY;

            let nodeStart = this.graphPresenter.getNodePresenterByCoordinates(this.dragLine.x1, this.dragLine.y1);
            nodeStart.nodeStyle = null;

            let nodeEnd = this.graphPresenter.getNodePresenterByCoordinates(this.dragLine.x2, this.dragLine.y2);
            nodeEnd.nodeStyle = null;


            let r = Number(prompt("Введите вес", "10"));
            if (!isNaN(r)) {
                this.graphPresenter.addRelation(nodeStart, nodeEnd, r);
            }

            this.graphPresenter.render();
            this.dragLine = null;
        }
    }
}

interface GrTemplate {
    source: number,
    stock: number,
    matrix: number[][]
}

class GraphGenerator {
    private templates: GrTemplate[];

    constructor() {
        this.templates = [];
    }

    public addTemplate(template: GrTemplate) {
        console.log(template);
        this.templates.push(template);
    }

    public getGraphTemplate(templateNumber: number): Graph {
        let template = this.templates[templateNumber];
        let gr = new Graph((template && template.matrix) || null);
        if (template) {
            gr.source(gr.getNodeByIndex(template.source || 1));
            gr.stock(gr.getNodeByIndex(template.stock || gr.nodes.length - 1));
        }
        return gr;
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