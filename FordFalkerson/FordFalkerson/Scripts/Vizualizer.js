var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { GrapthPresenter } from "./graphPresenter";
import { GraphNode, Graph } from "./graph";
import { setTimeout } from "timers";
import { FordFalkerson } from "./fordFulkersonAlg";
var Vizualizer = /** @class */ (function () {
    function Vizualizer() {
        this.steps = [];
        this.grahpGenerator = new GraphGenerator();
        this.initElements();
        this.curStep = 0;
    }
    Vizualizer.prototype.initElements = function () {
        this.resultElem = document.getElementById("result");
        this.selectElem = document.getElementById("templates");
        this.canvasElem = document.getElementById("canvas");
        this.logElem = document.getElementById("log");
        this.createModeElem = document.getElementById("createMode");
        for (var i = 0; i < this.grahpGenerator.templateCount(); i++) {
            var elem = document.createElement("option");
            elem.value = i.toString();
            elem.text = "Шаблон " + (i + 1);
            this.selectElem.add(elem, null);
        }
        this.selectElem.addEventListener("change", this.onChangeTemplate.bind(this));
        this.onChangeTemplate(); // Первичное значение
        document.getElementById("next").addEventListener("click", this.nextStep.bind(this));
        document.getElementById("auto").addEventListener("click", this.runAlgAuto.bind(this));
        document.getElementById("refresh").addEventListener("click", this.refresh.bind(this));
        this.createModeElem.addEventListener("change", this.createModeChange.bind(this));
    };
    Vizualizer.prototype.addCommand = function (cmd) {
        this.steps.push(cmd);
    };
    Vizualizer.prototype.nextStep = function () {
        if (this.curStep < this.steps.length - 1) {
            this.curStep++;
            this.steps[this.curStep].execute(this.graphPresenter);
            this.logElem.insertAdjacentText("afterbegin", "\n" + "\n" + this.steps[this.curStep].descr);
        }
    };
    Vizualizer.prototype.runAlgAuto = function () {
        var that = this;
        for (var i = 0; i < this.steps.length; i++) {
            setTimeout(function (i) {
                that.nextStep();
            }, 1500 * (i + 1));
        }
    };
    Vizualizer.prototype.refresh = function () {
        var templateNumber = Number(this.selectElem.value);
        this.graphPresenter = new GrapthPresenter(this.grahpGenerator.getGraphTemplate(templateNumber), this.canvasElem); // Генерим граф для презентера
        this.graphPresenter.render(); // Рендерим его
        this.curStep = 0;
    };
    // Если сменился шаблон
    Vizualizer.prototype.onChangeTemplate = function () {
        this.steps = [];
        this.logElem.innerText = "";
        var templateNumber = Number(this.selectElem.value);
        this.graphPresenter = new GrapthPresenter(this.grahpGenerator.getGraphTemplate(templateNumber), this.canvasElem); // Генерим граф для презентера
        this.graphPresenter.render(); // Рендерим его
        var alg = new FordFalkerson();
        var result = alg.runAlg(this.grahpGenerator.getGraphTemplate(templateNumber), this); // Сюда подставляем другой граф, чтобы он был "чистый"
        this.resultElem.innerText = "максимальный поток = " + result;
    };
    Vizualizer.prototype.createModeChange = function () {
        if (this.createModeElem.checked) {
            this.canvasElem.draggable = true;
            this.canvasElem.ondragstart = this.onDragStart.bind(this);
            this.canvasElem.ondrag = this.onDrag.bind(this);
            this.canvasElem.ondragend = this.onDragEnd.bind(this);
        }
    };
    Vizualizer.prototype.onDragStart = function (ev) {
        var node = this.graphPresenter.getNodePresenterByCoordinates(ev.offsetX, ev.offsetY);
        if (node) {
            this.graphPresenter.clearStyles();
            this.dragLine = { x1: 0, x2: 0, y1: 0, y2: 0 };
            this.dragLine.x1 = ev.offsetX;
            this.dragLine.y1 = ev.offsetY;
            node.nodeStyle = "blue";
            this.graphPresenter.render();
        }
    };
    Vizualizer.prototype.onDrag = function (ev) {
        if (this.dragLine) {
            var oldNode = this.graphPresenter.getNodePresenterByCoordinates(this.dragLine.x2, this.dragLine.y2);
            if (oldNode)
                oldNode.nodeStyle = null;
            this.dragLine.x2 = ev.offsetX;
            this.dragLine.y2 = ev.offsetY;
            var nodeStart = this.graphPresenter.getNodePresenterByCoordinates(this.dragLine.x1, this.dragLine.y1);
            if (nodeStart)
                nodeStart.nodeStyle = "blue";
            var nodeEnd = this.graphPresenter.getNodePresenterByCoordinates(this.dragLine.x2, this.dragLine.y2);
            if (nodeEnd)
                nodeEnd.nodeStyle = "blue";
            this.graphPresenter.render();
            this.graphPresenter.drawLine(this.dragLine);
        }
    };
    Vizualizer.prototype.onDragEnd = function (ev) {
        if (this.dragLine) {
            this.dragLine.x2 = ev.offsetX;
            this.dragLine.y2 = ev.offsetY;
            var nodeStart = this.graphPresenter.getNodePresenterByCoordinates(this.dragLine.x1, this.dragLine.y1);
            nodeStart.nodeStyle = null;
            var nodeEnd = this.graphPresenter.getNodePresenterByCoordinates(this.dragLine.x2, this.dragLine.y2);
            nodeEnd.nodeStyle = null;
            var r = Number(prompt("Введите вес", "10"));
            if (!isNaN(r)) {
                this.graphPresenter.addRelation(nodeStart, nodeEnd, r);
            }
            this.graphPresenter.render();
            this.dragLine = null;
        }
    };
    return Vizualizer;
}());
export { Vizualizer };
var GraphGenerator = /** @class */ (function () {
    function GraphGenerator() {
        this.templates = [];
        this.templates.push(function () {
            var graph = new Graph();
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
            this.templates.push(function () {
                var graph = new Graph();
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
    GraphGenerator.prototype.getGraphTemplate = function (templateNumber) {
        return this.templates[templateNumber]();
    };
    GraphGenerator.prototype.templateCount = function () {
        return this.templates.length;
    };
    return GraphGenerator;
}());
// ----------------------------- Описаны команды для выполнения ------------------------------------------------
var GraphCommand = /** @class */ (function () {
    function GraphCommand(name, descr) {
        this.name = name;
        this.descr = descr;
        ;
    }
    GraphCommand.prototype.execute = function (presenter) {
        this.beforeExecute(presenter);
        this.doExecute(presenter);
        this.afterExecute(presenter);
    };
    GraphCommand.prototype.undo = function (presenter) {
        this.beforeUndo(presenter);
        this.doExecute(presenter);
        this.afterUndo(presenter);
    };
    GraphCommand.prototype.beforeExecute = function (presenter) {
        console.log("exec " + this.descr);
    };
    GraphCommand.prototype.beforeUndo = function (presenter) {
        console.log("undo" + this.descr);
    };
    GraphCommand.prototype.afterExecute = function (presenter) {
        presenter.render();
    };
    GraphCommand.prototype.afterUndo = function (presenter) {
        presenter.render();
    };
    return GraphCommand;
}());
var BaseCommand = /** @class */ (function (_super) {
    __extends(BaseCommand, _super);
    function BaseCommand(name, descr, callExec, callUndo) {
        var _this = _super.call(this, name, descr) || this;
        _this.callExec = callExec;
        _this.callUndo = _this.callUndo;
        return _this;
    }
    BaseCommand.prototype.doExecute = function (graph) {
        this.callExec(graph);
    };
    BaseCommand.prototype.doUndo = function (graph) {
        this.callUndo(graph);
    };
    return BaseCommand;
}(GraphCommand));
export { BaseCommand };
// Начинает рассмотр указанной в конструкторе ячейки
var GetNodeCellCommand = /** @class */ (function (_super) {
    __extends(GetNodeCellCommand, _super);
    function GetNodeCellCommand(nodeIndex) {
        var _this = _super.call(this, "", "Выбираем вершину с индексом " + nodeIndex) || this;
        _this.index = nodeIndex;
        return _this;
    }
    GetNodeCellCommand.prototype.doExecute = function (graph) {
        graph.setNodeStyle(this.index, "red");
    };
    GetNodeCellCommand.prototype.doUndo = function (graph) {
        graph.setNodeStyle(this.index, undefined);
    };
    return GetNodeCellCommand;
}(GraphCommand));
export { GetNodeCellCommand };
// Начинает рассмотр связи между вершинами, указанными в конструктре
var GetRelationsCommand = /** @class */ (function (_super) {
    __extends(GetRelationsCommand, _super);
    function GetRelationsCommand(start, end) {
        var _this = _super.call(this, "", "Рассматриваем связь между вершинами [ " + start + " - " + end + "]") || this;
        _this.indexStart = start;
        _this.indexend = end;
        return _this;
    }
    GetRelationsCommand.prototype.doExecute = function (graph) {
        graph.setRelationStyle(this.indexStart, this.indexend, "blue");
    };
    GetRelationsCommand.prototype.doUndo = function (graph) {
        throw new Error("Method not implemented.");
    };
    return GetRelationsCommand;
}(GraphCommand));
export { GetRelationsCommand };
var SetNodeMarksCommand = /** @class */ (function (_super) {
    __extends(SetNodeMarksCommand, _super);
    function SetNodeMarksCommand(nodeIndex, prevNodeInex, mark) {
        var _this = _super.call(this, "", "Проставляем вершине " + nodeIndex + " метку") || this;
        _this.index = nodeIndex;
        _this.mark = mark;
        _this.prevNodeIndex = prevNodeInex;
        return _this;
    }
    SetNodeMarksCommand.prototype.doExecute = function (presenter) {
        var gr = presenter.getGraph();
        var node = gr.getNodeByIndex(this.index);
        node.markData = this.mark;
        node.prevNode = gr.getNodeByIndex(this.prevNodeIndex);
    };
    SetNodeMarksCommand.prototype.doUndo = function (presenter) {
        var gr = presenter.getGraph();
        var node = gr.getNodeByIndex(this.prevNodeIndex);
        node.markData = null;
        node.prevNode = null;
    };
    return SetNodeMarksCommand;
}(GraphCommand));
export { SetNodeMarksCommand };
var GetNeighBoardsCommand = /** @class */ (function (_super) {
    __extends(GetNeighBoardsCommand, _super);
    function GetNeighBoardsCommand(indexes) {
        var _this = _super.call(this, "", "Рассматриваем соседние вершины без меток или сток") || this;
        _this.indexes = indexes;
        return _this;
    }
    GetNeighBoardsCommand.prototype.doExecute = function (presenter) {
        this.indexes.forEach(function (idx) {
            presenter.setNodeStyle(idx, "green");
        });
    };
    GetNeighBoardsCommand.prototype.doUndo = function (presenter) {
        this.indexes.forEach(function (idx) {
            presenter.setNodeStyle(null, "green");
        });
    };
    return GetNeighBoardsCommand;
}(GraphCommand));
export { GetNeighBoardsCommand };
var ClearStyles = /** @class */ (function (_super) {
    __extends(ClearStyles, _super);
    function ClearStyles() {
        return _super.call(this, "", "Переход к следующему шагу") || this;
    }
    ClearStyles.prototype.doExecute = function (presenter) {
        presenter.clearStyles();
    };
    ClearStyles.prototype.doUndo = function (presenter) {
        // TODO: Сложное сохранение, надо запоминать стили
        console.log("undo???");
    };
    return ClearStyles;
}(GraphCommand));
export { ClearStyles };
var ClearMarksCommand = /** @class */ (function (_super) {
    __extends(ClearMarksCommand, _super);
    function ClearMarksCommand() {
        return _super.call(this, "", "Очищаем метки на вершинах") || this;
    }
    ClearMarksCommand.prototype.doExecute = function (presenter) {
        presenter.getGraph().nodes.forEach(function (x) {
            x.markData = 0;
            x.prevNode = null;
        });
    };
    ClearMarksCommand.prototype.doUndo = function (presenter) {
        // TODO: Сложное сохранение, надо запоминать метки
        console.log("undo???");
    };
    return ClearMarksCommand;
}(GraphCommand));
export { ClearMarksCommand };
var VisitStockCommand = /** @class */ (function (_super) {
    __extends(VisitStockCommand, _super);
    function VisitStockCommand(nodeIndex, prevNode) {
        var _this = _super.call(this, "", "Устанавливаем поток d на ребре [" + nodeIndex + " - " + prevNode + "]") || this;
        _this.index = nodeIndex;
        _this.prevNodeIndex = prevNode;
        return _this;
    }
    VisitStockCommand.prototype.doExecute = function (presenter) {
        var graph = presenter.getGraph();
        var curNode = graph.getNodeByIndex(this.index);
        var prevNode = graph.getNodeByIndex(this.prevNodeIndex);
        if (curNode != graph.source()) {
            presenter.setRelationStyle(this.index, this.prevNodeIndex, "red");
            var relation = graph.getRelation(curNode, prevNode);
            relation.d = (relation.d || 0) + curNode.markData;
            prevNode.markData = curNode.markData;
            curNode.markData = null;
            curNode = prevNode;
        }
    };
    VisitStockCommand.prototype.doUndo = function (presenter) {
        // TODO: Сложное сохранение, надо запоминать метки, родителей и подобное
        console.log("undo???");
    };
    return VisitStockCommand;
}(GraphCommand));
export { VisitStockCommand };
var EndAlgResult = /** @class */ (function (_super) {
    __extends(EndAlgResult, _super);
    function EndAlgResult(result) {
        var _this = _super.call(this, "", "Алгоритм законен. Результат = " + result) || this;
        _this.result = result;
        return _this;
    }
    EndAlgResult.prototype.doExecute = function (presenter) {
    };
    EndAlgResult.prototype.doUndo = function (presenter) {
    };
    return EndAlgResult;
}(GraphCommand));
export { EndAlgResult };
//# sourceMappingURL=Vizualizer.js.map