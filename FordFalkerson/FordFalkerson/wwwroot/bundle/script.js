/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Vizualizer; });
/* unused harmony export BaseCommand */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return GetNodeCellCommand; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return GetRelationsCommand; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SetNodeMarksCommand; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return GetNeighBoardsCommand; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return ClearStyles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return ClearMarksCommand; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return VisitStockCommand; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return EndAlgResult; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__graphPresenter__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__graph__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_timers__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_timers___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_timers__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__fordFulkersonAlg__ = __webpack_require__(6);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




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
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_timers__["setTimeout"])(function (i) {
                that.nextStep();
            }, 1500 * (i + 1));
        }
    };
    Vizualizer.prototype.refresh = function () {
        var templateNumber = Number(this.selectElem.value);
        this.graphPresenter = new __WEBPACK_IMPORTED_MODULE_0__graphPresenter__["a" /* GrapthPresenter */](this.grahpGenerator.getGraphTemplate(templateNumber), this.canvasElem); // Генерим граф для презентера
        this.graphPresenter.render(); // Рендерим его
        this.curStep = 0;
    };
    // Если сменился шаблон
    Vizualizer.prototype.onChangeTemplate = function () {
        this.logElem.innerText = "";
        var templateNumber = Number(this.selectElem.value);
        this.graphPresenter = new __WEBPACK_IMPORTED_MODULE_0__graphPresenter__["a" /* GrapthPresenter */](this.grahpGenerator.getGraphTemplate(templateNumber), this.canvasElem); // Генерим граф для презентера
        this.graphPresenter.render(); // Рендерим его
        var alg = new __WEBPACK_IMPORTED_MODULE_3__fordFulkersonAlg__["a" /* FordFalkerson */]();
        var result = alg.runAlg(this.grahpGenerator.getGraphTemplate(templateNumber), this); // Сюда подставляем другой граф, чтобы он был "чистый"
        this.resultElem.innerText = "максимальный поток = " + result;
    };
    return Vizualizer;
}());

var GraphGenerator = /** @class */ (function () {
    function GraphGenerator() {
        this.templates = [];
        this.templates.push(function () {
            var graph = new __WEBPACK_IMPORTED_MODULE_1__graph__["a" /* Graph */]();
            graph.addNode(new __WEBPACK_IMPORTED_MODULE_1__graph__["b" /* GraphNode */](1));
            graph.addNode(new __WEBPACK_IMPORTED_MODULE_1__graph__["b" /* GraphNode */](2));
            graph.addNode(new __WEBPACK_IMPORTED_MODULE_1__graph__["b" /* GraphNode */](3));
            graph.addNode(new __WEBPACK_IMPORTED_MODULE_1__graph__["b" /* GraphNode */](4));
            graph.addNode(new __WEBPACK_IMPORTED_MODULE_1__graph__["b" /* GraphNode */](5));
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
        });
        this.templates.push(function () {
            var graph = new __WEBPACK_IMPORTED_MODULE_1__graph__["a" /* Graph */]();
            graph.addNode(new __WEBPACK_IMPORTED_MODULE_1__graph__["b" /* GraphNode */](1));
            graph.addNode(new __WEBPACK_IMPORTED_MODULE_1__graph__["b" /* GraphNode */](2));
            graph.addNode(new __WEBPACK_IMPORTED_MODULE_1__graph__["b" /* GraphNode */](3));
            graph.addNode(new __WEBPACK_IMPORTED_MODULE_1__graph__["b" /* GraphNode */](4));
            graph.addNode(new __WEBPACK_IMPORTED_MODULE_1__graph__["b" /* GraphNode */](5));
            graph.addNode(new __WEBPACK_IMPORTED_MODULE_1__graph__["b" /* GraphNode */](6));
            graph.addNode(new __WEBPACK_IMPORTED_MODULE_1__graph__["b" /* GraphNode */](7));
            graph.addNode(new __WEBPACK_IMPORTED_MODULE_1__graph__["b" /* GraphNode */](8));
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



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return GraphNode; });
/* unused harmony export Relation */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Graph; });
var GraphNode = /** @class */ (function () {
    function GraphNode(idx) {
        this.index = idx;
        this.output = [];
        this.isStockOrEnd = false;
    }
    ;
    GraphNode.emptyNode = function () {
        return GraphNode._emtyNode;
    };
    GraphNode._emtyNode = new GraphNode(0);
    return GraphNode;
}());

var Relation = /** @class */ (function () {
    function Relation(start, end, r) {
        this.startNode = start;
        this.endNode = end;
        this.r = r;
        this.d = 0;
    }
    return Relation;
}());

var Graph = /** @class */ (function () {
    function Graph(matrix) {
        this.nodes = [];
        this.relations = [];
        if (matrix) {
            console.log(matrix);
        }
    }
    Graph.prototype.source = function (value) {
        if (value) {
            this._source = value;
            value.isStockOrEnd = true;
        }
        else {
            return this._source;
        }
    };
    Graph.prototype.stock = function (value) {
        if (value) {
            this._stock = value;
            value.isStockOrEnd = true;
        }
        else {
            return this._stock;
        }
    };
    Graph.prototype.addNode = function (node) {
        this.nodes.push(node);
    };
    Graph.prototype.addRelation = function (idxStart, idxEnd, r) {
        var start = this.getNodeByIndex(idxStart);
        var end = this.getNodeByIndex(idxEnd);
        var rel = new Relation(start, end, r);
        start.output.push(rel);
        end.output.push(rel);
        this.relations.push(rel);
    };
    Graph.prototype.getNodeByIndex = function (idx) {
        return this.nodes.filter(function (x) { return x.index == idx; })[0];
    };
    Graph.prototype.getRelation = function (a, b) {
        return this.relations.filter(function (x) { return (x.startNode == a && x.endNode == b) || (x.endNode == a && x.startNode == b); })[0];
    };
    Graph.prototype.getNeightboards = function (index) {
        var that = this;
        var curNode = this.getNodeByIndex(index);
        return curNode.output.map(function (x) { return curNode == x.startNode ? x.endNode : x.startNode; });
    };
    return Graph;
}());



/***/ }),
/* 2 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(3)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(4);
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FordFalkerson; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__graph__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Vizualizer__ = __webpack_require__(0);


var FordFalkerson = /** @class */ (function () {
    function FordFalkerson() {
    }
    FordFalkerson.prototype.runAlg = function (graph, viz) {
        var that = this;
        var queue = [];
        var curNode;
        var emptyNode = new __WEBPACK_IMPORTED_MODULE_0__graph__["b" /* GraphNode */](0);
        while (true) {
            graph.source().markData = Infinity;
            graph.source().prevNode = emptyNode;
            viz.addCommand(new __WEBPACK_IMPORTED_MODULE_1__Vizualizer__["b" /* SetNodeMarksCommand */](graph.source().index, emptyNode.index, graph.source().markData)); // Команда проставки метки
            queue.push(graph.source());
            while (queue.length != 0) {
                curNode = queue.shift();
                viz.addCommand(new __WEBPACK_IMPORTED_MODULE_1__Vizualizer__["c" /* GetNodeCellCommand */](curNode.index)); // Команда рассмотрения вершины
                var neightboards = graph.getNeightboards(curNode.index).filter(function (x) {
                    var rel = graph.getRelation(curNode, x);
                    return (rel.d < rel.r) && (!x.prevNode || (x == graph.stock()));
                });
                viz.addCommand(new __WEBPACK_IMPORTED_MODULE_1__Vizualizer__["d" /* GetNeighBoardsCommand */](neightboards.map(function (x) { return x.index; }))); // Рассматриваем соседей
                neightboards.forEach(function (x) {
                    x.prevNode = curNode;
                    var relation = graph.getRelation(curNode, x);
                    viz.addCommand(new __WEBPACK_IMPORTED_MODULE_1__Vizualizer__["e" /* GetRelationsCommand */](curNode.index, x.index)); // Рассматриваем связь
                    if (relation.d < relation.r && relation.startNode == curNode) {
                        x.markData = Math.min(relation.r - relation.d, Math.abs(x.prevNode.markData));
                    }
                    else {
                        x.markData = (-1) * Math.min(Math.abs(x.prevNode.markData), relation.d);
                    }
                    viz.addCommand(new __WEBPACK_IMPORTED_MODULE_1__Vizualizer__["b" /* SetNodeMarksCommand */](x.index, x.prevNode.index, x.markData)); // Проставляем метку
                    if (x != graph.stock()) {
                        queue.push(x);
                        queue = queue.sort(that.nodeComparer);
                    }
                    else {
                        that.stockWasVisited(graph, viz);
                    }
                });
                viz.addCommand(new __WEBPACK_IMPORTED_MODULE_1__Vizualizer__["f" /* ClearStyles */]());
            }
            if (!graph.stock().prevNode)
                break;
            else {
                that.clearMarks(graph, viz);
            }
        }
        var result = 0;
        graph.source().output.forEach(function (x) { return result += x.d; });
        viz.addCommand(new __WEBPACK_IMPORTED_MODULE_1__Vizualizer__["g" /* EndAlgResult */](result));
        return result;
    };
    FordFalkerson.prototype.nodeComparer = function (a, b) {
        return a.index - b.index;
    };
    FordFalkerson.prototype.stockWasVisited = function (graph, viz) {
        var curNode = graph.stock();
        while (curNode != graph.source()) {
            viz.addCommand(new __WEBPACK_IMPORTED_MODULE_1__Vizualizer__["h" /* VisitStockCommand */](curNode.index, curNode.prevNode.index));
            var relation = graph.getRelation(curNode, curNode.prevNode);
            relation.d = (relation.d || 0) + curNode.markData;
            curNode.prevNode.markData = curNode.markData;
            curNode.markData = null;
            curNode = curNode.prevNode;
        }
        curNode.markData = Infinity;
    };
    FordFalkerson.prototype.clearMarks = function (graph, viz) {
        graph.nodes.forEach(function (x) {
            x.markData = 0;
            x.prevNode = null;
        });
        viz.addCommand(new __WEBPACK_IMPORTED_MODULE_1__Vizualizer__["i" /* ClearMarksCommand */]());
    };
    return FordFalkerson;
}());



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GrapthPresenter; });
var NodePresenter = /** @class */ (function () {
    function NodePresenter(node) {
        this.node = node;
    }
    NodePresenter.prototype.render = function (canvasContext) {
        var oldStyle = canvasContext.strokeStyle;
        canvasContext.beginPath();
        canvasContext.strokeStyle = this.nodeStyle || oldStyle;
        canvasContext.arc(this.options.startX, this.options.startY, this.options.radius, 0, Math.PI * 2);
        canvasContext.textAlign = "center";
        canvasContext.font = this.options.radius * 2 + "px";
        canvasContext.strokeText(this.node.index.toString(), this.options.startX, this.options.startY, this.options.radius / 2);
        if (this.node.markData) {
            var prevNode = (this.node.prevNode && this.node.prevNode.index.toString()) || 0;
            var markData = this.node.markData;
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
    };
    NodePresenter.prototype.isCurNode = function (node) {
        return (node.index == this.node.index);
    };
    return NodePresenter;
}());
var RelationPresenter = /** @class */ (function () {
    function RelationPresenter(relation, startNode, endNode) {
        this.relation = relation;
        this.startNodePresenter = startNode;
        this.endNodePresenter = endNode;
    }
    RelationPresenter.prototype.render = function (context) {
        var startNode = this.startNodePresenter;
        var endNode = this.endNodePresenter;
        var oldStyle = context.strokeStyle;
        context.strokeStyle = this.relationStyle || oldStyle;
        context.beginPath();
        var relationLine = this.getRelationLine(startNode, endNode);
        context.fillText("d = " + this.relation.d, (relationLine.x1 + relationLine.x2) / 2, (relationLine.y1 + relationLine.y2 - 20) / 2);
        context.fillText("r = " + this.relation.r, (relationLine.x1 + relationLine.x2) / 2, (relationLine.y1 + relationLine.y2 + 20) / 2);
        context.moveTo(relationLine.x1, relationLine.y1);
        context.lineTo(relationLine.x2, relationLine.y2);
        context.stroke();
        context.strokeStyle = oldStyle;
    };
    RelationPresenter.prototype.getRelationLine = function (startNode, endNode) {
        var difY = endNode.options.startY - startNode.options.startY;
        var difX = endNode.options.startX - startNode.options.startX;
        var c = Math.sqrt(Math.pow(difY, 2) + Math.pow(difX, 2));
        var a = difY / c;
        var b = difX / c;
        return {
            x1: startNode.options.startX + startNode.options.radius * b,
            y1: startNode.options.startY + startNode.options.radius * a,
            x2: endNode.options.startX - endNode.options.radius * b,
            y2: endNode.options.startY - endNode.options.radius * a
        };
    };
    RelationPresenter.prototype.isCurRelation = function (rel) {
        return this.relation == rel;
    };
    return RelationPresenter;
}());
var GrapthPresenter = /** @class */ (function () {
    function GrapthPresenter(graph, domElement) {
        this.grath = graph;
        this.domElement = domElement;
        this.initPresenters(graph);
    }
    GrapthPresenter.prototype.render = function (sortNodes) {
        if (sortNodes === void 0) { sortNodes = false; }
        var context = this.domElement.getContext("2d");
        context.clearRect(0, 0, this.domElement.width, this.domElement.height);
        // Пересчёт координат и простановка
        var options = this.getNodePresenterOptions(sortNodes);
        this.nodePresenters.forEach(function (x) { x.options = options.shift(); x.render(context); });
        // Отрисовка связей и вызов отрисоки вершин
        this.relationPresenters.forEach(function (x) {
            x.render(context);
        });
    };
    GrapthPresenter.prototype.setNodeStyle = function (idx, style) {
        var node = this.getNodePresenter(this.grath.getNodeByIndex(idx));
        node.nodeStyle = style;
    };
    GrapthPresenter.prototype.setRelationStyle = function (idxStart, idxEnd, style) {
        var relation = this.grath.getRelation(this.grath.getNodeByIndex(idxStart), this.grath.getNodeByIndex(idxEnd));
        var relPresenter = this.relationPresenters.filter(function (x) { return x.isCurRelation(relation); })[0];
        relPresenter.relationStyle = style || "black";
    };
    GrapthPresenter.prototype.getGraph = function () {
        return this.grath;
    };
    GrapthPresenter.prototype.clearStyles = function () {
        var nodes = this.nodePresenters.filter(function (x) { return x.nodeStyle; });
        nodes.forEach(function (x) { return x.nodeStyle = null; });
        var rel = this.relationPresenters.filter(function (x) { return x.relationStyle; });
        rel.forEach(function (x) { return x.relationStyle = null; });
    };
    GrapthPresenter.prototype.initPresenters = function (graph) {
        var that = this;
        that.relationPresenters = [];
        that.nodePresenters = [];
        // Проходим по всем связям
        graph.relations.forEach(function (relation) {
            var firstNode = that.getNodePresenter(relation.startNode);
            var seconNode = that.getNodePresenter(relation.endNode);
            that.relationPresenters.push(new RelationPresenter(relation, firstNode, seconNode));
        });
    };
    GrapthPresenter.prototype.getNodePresenter = function (node) {
        var nodePresenter = this.nodePresenters.filter(function (x) { return x.isCurNode(node); })[0];
        if (!nodePresenter) {
            nodePresenter = new NodePresenter(node);
            this.nodePresenters.push(nodePresenter);
        }
        return nodePresenter;
    };
    GrapthPresenter.prototype.getNodePresenterOptions = function (sortNodes) {
        if (sortNodes === void 0) { sortNodes = false; }
        var centerX = this.domElement.width / 2;
        var centerY = this.domElement.height / 2;
        var nodeCount = this.grath.nodes.length;
        var rad = Math.min(centerX, centerY) / 7;
        var grad = 2 * Math.PI / nodeCount;
        var options = [];
        for (var i = 0; i < nodeCount; i++) {
            options.push({
                startX: centerX + this.domElement.width * Math.cos(i * grad + Math.PI) / 3,
                startY: centerY + this.domElement.height * Math.sin(i * grad + Math.PI) / 3,
                radius: rad
            });
        }
        if (!sortNodes)
            options = options.sort(function (a, b) { return a.startX - b.startX; });
        return options;
    };
    return GrapthPresenter;
}());



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Vizualizer__ = __webpack_require__(0);

var viz = new __WEBPACK_IMPORTED_MODULE_0__Vizualizer__["a" /* Vizualizer */]();


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTFiZGZmYThkMTMxOTdiZmY3NzUiLCJ3ZWJwYWNrOi8vLy4vU2NyaXB0cy9WaXp1YWxpemVyLnRzIiwid2VicGFjazovLy8uL1NjcmlwdHMvZ3JhcGgudHMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9+L3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9+L3NldGltbWVkaWF0ZS9zZXRJbW1lZGlhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi90aW1lcnMtYnJvd3NlcmlmeS9tYWluLmpzIiwid2VicGFjazovLy8uL1NjcmlwdHMvZm9yZEZ1bGtlcnNvbkFsZy50cyIsIndlYnBhY2s6Ly8vLi9TY3JpcHRzL2dyYXBoUHJlc2VudGVyLnRzIiwid2VicGFjazovLy8uL1NjcmlwdHMvbWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hFa0Q7QUFDUDtBQUNPO0FBRUE7QUFHbEQ7SUFjSTtRQUNJLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FB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Q0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUNBQXFDOztBQUVyQztBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixVQUFVOzs7Ozs7O0FDdkx0QztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsaUJBQWlCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwwQ0FBMEMsc0JBQXNCLEVBQUU7QUFDbEU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFVBQVU7QUFDVjtBQUNBOztBQUVBLEtBQUs7QUFDTDtBQUNBOztBQUVBLEtBQUs7QUFDTDtBQUNBOztBQUVBLEtBQUs7QUFDTDtBQUNBOztBQUVBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7O0FDekxEO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQSxtQkFBTyxDQUFDLENBQWM7QUFDdEI7QUFDQTtBQUNBO0FB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QU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFDTCxzQkFBQztBQUFELENBQUM7Ozs7Ozs7OztBQ2xPRDtBQUFBO0FBQTJDO0FBQzNDLElBQUksR0FBRyxHQUFHLElBQUksK0RBQXFCLEVBQUUsQ0FBQyIsImZpbGUiOiJzY3JpcHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDExYmRmZmE4ZDEzMTk3YmZmNzc1IiwiaW1wb3J0IHsgR3JhcHRoUHJlc2VudGVyIH0gZnJvbSBcIi4vZ3JhcGhQcmVzZW50ZXJcIlxyXG5pbXBvcnQgeyBHcmFwaE5vZGUsIEdyYXBoIH0gZnJvbSBcIi4vZ3JhcGhcIjtcclxuaW1wb3J0IHsgc2V0VGltZW91dCwgY2xlYXJUaW1lb3V0IH0gZnJvbSBcInRpbWVyc1wiO1xyXG5cclxuaW1wb3J0IHsgRm9yZEZhbGtlcnNvbiB9IGZyb20gXCIuL2ZvcmRGdWxrZXJzb25BbGdcIlxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBWaXp1YWxpemVyIHtcclxuICAgIHByb3RlY3RlZCBncmFwaFByZXNlbnRlcjogR3JhcHRoUHJlc2VudGVyO1xyXG5cclxuICAgIHByb3RlY3RlZCBzdGVwczogR3JhcGhDb21tYW5kW107XHJcbiAgICBwcm90ZWN0ZWQgY3VyU3RlcDogbnVtYmVyO1xyXG5cclxuICAgIHByb3RlY3RlZCBjYW52YXNFbGVtOiBIVE1MQ2FudmFzRWxlbWVudDsgLy8g0K3Qu9C10LzQtdC90YIg0L/RgNC10LfQtdC90YLQtdGA0LBcclxuICAgIHByb3RlY3RlZCBsb2dFbGVtOiBIVE1MVGV4dEFyZWFFbGVtZW50OyAvLyDQrdC70LXQvNC10L3RgiDQu9C+0LPQsFxyXG4gICAgcHJvdGVjdGVkIHNlbGVjdEVsZW06IEhUTUxTZWxlY3RFbGVtZW50OyAvLyDQktGL0LHQvtGAINGI0LDQsdC70L7QvdCwXHJcblxyXG4gICAgcHJvdGVjdGVkIHJlc3VsdEVsZW06IEhUTUxMYWJlbEVsZW1lbnQ7IC8vINCt0LvQtdC80LXQvdGCINGBINGA0LXQt9GD0LvRjNGC0LDRgtC+0LxcclxuXHJcbiAgICBwcm90ZWN0ZWQgZ3JhaHBHZW5lcmF0b3I6IEdyYXBoR2VuZXJhdG9yO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuc3RlcHMgPSBbXTtcclxuICAgICAgICB0aGlzLmdyYWhwR2VuZXJhdG9yID0gbmV3IEdyYXBoR2VuZXJhdG9yKCk7XHJcbiAgICAgICAgdGhpcy5pbml0RWxlbWVudHMoKTtcclxuICAgICAgICB0aGlzLmN1clN0ZXAgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0RWxlbWVudHMoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5yZXN1bHRFbGVtID0gPEhUTUxMYWJlbEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZXN1bHRcIik7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RFbGVtID0gPEhUTUxTZWxlY3RFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGVtcGxhdGVzXCIpO1xyXG4gICAgICAgIHRoaXMuY2FudmFzRWxlbSA9IDxIVE1MQ2FudmFzRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbnZhc1wiKTtcclxuICAgICAgICB0aGlzLmxvZ0VsZW0gPSA8SFRNTFRleHRBcmVhRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ1wiKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmdyYWhwR2VuZXJhdG9yLnRlbXBsYXRlQ291bnQoKTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBlbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcclxuICAgICAgICAgICAgZWxlbS52YWx1ZSA9IGkudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgZWxlbS50ZXh0ID0gXCLQqNCw0LHQu9C+0L0gXCIgKyAoaSArIDEpO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdEVsZW0uYWRkKGVsZW0sIG51bGwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zZWxlY3RFbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgdGhpcy5vbkNoYW5nZVRlbXBsYXRlLmJpbmQodGhpcykpO1xyXG4gICAgICAgIHRoaXMub25DaGFuZ2VUZW1wbGF0ZSgpOyAvLyDQn9C10YDQstC40YfQvdC+0LUg0LfQvdCw0YfQtdC90LjQtVxyXG5cclxuICAgICAgICAoPEhUTUxCdXR0b25FbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmV4dFwiKSkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMubmV4dFN0ZXAuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgKDxIVE1MQnV0dG9uRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImF1dG9cIikpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnJ1bkFsZ0F1dG8uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgKDxIVE1MQnV0dG9uRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlZnJlc2hcIikpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnJlZnJlc2guYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZENvbW1hbmQoY21kOiBHcmFwaENvbW1hbmQpIHtcclxuICAgICAgICB0aGlzLnN0ZXBzLnB1c2goY21kKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbmV4dFN0ZXAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VyU3RlcCA8IHRoaXMuc3RlcHMubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLmN1clN0ZXArKztcclxuICAgICAgICAgICAgdGhpcy5zdGVwc1t0aGlzLmN1clN0ZXBdLmV4ZWN1dGUodGhpcy5ncmFwaFByZXNlbnRlcik7XHJcbiAgICAgICAgICAgIHRoaXMubG9nRWxlbS5pbnNlcnRBZGphY2VudFRleHQoXCJhZnRlcmJlZ2luXCIsXCJcXG5cIiArIFwiXFxuXCIgKyB0aGlzLnN0ZXBzW3RoaXMuY3VyU3RlcF0uZGVzY3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgcnVuQWxnQXV0bygpIHtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnN0ZXBzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKGkpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQubmV4dFN0ZXAoKTtcclxuICAgICAgICAgICAgfSwgMTUwMCAqIChpICsgMSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgcmVmcmVzaCgpIHtcclxuICAgICAgICBsZXQgdGVtcGxhdGVOdW1iZXI6IG51bWJlciA9IE51bWJlcih0aGlzLnNlbGVjdEVsZW0udmFsdWUpO1xyXG5cclxuICAgICAgICB0aGlzLmdyYXBoUHJlc2VudGVyID0gbmV3IEdyYXB0aFByZXNlbnRlcih0aGlzLmdyYWhwR2VuZXJhdG9yLmdldEdyYXBoVGVtcGxhdGUodGVtcGxhdGVOdW1iZXIpLCB0aGlzLmNhbnZhc0VsZW0pOyAvLyDQk9C10L3QtdGA0LjQvCDQs9GA0LDRhCDQtNC70Y8g0L/RgNC10LfQtdC90YLQtdGA0LBcclxuICAgICAgICB0aGlzLmdyYXBoUHJlc2VudGVyLnJlbmRlcigpOyAvLyDQoNC10L3QtNC10YDQuNC8INC10LPQvlxyXG5cclxuICAgICAgICB0aGlzLmN1clN0ZXAgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8vINCV0YHQu9C4INGB0LzQtdC90LjQu9GB0Y8g0YjQsNCx0LvQvtC9XHJcbiAgICBwcm90ZWN0ZWQgb25DaGFuZ2VUZW1wbGF0ZSgpIHtcclxuICAgICAgICB0aGlzLmxvZ0VsZW0uaW5uZXJUZXh0ID0gXCJcIjtcclxuICAgICAgICBsZXQgdGVtcGxhdGVOdW1iZXI6IG51bWJlciA9IE51bWJlcih0aGlzLnNlbGVjdEVsZW0udmFsdWUpO1xyXG5cclxuICAgICAgICB0aGlzLmdyYXBoUHJlc2VudGVyID0gbmV3IEdyYXB0aFByZXNlbnRlcih0aGlzLmdyYWhwR2VuZXJhdG9yLmdldEdyYXBoVGVtcGxhdGUodGVtcGxhdGVOdW1iZXIpLCB0aGlzLmNhbnZhc0VsZW0pOyAvLyDQk9C10L3QtdGA0LjQvCDQs9GA0LDRhCDQtNC70Y8g0L/RgNC10LfQtdC90YLQtdGA0LBcclxuICAgICAgICB0aGlzLmdyYXBoUHJlc2VudGVyLnJlbmRlcigpOyAvLyDQoNC10L3QtNC10YDQuNC8INC10LPQvlxyXG5cclxuICAgICAgICBsZXQgYWxnID0gbmV3IEZvcmRGYWxrZXJzb24oKTtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gYWxnLnJ1bkFsZyh0aGlzLmdyYWhwR2VuZXJhdG9yLmdldEdyYXBoVGVtcGxhdGUodGVtcGxhdGVOdW1iZXIpLCB0aGlzKTsgLy8g0KHRjtC00LAg0L/QvtC00YHRgtCw0LLQu9GP0LXQvCDQtNGA0YPQs9C+0Lkg0LPRgNCw0YQsINGH0YLQvtCx0Ysg0L7QvSDQsdGL0LsgXCLRh9C40YHRgtGL0LlcIlxyXG4gICAgICAgIHRoaXMucmVzdWx0RWxlbS5pbm5lclRleHQgPSBcItC80LDQutGB0LjQvNCw0LvRjNC90YvQuSDQv9C+0YLQvtC6ID0gXCIgKyByZXN1bHQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEdyYXBoR2VuZXJhdG9yIHtcclxuICAgIHByaXZhdGUgdGVtcGxhdGVzOiAoKCkgPT4gR3JhcGgpW107XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy50ZW1wbGF0ZXMgPSBbXTtcclxuICAgICAgICB0aGlzLnRlbXBsYXRlcy5wdXNoKCgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGdyYXBoID0gbmV3IEdyYXBoKCk7XHJcbiAgICAgICAgICAgIGdyYXBoLmFkZE5vZGUobmV3IEdyYXBoTm9kZSgxKSk7XHJcbiAgICAgICAgICAgIGdyYXBoLmFkZE5vZGUobmV3IEdyYXBoTm9kZSgyKSk7XHJcbiAgICAgICAgICAgIGdyYXBoLmFkZE5vZGUobmV3IEdyYXBoTm9kZSgzKSk7XHJcbiAgICAgICAgICAgIGdyYXBoLmFkZE5vZGUobmV3IEdyYXBoTm9kZSg0KSk7XHJcbiAgICAgICAgICAgIGdyYXBoLmFkZE5vZGUobmV3IEdyYXBoTm9kZSg1KSk7XHJcblxyXG4gICAgICAgICAgICBncmFwaC5hZGRSZWxhdGlvbigxLCAyLCAyMCk7XHJcbiAgICAgICAgICAgIGdyYXBoLmFkZFJlbGF0aW9uKDEsIDMsIDMwKTtcclxuICAgICAgICAgICAgZ3JhcGguYWRkUmVsYXRpb24oMSwgNCwgMTApO1xyXG4gICAgICAgICAgICBncmFwaC5hZGRSZWxhdGlvbigyLCAzLCA0MCk7XHJcbiAgICAgICAgICAgIGdyYXBoLmFkZFJlbGF0aW9uKDIsIDUsIDMwKTtcclxuICAgICAgICAgICAgZ3JhcGguYWRkUmVsYXRpb24oMywgNCwgMTApO1xyXG4gICAgICAgICAgICBncmFwaC5hZGRSZWxhdGlvbigzLCA1LCAyMCk7XHJcbiAgICAgICAgICAgIGdyYXBoLmFkZFJlbGF0aW9uKDQsIDUsIDIwKTtcclxuXHJcbiAgICAgICAgICAgIGdyYXBoLnNvdXJjZShncmFwaC5nZXROb2RlQnlJbmRleCgxKSk7XHJcbiAgICAgICAgICAgIGdyYXBoLnN0b2NrKGdyYXBoLmdldE5vZGVCeUluZGV4KDUpKTtcclxuICAgICAgICAgICAgcmV0dXJuIGdyYXBoO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy50ZW1wbGF0ZXMucHVzaCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBncmFwaCA9IG5ldyBHcmFwaCgpO1xyXG4gICAgICAgICAgICBncmFwaC5hZGROb2RlKG5ldyBHcmFwaE5vZGUoMSkpO1xyXG4gICAgICAgICAgICBncmFwaC5hZGROb2RlKG5ldyBHcmFwaE5vZGUoMikpO1xyXG4gICAgICAgICAgICBncmFwaC5hZGROb2RlKG5ldyBHcmFwaE5vZGUoMykpO1xyXG4gICAgICAgICAgICBncmFwaC5hZGROb2RlKG5ldyBHcmFwaE5vZGUoNCkpO1xyXG4gICAgICAgICAgICBncmFwaC5hZGROb2RlKG5ldyBHcmFwaE5vZGUoNSkpO1xyXG4gICAgICAgICAgICBncmFwaC5hZGROb2RlKG5ldyBHcmFwaE5vZGUoNikpO1xyXG4gICAgICAgICAgICBncmFwaC5hZGROb2RlKG5ldyBHcmFwaE5vZGUoNykpO1xyXG4gICAgICAgICAgICBncmFwaC5hZGROb2RlKG5ldyBHcmFwaE5vZGUoOCkpO1xyXG5cclxuICAgICAgICAgICAgZ3JhcGguYWRkUmVsYXRpb24oMSwgMiwgNyk7XHJcbiAgICAgICAgICAgIGdyYXBoLmFkZFJlbGF0aW9uKDEsIDMsIDQpO1xyXG4gICAgICAgICAgICBncmFwaC5hZGRSZWxhdGlvbigxLCA0LCA5KTtcclxuICAgICAgICAgICAgZ3JhcGguYWRkUmVsYXRpb24oMiwgMywgMyk7XHJcbiAgICAgICAgICAgIGdyYXBoLmFkZFJlbGF0aW9uKDIsIDUsIDUpO1xyXG4gICAgICAgICAgICBncmFwaC5hZGRSZWxhdGlvbigzLCA2LCAxMSk7XHJcbiAgICAgICAgICAgIGdyYXBoLmFkZFJlbGF0aW9uKDQsIDcsIDcpO1xyXG4gICAgICAgICAgICBncmFwaC5hZGRSZWxhdGlvbig0LCA2LCAzKTtcclxuICAgICAgICAgICAgZ3JhcGguYWRkUmVsYXRpb24oNSwgMywgOCk7XHJcbiAgICAgICAgICAgIGdyYXBoLmFkZFJlbGF0aW9uKDUsIDgsIDMpO1xyXG4gICAgICAgICAgICBncmFwaC5hZGRSZWxhdGlvbig3LCA4LCA0KTtcclxuICAgICAgICAgICAgZ3JhcGguYWRkUmVsYXRpb24oOCwgNiwgMik7XHJcblxyXG4gICAgICAgICAgICBncmFwaC5zb3VyY2UoZ3JhcGguZ2V0Tm9kZUJ5SW5kZXgoMSkpO1xyXG4gICAgICAgICAgICBncmFwaC5zdG9jayhncmFwaC5nZXROb2RlQnlJbmRleCg2KSk7XHJcbiAgICAgICAgICAgIHJldHVybiBncmFwaDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0R3JhcGhUZW1wbGF0ZSh0ZW1wbGF0ZU51bWJlcjogbnVtYmVyKTogR3JhcGgge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRlbXBsYXRlc1t0ZW1wbGF0ZU51bWJlcl0oKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdGVtcGxhdGVDb3VudCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRlbXBsYXRlcy5sZW5ndGg7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0g0J7Qv9C40YHQsNC90Ysg0LrQvtC80LDQvdC00Ysg0LTQu9GPINCy0YvQv9C+0LvQvdC10L3QuNGPIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuYWJzdHJhY3QgY2xhc3MgR3JhcGhDb21tYW5kIHtcclxuXHJcbiAgICBwdWJsaWMgZGVzY3I6IHN0cmluZztcclxuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBkZXNjcjogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLmRlc2NyID0gZGVzY3I7O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBleGVjdXRlKHByZXNlbnRlcjogR3JhcHRoUHJlc2VudGVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5iZWZvcmVFeGVjdXRlKHByZXNlbnRlcik7XHJcbiAgICAgICAgdGhpcy5kb0V4ZWN1dGUocHJlc2VudGVyKTtcclxuICAgICAgICB0aGlzLmFmdGVyRXhlY3V0ZShwcmVzZW50ZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1bmRvKHByZXNlbnRlcjogR3JhcHRoUHJlc2VudGVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5iZWZvcmVVbmRvKHByZXNlbnRlcik7XHJcbiAgICAgICAgdGhpcy5kb0V4ZWN1dGUocHJlc2VudGVyKTtcclxuICAgICAgICB0aGlzLmFmdGVyVW5kbyhwcmVzZW50ZXIpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBhYnN0cmFjdCBkb0V4ZWN1dGUocHJlc2VudGVyOiBHcmFwdGhQcmVzZW50ZXIpOiB2b2lkO1xyXG4gICAgYWJzdHJhY3QgZG9VbmRvKHByZXNlbnRlcjogR3JhcHRoUHJlc2VudGVyKTogdm9pZDtcclxuXHJcblxyXG4gICAgcHJvdGVjdGVkIGJlZm9yZUV4ZWN1dGUocHJlc2VudGVyOiBHcmFwdGhQcmVzZW50ZXIpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImV4ZWMgXCIgKyB0aGlzLmRlc2NyKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJvdGVjdGVkIGJlZm9yZVVuZG8ocHJlc2VudGVyOiBHcmFwdGhQcmVzZW50ZXIpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInVuZG9cIiArIHRoaXMuZGVzY3IpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBhZnRlckV4ZWN1dGUocHJlc2VudGVyOiBHcmFwdGhQcmVzZW50ZXIpOiB2b2lkIHtcclxuICAgICAgICBwcmVzZW50ZXIucmVuZGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGFmdGVyVW5kbyhwcmVzZW50ZXI6IEdyYXB0aFByZXNlbnRlcik6IHZvaWQge1xyXG4gICAgICAgIHByZXNlbnRlci5yZW5kZXIoKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBCYXNlQ29tbWFuZCBleHRlbmRzIEdyYXBoQ29tbWFuZCB7XHJcblxyXG4gICAgcHJvdGVjdGVkIGNhbGxFeGVjOiAoZ3JhcGg6IEdyYXB0aFByZXNlbnRlcikgPT4gdm9pZDtcclxuICAgIHByb3RlY3RlZCBjYWxsVW5kbzogKGdyYXBoOiBHcmFwdGhQcmVzZW50ZXIpID0+IHZvaWQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBkZXNjcjogc3RyaW5nLCBjYWxsRXhlYzogKGdyYXBoOiBHcmFwdGhQcmVzZW50ZXIpID0+IHZvaWQsIGNhbGxVbmRvOiAoZ3JhcGg6IEdyYXB0aFByZXNlbnRlcikgPT4gdm9pZCkge1xyXG4gICAgICAgIHN1cGVyKG5hbWUsIGRlc2NyKTtcclxuICAgICAgICB0aGlzLmNhbGxFeGVjID0gY2FsbEV4ZWM7XHJcbiAgICAgICAgdGhpcy5jYWxsVW5kbyA9IHRoaXMuY2FsbFVuZG87XHJcbiAgICB9XHJcblxyXG4gICAgZG9FeGVjdXRlKGdyYXBoOiBHcmFwdGhQcmVzZW50ZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNhbGxFeGVjKGdyYXBoKTtcclxuICAgIH1cclxuXHJcbiAgICBkb1VuZG8oZ3JhcGg6IEdyYXB0aFByZXNlbnRlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY2FsbFVuZG8oZ3JhcGgpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyDQndCw0YfQuNC90LDQtdGCINGA0LDRgdGB0LzQvtGC0YAg0YPQutCw0LfQsNC90L3QvtC5INCyINC60L7QvdGB0YLRgNGD0LrRgtC+0YDQtSDRj9GH0LXQudC60LhcclxuZXhwb3J0IGNsYXNzIEdldE5vZGVDZWxsQ29tbWFuZCBleHRlbmRzIEdyYXBoQ29tbWFuZCB7XHJcbiAgICBwcm90ZWN0ZWQgaW5kZXg6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihub2RlSW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIHN1cGVyKFwiXCIsIFwi0JLRi9Cx0LjRgNCw0LXQvCDQstC10YDRiNC40L3RgyDRgSDQuNC90LTQtdC60YHQvtC8IFwiICsgbm9kZUluZGV4KTtcclxuICAgICAgICB0aGlzLmluZGV4ID0gbm9kZUluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIGRvRXhlY3V0ZShncmFwaDogR3JhcHRoUHJlc2VudGVyKTogdm9pZCB7XHJcbiAgICAgICAgZ3JhcGguc2V0Tm9kZVN0eWxlKHRoaXMuaW5kZXgsIFwicmVkXCIpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBkb1VuZG8oZ3JhcGg6IEdyYXB0aFByZXNlbnRlcik6IHZvaWQge1xyXG4gICAgICAgIGdyYXBoLnNldE5vZGVTdHlsZSh0aGlzLmluZGV4LCB1bmRlZmluZWQpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyDQndCw0YfQuNC90LDQtdGCINGA0LDRgdGB0LzQvtGC0YAg0YHQstGP0LfQuCDQvNC10LbQtNGDINCy0LXRgNGI0LjQvdCw0LzQuCwg0YPQutCw0LfQsNC90L3Ri9C80Lgg0LIg0LrQvtC90YHRgtGA0YPQutGC0YDQtVxyXG5leHBvcnQgY2xhc3MgR2V0UmVsYXRpb25zQ29tbWFuZCBleHRlbmRzIEdyYXBoQ29tbWFuZCB7XHJcblxyXG4gICAgZG9FeGVjdXRlKGdyYXBoOiBHcmFwdGhQcmVzZW50ZXIpOiB2b2lkIHtcclxuICAgICAgICBncmFwaC5zZXRSZWxhdGlvblN0eWxlKHRoaXMuaW5kZXhTdGFydCwgdGhpcy5pbmRleGVuZCwgXCJibHVlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGRvVW5kbyhncmFwaDogR3JhcHRoUHJlc2VudGVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWV0aG9kIG5vdCBpbXBsZW1lbnRlZC5cIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGluZGV4U3RhcnQ6IG51bWJlcjtcclxuICAgIHByb3RlY3RlZCBpbmRleGVuZDogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyKSB7XHJcbiAgICAgICAgc3VwZXIoXCJcIiwgXCLQoNCw0YHRgdC80LDRgtGA0LjQstCw0LXQvCDRgdCy0Y/Qt9GMINC80LXQttC00YMg0LLQtdGA0YjQuNC90LDQvNC4IFsgXCIgKyBzdGFydCArIFwiIC0gXCIgKyBlbmQgKyBcIl1cIik7XHJcbiAgICAgICAgdGhpcy5pbmRleFN0YXJ0ID0gc3RhcnQ7XHJcbiAgICAgICAgdGhpcy5pbmRleGVuZCA9IGVuZDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNldE5vZGVNYXJrc0NvbW1hbmQgZXh0ZW5kcyBHcmFwaENvbW1hbmQge1xyXG5cclxuICAgIHByb3RlY3RlZCBpbmRleDogbnVtYmVyO1xyXG4gICAgcHJvdGVjdGVkIHByZXZOb2RlSW5kZXg6IG51bWJlcjtcclxuXHJcbiAgICBwcm90ZWN0ZWQgbWFyazogbnVtYmVyO1xyXG5cclxuICAgIGRvRXhlY3V0ZShwcmVzZW50ZXI6IEdyYXB0aFByZXNlbnRlcik6IHZvaWQge1xyXG4gICAgICAgIGxldCBnciA9IHByZXNlbnRlci5nZXRHcmFwaCgpO1xyXG4gICAgICAgIGxldCBub2RlID0gZ3IuZ2V0Tm9kZUJ5SW5kZXgodGhpcy5pbmRleCk7XHJcblxyXG4gICAgICAgIG5vZGUubWFya0RhdGEgPSB0aGlzLm1hcms7XHJcbiAgICAgICAgbm9kZS5wcmV2Tm9kZSA9IGdyLmdldE5vZGVCeUluZGV4KHRoaXMucHJldk5vZGVJbmRleCk7XHJcbiAgICB9XHJcblxyXG4gICAgZG9VbmRvKHByZXNlbnRlcjogR3JhcHRoUHJlc2VudGVyKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGdyID0gcHJlc2VudGVyLmdldEdyYXBoKCk7XHJcbiAgICAgICAgbGV0IG5vZGUgPSBnci5nZXROb2RlQnlJbmRleCh0aGlzLnByZXZOb2RlSW5kZXgpO1xyXG5cclxuICAgICAgICBub2RlLm1hcmtEYXRhID0gbnVsbDtcclxuICAgICAgICBub2RlLnByZXZOb2RlID0gbnVsbDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgY29uc3RydWN0b3Iobm9kZUluZGV4OiBudW1iZXIsIHByZXZOb2RlSW5leDogbnVtYmVyLCBtYXJrOiBudW1iZXIpIHtcclxuICAgICAgICBzdXBlcihcIlwiLCBcItCf0YDQvtGB0YLQsNCy0LvRj9C10Lwg0LLQtdGA0YjQuNC90LUgXCIgKyBub2RlSW5kZXggKyBcIiDQvNC10YLQutGDXCIpO1xyXG4gICAgICAgIHRoaXMuaW5kZXggPSBub2RlSW5kZXg7XHJcbiAgICAgICAgdGhpcy5tYXJrID0gbWFyaztcclxuICAgICAgICB0aGlzLnByZXZOb2RlSW5kZXggPSBwcmV2Tm9kZUluZXg7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBHZXROZWlnaEJvYXJkc0NvbW1hbmQgZXh0ZW5kcyBHcmFwaENvbW1hbmQge1xyXG5cclxuICAgIHByb3RlY3RlZCBpbmRleGVzOiBudW1iZXJbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihpbmRleGVzOiBudW1iZXJbXSkge1xyXG4gICAgICAgIHN1cGVyKFwiXCIsIFwi0KDQsNGB0YHQvNCw0YLRgNC40LLQsNC10Lwg0YHQvtGB0LXQtNC90LjQtSDQstC10YDRiNC40L3RiyDQsdC10Lcg0LzQtdGC0L7QuiDQuNC70Lgg0YHRgtC+0LpcIik7XHJcbiAgICAgICAgdGhpcy5pbmRleGVzID0gaW5kZXhlcztcclxuICAgIH1cclxuXHJcbiAgICBkb0V4ZWN1dGUocHJlc2VudGVyOiBHcmFwdGhQcmVzZW50ZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmluZGV4ZXMuZm9yRWFjaChmdW5jdGlvbiAoaWR4KSB7XHJcbiAgICAgICAgICAgIHByZXNlbnRlci5zZXROb2RlU3R5bGUoaWR4LCBcImdyZWVuXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZG9VbmRvKHByZXNlbnRlcjogR3JhcHRoUHJlc2VudGVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5pbmRleGVzLmZvckVhY2goZnVuY3Rpb24gKGlkeCkge1xyXG4gICAgICAgICAgICBwcmVzZW50ZXIuc2V0Tm9kZVN0eWxlKG51bGwsIFwiZ3JlZW5cIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgQ2xlYXJTdHlsZXMgZXh0ZW5kcyBHcmFwaENvbW1hbmQge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFwiXCIsIFwi0J/QtdGA0LXRhdC+0LQg0Log0YHQu9C10LTRg9GO0YnQtdC80YMg0YjQsNCz0YNcIik7XHJcbiAgICB9XHJcblxyXG4gICAgZG9FeGVjdXRlKHByZXNlbnRlcjogR3JhcHRoUHJlc2VudGVyKTogdm9pZCB7XHJcbiAgICAgICAgcHJlc2VudGVyLmNsZWFyU3R5bGVzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZG9VbmRvKHByZXNlbnRlcjogR3JhcHRoUHJlc2VudGVyKTogdm9pZCB7XHJcbiAgICAgICAgLy8gVE9ETzog0KHQu9C+0LbQvdC+0LUg0YHQvtGF0YDQsNC90LXQvdC40LUsINC90LDQtNC+INC30LDQv9C+0LzQuNC90LDRgtGMINGB0YLQuNC70LhcclxuICAgICAgICBjb25zb2xlLmxvZyhcInVuZG8/Pz9cIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDbGVhck1hcmtzQ29tbWFuZCBleHRlbmRzIEdyYXBoQ29tbWFuZCB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoXCJcIiwgXCLQntGH0LjRidCw0LXQvCDQvNC10YLQutC4INC90LAg0LLQtdGA0YjQuNC90LDRhVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBkb0V4ZWN1dGUocHJlc2VudGVyOiBHcmFwdGhQcmVzZW50ZXIpOiB2b2lkIHtcclxuICAgICAgICBwcmVzZW50ZXIuZ2V0R3JhcGgoKS5ub2Rlcy5mb3JFYWNoKHggPT4ge1xyXG4gICAgICAgICAgICB4Lm1hcmtEYXRhID0gMDtcclxuICAgICAgICAgICAgeC5wcmV2Tm9kZSA9IG51bGw7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBkb1VuZG8ocHJlc2VudGVyOiBHcmFwdGhQcmVzZW50ZXIpOiB2b2lkIHtcclxuICAgICAgICAvLyBUT0RPOiDQodC70L7QttC90L7QtSDRgdC+0YXRgNCw0L3QtdC90LjQtSwg0L3QsNC00L4g0LfQsNC/0L7QvNC40L3QsNGC0Ywg0LzQtdGC0LrQuFxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwidW5kbz8/P1wiKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFZpc2l0U3RvY2tDb21tYW5kIGV4dGVuZHMgR3JhcGhDb21tYW5kIHtcclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5kZXg6IG51bWJlcjtcclxuICAgIHByb3RlY3RlZCBwcmV2Tm9kZUluZGV4OiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3Iobm9kZUluZGV4OiBudW1iZXIsIHByZXZOb2RlOiBudW1iZXIpIHtcclxuICAgICAgICBzdXBlcihcIlwiLCBcItCj0YHRgtCw0L3QsNCy0LvQuNCy0LDQtdC8INC/0L7RgtC+0LogZCDQvdCwINGA0LXQsdGA0LUgW1wiICsgbm9kZUluZGV4ICsgXCIgLSBcIiArIHByZXZOb2RlICsgXCJdXCIpO1xyXG4gICAgICAgIHRoaXMuaW5kZXggPSBub2RlSW5kZXg7XHJcbiAgICAgICAgdGhpcy5wcmV2Tm9kZUluZGV4ID0gcHJldk5vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgZG9FeGVjdXRlKHByZXNlbnRlcjogR3JhcHRoUHJlc2VudGVyKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGdyYXBoID0gcHJlc2VudGVyLmdldEdyYXBoKCk7XHJcblxyXG4gICAgICAgIGxldCBjdXJOb2RlID0gZ3JhcGguZ2V0Tm9kZUJ5SW5kZXgodGhpcy5pbmRleCk7XHJcbiAgICAgICAgbGV0IHByZXZOb2RlID0gZ3JhcGguZ2V0Tm9kZUJ5SW5kZXgodGhpcy5wcmV2Tm9kZUluZGV4KTtcclxuXHJcbiAgICAgICAgaWYgKGN1ck5vZGUgIT0gZ3JhcGguc291cmNlKCkpIHtcclxuXHJcbiAgICAgICAgICAgIHByZXNlbnRlci5zZXRSZWxhdGlvblN0eWxlKHRoaXMuaW5kZXgsIHRoaXMucHJldk5vZGVJbmRleCwgXCJyZWRcIik7XHJcblxyXG4gICAgICAgICAgICBsZXQgcmVsYXRpb24gPSBncmFwaC5nZXRSZWxhdGlvbihjdXJOb2RlLCBwcmV2Tm9kZSk7XHJcbiAgICAgICAgICAgIHJlbGF0aW9uLmQgPSAocmVsYXRpb24uZCB8fCAwKSArIGN1ck5vZGUubWFya0RhdGE7XHJcbiAgICAgICAgICAgIHByZXZOb2RlLm1hcmtEYXRhID0gY3VyTm9kZS5tYXJrRGF0YTtcclxuICAgICAgICAgICAgY3VyTm9kZS5tYXJrRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgIGN1ck5vZGUgPSBwcmV2Tm9kZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZG9VbmRvKHByZXNlbnRlcjogR3JhcHRoUHJlc2VudGVyKTogdm9pZCB7XHJcbiAgICAgICAgLy8gVE9ETzog0KHQu9C+0LbQvdC+0LUg0YHQvtGF0YDQsNC90LXQvdC40LUsINC90LDQtNC+INC30LDQv9C+0LzQuNC90LDRgtGMINC80LXRgtC60LgsINGA0L7QtNC40YLQtdC70LXQuSDQuCDQv9C+0LTQvtCx0L3QvtC1XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ1bmRvPz8/XCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRW5kQWxnUmVzdWx0IGV4dGVuZHMgR3JhcGhDb21tYW5kIHtcclxuXHJcbiAgICBwcm90ZWN0ZWQgcmVzdWx0OiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IocmVzdWx0OiBudW1iZXIpIHtcclxuICAgICAgICBzdXBlcihcIlwiLCBcItCQ0LvQs9C+0YDQuNGC0Lwg0LfQsNC60L7QvdC10L0uINCg0LXQt9GD0LvRjNGC0LDRgiA9IFwiICsgcmVzdWx0KTtcclxuICAgICAgICB0aGlzLnJlc3VsdCA9IHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBkb0V4ZWN1dGUocHJlc2VudGVyOiBHcmFwdGhQcmVzZW50ZXIpOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcbiAgICBkb1VuZG8ocHJlc2VudGVyOiBHcmFwdGhQcmVzZW50ZXIpOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9TY3JpcHRzL1ZpenVhbGl6ZXIudHMiLCJleHBvcnQgY2xhc3MgR3JhcGhOb2RlIHtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfZW10eU5vZGU6IEdyYXBoTm9kZSA9IG5ldyBHcmFwaE5vZGUoMCk7O1xyXG4gICAgcHVibGljIHN0YXRpYyBlbXB0eU5vZGUoKTogR3JhcGhOb2RlIHtcclxuICAgICAgICByZXR1cm4gR3JhcGhOb2RlLl9lbXR5Tm9kZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5kZXg6IG51bWJlcjtcclxuICAgIHB1YmxpYyBwcmV2Tm9kZTogR3JhcGhOb2RlO1xyXG4gICAgcHVibGljIG91dHB1dDogUmVsYXRpb25bXTtcclxuICAgIHB1YmxpYyBtYXJrRGF0YTogbnVtYmVyO1xyXG5cclxuICAgIHB1YmxpYyBpc1N0b2NrT3JFbmQ6IGJvb2xlYW47XHJcblxyXG4gICAgY29uc3RydWN0b3IoaWR4OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmluZGV4ID0gaWR4O1xyXG4gICAgICAgIHRoaXMub3V0cHV0ID0gW107XHJcbiAgICAgICAgdGhpcy5pc1N0b2NrT3JFbmQgPSBmYWxzZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFJlbGF0aW9uIHtcclxuICAgIHB1YmxpYyBkOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgcjogbnVtYmVyO1xyXG5cclxuICAgIHB1YmxpYyBzdGFydE5vZGU6IEdyYXBoTm9kZTtcclxuICAgIHB1YmxpYyBlbmROb2RlOiBHcmFwaE5vZGU7XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc3RhcnQ6IEdyYXBoTm9kZSwgZW5kOiBHcmFwaE5vZGUsIHI6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuc3RhcnROb2RlID0gc3RhcnQ7XHJcbiAgICAgICAgdGhpcy5lbmROb2RlID0gZW5kO1xyXG4gICAgICAgIHRoaXMuciA9IHI7XHJcbiAgICAgICAgdGhpcy5kID0gMDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEdyYXBoIHtcclxuICAgIHB1YmxpYyBub2RlczogR3JhcGhOb2RlW107XHJcbiAgICBwdWJsaWMgcmVsYXRpb25zOiBSZWxhdGlvbltdO1xyXG5cclxuICAgIHByb3RlY3RlZCBfc291cmNlOiBHcmFwaE5vZGU7XHJcbiAgICBwcm90ZWN0ZWQgX3N0b2NrOiBHcmFwaE5vZGU7XHJcblxyXG4gICAgcHVibGljIHNvdXJjZSh2YWx1ZT86IEdyYXBoTm9kZSkge1xyXG4gICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9zb3VyY2UgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdmFsdWUuaXNTdG9ja09yRW5kID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zb3VyY2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdG9jayh2YWx1ZT86IEdyYXBoTm9kZSkge1xyXG4gICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9zdG9jayA9IHZhbHVlO1xyXG4gICAgICAgICAgICB2YWx1ZS5pc1N0b2NrT3JFbmQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N0b2NrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihtYXRyaXg/OiBudW1iZXJbXVtdKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMucmVsYXRpb25zID0gW107XHJcblxyXG4gICAgICAgIGlmIChtYXRyaXgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cobWF0cml4KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBhZGROb2RlKG5vZGU6IEdyYXBoTm9kZSkge1xyXG4gICAgICAgIHRoaXMubm9kZXMucHVzaChub2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkUmVsYXRpb24oaWR4U3RhcnQ6IG51bWJlciwgaWR4RW5kOiBudW1iZXIsIHI6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBzdGFydDogR3JhcGhOb2RlID0gdGhpcy5nZXROb2RlQnlJbmRleChpZHhTdGFydCk7XHJcbiAgICAgICAgbGV0IGVuZDogR3JhcGhOb2RlID0gdGhpcy5nZXROb2RlQnlJbmRleChpZHhFbmQpO1xyXG5cclxuICAgICAgICBsZXQgcmVsID0gbmV3IFJlbGF0aW9uKHN0YXJ0LCBlbmQsIHIpO1xyXG4gICAgICAgIHN0YXJ0Lm91dHB1dC5wdXNoKHJlbCk7XHJcbiAgICAgICAgZW5kLm91dHB1dC5wdXNoKHJlbCk7XHJcbiAgICAgICAgdGhpcy5yZWxhdGlvbnMucHVzaChyZWwpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXROb2RlQnlJbmRleChpZHg6IG51bWJlcik6IEdyYXBoTm9kZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubm9kZXMuZmlsdGVyKHggPT4geC5pbmRleCA9PSBpZHgpWzBdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRSZWxhdGlvbihhOiBHcmFwaE5vZGUsIGI6IEdyYXBoTm9kZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlbGF0aW9ucy5maWx0ZXIoeCA9PiAoeC5zdGFydE5vZGUgPT0gYSAmJiB4LmVuZE5vZGUgPT0gYikgfHwgKHguZW5kTm9kZSA9PSBhICYmIHguc3RhcnROb2RlID09IGIpKVswXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0TmVpZ2h0Ym9hcmRzKGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGN1ck5vZGUgPSB0aGlzLmdldE5vZGVCeUluZGV4KGluZGV4KTtcclxuICAgICAgICByZXR1cm4gY3VyTm9kZS5vdXRwdXQubWFwKHggPT4gY3VyTm9kZSA9PSB4LnN0YXJ0Tm9kZSA/IHguZW5kTm9kZSA6IHguc3RhcnROb2RlKTtcclxuICAgIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL1NjcmlwdHMvZ3JhcGgudHMiLCJ2YXIgZztcclxuXHJcbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXHJcbmcgPSAoZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIHRoaXM7XHJcbn0pKCk7XHJcblxyXG50cnkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxyXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSxldmFsKShcInRoaXNcIik7XHJcbn0gY2F0Y2goZSkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXHJcblx0aWYodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIilcclxuXHRcdGcgPSB3aW5kb3c7XHJcbn1cclxuXHJcbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cclxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3NcclxuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAod2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9wcm9jZXNzL2Jyb3dzZXIuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiKGZ1bmN0aW9uIChnbG9iYWwsIHVuZGVmaW5lZCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgaWYgKGdsb2JhbC5zZXRJbW1lZGlhdGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBuZXh0SGFuZGxlID0gMTsgLy8gU3BlYyBzYXlzIGdyZWF0ZXIgdGhhbiB6ZXJvXG4gICAgdmFyIHRhc2tzQnlIYW5kbGUgPSB7fTtcbiAgICB2YXIgY3VycmVudGx5UnVubmluZ0FUYXNrID0gZmFsc2U7XG4gICAgdmFyIGRvYyA9IGdsb2JhbC5kb2N1bWVudDtcbiAgICB2YXIgcmVnaXN0ZXJJbW1lZGlhdGU7XG5cbiAgICBmdW5jdGlvbiBzZXRJbW1lZGlhdGUoY2FsbGJhY2spIHtcbiAgICAgIC8vIENhbGxiYWNrIGNhbiBlaXRoZXIgYmUgYSBmdW5jdGlvbiBvciBhIHN0cmluZ1xuICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGNhbGxiYWNrID0gbmV3IEZ1bmN0aW9uKFwiXCIgKyBjYWxsYmFjayk7XG4gICAgICB9XG4gICAgICAvLyBDb3B5IGZ1bmN0aW9uIGFyZ3VtZW50c1xuICAgICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpICsgMV07XG4gICAgICB9XG4gICAgICAvLyBTdG9yZSBhbmQgcmVnaXN0ZXIgdGhlIHRhc2tcbiAgICAgIHZhciB0YXNrID0geyBjYWxsYmFjazogY2FsbGJhY2ssIGFyZ3M6IGFyZ3MgfTtcbiAgICAgIHRhc2tzQnlIYW5kbGVbbmV4dEhhbmRsZV0gPSB0YXNrO1xuICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUobmV4dEhhbmRsZSk7XG4gICAgICByZXR1cm4gbmV4dEhhbmRsZSsrO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsZWFySW1tZWRpYXRlKGhhbmRsZSkge1xuICAgICAgICBkZWxldGUgdGFza3NCeUhhbmRsZVtoYW5kbGVdO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJ1bih0YXNrKSB7XG4gICAgICAgIHZhciBjYWxsYmFjayA9IHRhc2suY2FsbGJhY2s7XG4gICAgICAgIHZhciBhcmdzID0gdGFzay5hcmdzO1xuICAgICAgICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgY2FsbGJhY2soYXJnc1swXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgY2FsbGJhY2soYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgY2FsbGJhY2soYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGNhbGxiYWNrLmFwcGx5KHVuZGVmaW5lZCwgYXJncyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJ1bklmUHJlc2VudChoYW5kbGUpIHtcbiAgICAgICAgLy8gRnJvbSB0aGUgc3BlYzogXCJXYWl0IHVudGlsIGFueSBpbnZvY2F0aW9ucyBvZiB0aGlzIGFsZ29yaXRobSBzdGFydGVkIGJlZm9yZSB0aGlzIG9uZSBoYXZlIGNvbXBsZXRlZC5cIlxuICAgICAgICAvLyBTbyBpZiB3ZSdyZSBjdXJyZW50bHkgcnVubmluZyBhIHRhc2ssIHdlJ2xsIG5lZWQgdG8gZGVsYXkgdGhpcyBpbnZvY2F0aW9uLlxuICAgICAgICBpZiAoY3VycmVudGx5UnVubmluZ0FUYXNrKSB7XG4gICAgICAgICAgICAvLyBEZWxheSBieSBkb2luZyBhIHNldFRpbWVvdXQuIHNldEltbWVkaWF0ZSB3YXMgdHJpZWQgaW5zdGVhZCwgYnV0IGluIEZpcmVmb3ggNyBpdCBnZW5lcmF0ZWQgYVxuICAgICAgICAgICAgLy8gXCJ0b28gbXVjaCByZWN1cnNpb25cIiBlcnJvci5cbiAgICAgICAgICAgIHNldFRpbWVvdXQocnVuSWZQcmVzZW50LCAwLCBoYW5kbGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIHRhc2sgPSB0YXNrc0J5SGFuZGxlW2hhbmRsZV07XG4gICAgICAgICAgICBpZiAodGFzaykge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRseVJ1bm5pbmdBVGFzayA9IHRydWU7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgcnVuKHRhc2spO1xuICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW1tZWRpYXRlKGhhbmRsZSk7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRseVJ1bm5pbmdBVGFzayA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxOZXh0VGlja0ltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgcHJvY2Vzcy5uZXh0VGljayhmdW5jdGlvbiAoKSB7IHJ1bklmUHJlc2VudChoYW5kbGUpOyB9KTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjYW5Vc2VQb3N0TWVzc2FnZSgpIHtcbiAgICAgICAgLy8gVGhlIHRlc3QgYWdhaW5zdCBgaW1wb3J0U2NyaXB0c2AgcHJldmVudHMgdGhpcyBpbXBsZW1lbnRhdGlvbiBmcm9tIGJlaW5nIGluc3RhbGxlZCBpbnNpZGUgYSB3ZWIgd29ya2VyLFxuICAgICAgICAvLyB3aGVyZSBgZ2xvYmFsLnBvc3RNZXNzYWdlYCBtZWFucyBzb21ldGhpbmcgY29tcGxldGVseSBkaWZmZXJlbnQgYW5kIGNhbid0IGJlIHVzZWQgZm9yIHRoaXMgcHVycG9zZS5cbiAgICAgICAgaWYgKGdsb2JhbC5wb3N0TWVzc2FnZSAmJiAhZ2xvYmFsLmltcG9ydFNjcmlwdHMpIHtcbiAgICAgICAgICAgIHZhciBwb3N0TWVzc2FnZUlzQXN5bmNocm9ub3VzID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhciBvbGRPbk1lc3NhZ2UgPSBnbG9iYWwub25tZXNzYWdlO1xuICAgICAgICAgICAgZ2xvYmFsLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlSXNBc3luY2hyb25vdXMgPSBmYWxzZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBnbG9iYWwucG9zdE1lc3NhZ2UoXCJcIiwgXCIqXCIpO1xuICAgICAgICAgICAgZ2xvYmFsLm9ubWVzc2FnZSA9IG9sZE9uTWVzc2FnZTtcbiAgICAgICAgICAgIHJldHVybiBwb3N0TWVzc2FnZUlzQXN5bmNocm9ub3VzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbFBvc3RNZXNzYWdlSW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIC8vIEluc3RhbGxzIGFuIGV2ZW50IGhhbmRsZXIgb24gYGdsb2JhbGAgZm9yIHRoZSBgbWVzc2FnZWAgZXZlbnQ6IHNlZVxuICAgICAgICAvLyAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuL0RPTS93aW5kb3cucG9zdE1lc3NhZ2VcbiAgICAgICAgLy8gKiBodHRwOi8vd3d3LndoYXR3Zy5vcmcvc3BlY3Mvd2ViLWFwcHMvY3VycmVudC13b3JrL211bHRpcGFnZS9jb21tcy5odG1sI2Nyb3NzRG9jdW1lbnRNZXNzYWdlc1xuXG4gICAgICAgIHZhciBtZXNzYWdlUHJlZml4ID0gXCJzZXRJbW1lZGlhdGUkXCIgKyBNYXRoLnJhbmRvbSgpICsgXCIkXCI7XG4gICAgICAgIHZhciBvbkdsb2JhbE1lc3NhZ2UgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgaWYgKGV2ZW50LnNvdXJjZSA9PT0gZ2xvYmFsICYmXG4gICAgICAgICAgICAgICAgdHlwZW9mIGV2ZW50LmRhdGEgPT09IFwic3RyaW5nXCIgJiZcbiAgICAgICAgICAgICAgICBldmVudC5kYXRhLmluZGV4T2YobWVzc2FnZVByZWZpeCkgPT09IDApIHtcbiAgICAgICAgICAgICAgICBydW5JZlByZXNlbnQoK2V2ZW50LmRhdGEuc2xpY2UobWVzc2FnZVByZWZpeC5sZW5ndGgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBvbkdsb2JhbE1lc3NhZ2UsIGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdsb2JhbC5hdHRhY2hFdmVudChcIm9ubWVzc2FnZVwiLCBvbkdsb2JhbE1lc3NhZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIGdsb2JhbC5wb3N0TWVzc2FnZShtZXNzYWdlUHJlZml4ICsgaGFuZGxlLCBcIipcIik7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbE1lc3NhZ2VDaGFubmVsSW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIHZhciBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7XG4gICAgICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIHZhciBoYW5kbGUgPSBldmVudC5kYXRhO1xuICAgICAgICAgICAgcnVuSWZQcmVzZW50KGhhbmRsZSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIGNoYW5uZWwucG9ydDIucG9zdE1lc3NhZ2UoaGFuZGxlKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsUmVhZHlTdGF0ZUNoYW5nZUltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICB2YXIgaHRtbCA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICAvLyBDcmVhdGUgYSA8c2NyaXB0PiBlbGVtZW50OyBpdHMgcmVhZHlzdGF0ZWNoYW5nZSBldmVudCB3aWxsIGJlIGZpcmVkIGFzeW5jaHJvbm91c2x5IG9uY2UgaXQgaXMgaW5zZXJ0ZWRcbiAgICAgICAgICAgIC8vIGludG8gdGhlIGRvY3VtZW50LiBEbyBzbywgdGh1cyBxdWV1aW5nIHVwIHRoZSB0YXNrLiBSZW1lbWJlciB0byBjbGVhbiB1cCBvbmNlIGl0J3MgYmVlbiBjYWxsZWQuXG4gICAgICAgICAgICB2YXIgc2NyaXB0ID0gZG9jLmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gICAgICAgICAgICBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJ1bklmUHJlc2VudChoYW5kbGUpO1xuICAgICAgICAgICAgICAgIHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBudWxsO1xuICAgICAgICAgICAgICAgIGh0bWwucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgICAgICAgICBzY3JpcHQgPSBudWxsO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGh0bWwuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsU2V0VGltZW91dEltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgc2V0VGltZW91dChydW5JZlByZXNlbnQsIDAsIGhhbmRsZSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gSWYgc3VwcG9ydGVkLCB3ZSBzaG91bGQgYXR0YWNoIHRvIHRoZSBwcm90b3R5cGUgb2YgZ2xvYmFsLCBzaW5jZSB0aGF0IGlzIHdoZXJlIHNldFRpbWVvdXQgZXQgYWwuIGxpdmUuXG4gICAgdmFyIGF0dGFjaFRvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mICYmIE9iamVjdC5nZXRQcm90b3R5cGVPZihnbG9iYWwpO1xuICAgIGF0dGFjaFRvID0gYXR0YWNoVG8gJiYgYXR0YWNoVG8uc2V0VGltZW91dCA/IGF0dGFjaFRvIDogZ2xvYmFsO1xuXG4gICAgLy8gRG9uJ3QgZ2V0IGZvb2xlZCBieSBlLmcuIGJyb3dzZXJpZnkgZW52aXJvbm1lbnRzLlxuICAgIGlmICh7fS50b1N0cmluZy5jYWxsKGdsb2JhbC5wcm9jZXNzKSA9PT0gXCJbb2JqZWN0IHByb2Nlc3NdXCIpIHtcbiAgICAgICAgLy8gRm9yIE5vZGUuanMgYmVmb3JlIDAuOVxuICAgICAgICBpbnN0YWxsTmV4dFRpY2tJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIGlmIChjYW5Vc2VQb3N0TWVzc2FnZSgpKSB7XG4gICAgICAgIC8vIEZvciBub24tSUUxMCBtb2Rlcm4gYnJvd3NlcnNcbiAgICAgICAgaW5zdGFsbFBvc3RNZXNzYWdlSW1wbGVtZW50YXRpb24oKTtcblxuICAgIH0gZWxzZSBpZiAoZ2xvYmFsLk1lc3NhZ2VDaGFubmVsKSB7XG4gICAgICAgIC8vIEZvciB3ZWIgd29ya2Vycywgd2hlcmUgc3VwcG9ydGVkXG4gICAgICAgIGluc3RhbGxNZXNzYWdlQ2hhbm5lbEltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2UgaWYgKGRvYyAmJiBcIm9ucmVhZHlzdGF0ZWNoYW5nZVwiIGluIGRvYy5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpKSB7XG4gICAgICAgIC8vIEZvciBJRSA24oCTOFxuICAgICAgICBpbnN0YWxsUmVhZHlTdGF0ZUNoYW5nZUltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBGb3Igb2xkZXIgYnJvd3NlcnNcbiAgICAgICAgaW5zdGFsbFNldFRpbWVvdXRJbXBsZW1lbnRhdGlvbigpO1xuICAgIH1cblxuICAgIGF0dGFjaFRvLnNldEltbWVkaWF0ZSA9IHNldEltbWVkaWF0ZTtcbiAgICBhdHRhY2hUby5jbGVhckltbWVkaWF0ZSA9IGNsZWFySW1tZWRpYXRlO1xufSh0eXBlb2Ygc2VsZiA9PT0gXCJ1bmRlZmluZWRcIiA/IHR5cGVvZiBnbG9iYWwgPT09IFwidW5kZWZpbmVkXCIgPyB0aGlzIDogZ2xvYmFsIDogc2VsZikpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3NldGltbWVkaWF0ZS9zZXRJbW1lZGlhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHNjb3BlID0gKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgJiYgZ2xvYmFsKSB8fFxuICAgICAgICAgICAgKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiICYmIHNlbGYpIHx8XG4gICAgICAgICAgICB3aW5kb3c7XG52YXIgYXBwbHkgPSBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHk7XG5cbi8vIERPTSBBUElzLCBmb3IgY29tcGxldGVuZXNzXG5cbmV4cG9ydHMuc2V0VGltZW91dCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IFRpbWVvdXQoYXBwbHkuY2FsbChzZXRUaW1lb3V0LCBzY29wZSwgYXJndW1lbnRzKSwgY2xlYXJUaW1lb3V0KTtcbn07XG5leHBvcnRzLnNldEludGVydmFsID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgVGltZW91dChhcHBseS5jYWxsKHNldEludGVydmFsLCBzY29wZSwgYXJndW1lbnRzKSwgY2xlYXJJbnRlcnZhbCk7XG59O1xuZXhwb3J0cy5jbGVhclRpbWVvdXQgPVxuZXhwb3J0cy5jbGVhckludGVydmFsID0gZnVuY3Rpb24odGltZW91dCkge1xuICBpZiAodGltZW91dCkge1xuICAgIHRpbWVvdXQuY2xvc2UoKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gVGltZW91dChpZCwgY2xlYXJGbikge1xuICB0aGlzLl9pZCA9IGlkO1xuICB0aGlzLl9jbGVhckZuID0gY2xlYXJGbjtcbn1cblRpbWVvdXQucHJvdG90eXBlLnVucmVmID0gVGltZW91dC5wcm90b3R5cGUucmVmID0gZnVuY3Rpb24oKSB7fTtcblRpbWVvdXQucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuX2NsZWFyRm4uY2FsbChzY29wZSwgdGhpcy5faWQpO1xufTtcblxuLy8gRG9lcyBub3Qgc3RhcnQgdGhlIHRpbWUsIGp1c3Qgc2V0cyB1cCB0aGUgbWVtYmVycyBuZWVkZWQuXG5leHBvcnRzLmVucm9sbCA9IGZ1bmN0aW9uKGl0ZW0sIG1zZWNzKSB7XG4gIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcbiAgaXRlbS5faWRsZVRpbWVvdXQgPSBtc2Vjcztcbn07XG5cbmV4cG9ydHMudW5lbnJvbGwgPSBmdW5jdGlvbihpdGVtKSB7XG4gIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcbiAgaXRlbS5faWRsZVRpbWVvdXQgPSAtMTtcbn07XG5cbmV4cG9ydHMuX3VucmVmQWN0aXZlID0gZXhwb3J0cy5hY3RpdmUgPSBmdW5jdGlvbihpdGVtKSB7XG4gIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcblxuICB2YXIgbXNlY3MgPSBpdGVtLl9pZGxlVGltZW91dDtcbiAgaWYgKG1zZWNzID49IDApIHtcbiAgICBpdGVtLl9pZGxlVGltZW91dElkID0gc2V0VGltZW91dChmdW5jdGlvbiBvblRpbWVvdXQoKSB7XG4gICAgICBpZiAoaXRlbS5fb25UaW1lb3V0KVxuICAgICAgICBpdGVtLl9vblRpbWVvdXQoKTtcbiAgICB9LCBtc2Vjcyk7XG4gIH1cbn07XG5cbi8vIHNldGltbWVkaWF0ZSBhdHRhY2hlcyBpdHNlbGYgdG8gdGhlIGdsb2JhbCBvYmplY3RcbnJlcXVpcmUoXCJzZXRpbW1lZGlhdGVcIik7XG4vLyBPbiBzb21lIGV4b3RpYyBlbnZpcm9ubWVudHMsIGl0J3Mgbm90IGNsZWFyIHdoaWNoIG9iamVjdCBgc2V0aW1tZWRpYXRlYCB3YXNcbi8vIGFibGUgdG8gaW5zdGFsbCBvbnRvLiAgU2VhcmNoIGVhY2ggcG9zc2liaWxpdHkgaW4gdGhlIHNhbWUgb3JkZXIgYXMgdGhlXG4vLyBgc2V0aW1tZWRpYXRlYCBsaWJyYXJ5LlxuZXhwb3J0cy5zZXRJbW1lZGlhdGUgPSAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgJiYgc2VsZi5zZXRJbW1lZGlhdGUpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiICYmIGdsb2JhbC5zZXRJbW1lZGlhdGUpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICh0aGlzICYmIHRoaXMuc2V0SW1tZWRpYXRlKTtcbmV4cG9ydHMuY2xlYXJJbW1lZGlhdGUgPSAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgJiYgc2VsZi5jbGVhckltbWVkaWF0ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBnbG9iYWwuY2xlYXJJbW1lZGlhdGUpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMgJiYgdGhpcy5jbGVhckltbWVkaWF0ZSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vdGltZXJzLWJyb3dzZXJpZnkvbWFpbi5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgKiBhcyBHciBmcm9tIFwiLi9ncmFwaFwiXHJcbmltcG9ydCAqIGFzIFZpenVhbGl6ZXIgZnJvbSBcIi4vVml6dWFsaXplclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEZvcmRGYWxrZXJzb24ge1xyXG5cclxuICAgIHB1YmxpYyBydW5BbGcoZ3JhcGg6IEdyLkdyYXBoLCB2aXo6IFZpenVhbGl6ZXIuVml6dWFsaXplcik6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICBsZXQgcXVldWU6IEdyLkdyYXBoTm9kZVtdID0gW107XHJcbiAgICAgICAgbGV0IGN1ck5vZGU6IEdyLkdyYXBoTm9kZTtcclxuXHJcbiAgICAgICAgbGV0IGVtcHR5Tm9kZSA9IG5ldyBHci5HcmFwaE5vZGUoMCk7XHJcblxyXG4gICAgICAgIHdoaWxlICh0cnVlKSB7XHJcblxyXG4gICAgICAgICAgICBncmFwaC5zb3VyY2UoKS5tYXJrRGF0YSA9IEluZmluaXR5O1xyXG4gICAgICAgICAgICBncmFwaC5zb3VyY2UoKS5wcmV2Tm9kZSA9IGVtcHR5Tm9kZTtcclxuICAgICAgICAgICAgdml6LmFkZENvbW1hbmQobmV3IFZpenVhbGl6ZXIuU2V0Tm9kZU1hcmtzQ29tbWFuZChncmFwaC5zb3VyY2UoKS5pbmRleCwgZW1wdHlOb2RlLmluZGV4LCBncmFwaC5zb3VyY2UoKS5tYXJrRGF0YSkpOyAvLyDQmtC+0LzQsNC90LTQsCDQv9GA0L7RgdGC0LDQstC60Lgg0LzQtdGC0LrQuFxyXG5cclxuICAgICAgICAgICAgcXVldWUucHVzaChncmFwaC5zb3VyY2UoKSk7XHJcbiAgICAgICAgICAgIHdoaWxlIChxdWV1ZS5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgY3VyTm9kZSA9IHF1ZXVlLnNoaWZ0KCk7XHJcbiAgICAgICAgICAgICAgICB2aXouYWRkQ29tbWFuZChuZXcgVml6dWFsaXplci5HZXROb2RlQ2VsbENvbW1hbmQoY3VyTm9kZS5pbmRleCkpOyAvLyDQmtC+0LzQsNC90LTQsCDRgNCw0YHRgdC80L7RgtGA0LXQvdC40Y8g0LLQtdGA0YjQuNC90YtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbmVpZ2h0Ym9hcmRzID0gZ3JhcGguZ2V0TmVpZ2h0Ym9hcmRzKGN1ck5vZGUuaW5kZXgpLmZpbHRlcih4ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVsID0gZ3JhcGguZ2V0UmVsYXRpb24oY3VyTm9kZSwgeCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChyZWwuZCA8IHJlbC5yKSAmJiAoIXgucHJldk5vZGUgfHwgKHggPT0gZ3JhcGguc3RvY2soKSkpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB2aXouYWRkQ29tbWFuZChuZXcgVml6dWFsaXplci5HZXROZWlnaEJvYXJkc0NvbW1hbmQobmVpZ2h0Ym9hcmRzLm1hcCh4ID0+IHguaW5kZXgpKSk7IC8vINCg0LDRgdGB0LzQsNGC0YDQuNCy0LDQtdC8INGB0L7RgdC10LTQtdC5XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIG5laWdodGJvYXJkcy5mb3JFYWNoKHggPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHgucHJldk5vZGUgPSBjdXJOb2RlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVsYXRpb24gPSBncmFwaC5nZXRSZWxhdGlvbihjdXJOb2RlLCB4KTtcclxuICAgICAgICAgICAgICAgICAgICB2aXouYWRkQ29tbWFuZChuZXcgVml6dWFsaXplci5HZXRSZWxhdGlvbnNDb21tYW5kKGN1ck5vZGUuaW5kZXgsIHguaW5kZXgpKTsgLy8g0KDQsNGB0YHQvNCw0YLRgNC40LLQsNC10Lwg0YHQstGP0LfRjFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVsYXRpb24uZCA8IHJlbGF0aW9uLnIgJiYgcmVsYXRpb24uc3RhcnROb2RlID09IGN1ck5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeC5tYXJrRGF0YSA9IE1hdGgubWluKHJlbGF0aW9uLnIgLSByZWxhdGlvbi5kLCBNYXRoLmFicyh4LnByZXZOb2RlLm1hcmtEYXRhKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB4Lm1hcmtEYXRhID0gKC0xKSAqIE1hdGgubWluKE1hdGguYWJzKHgucHJldk5vZGUubWFya0RhdGEpLCByZWxhdGlvbi5kKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdml6LmFkZENvbW1hbmQobmV3IFZpenVhbGl6ZXIuU2V0Tm9kZU1hcmtzQ29tbWFuZCh4LmluZGV4LCB4LnByZXZOb2RlLmluZGV4LCB4Lm1hcmtEYXRhKSk7IC8vINCf0YDQvtGB0YLQsNCy0LvRj9C10Lwg0LzQtdGC0LrRg1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHggIT0gZ3JhcGguc3RvY2soKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWV1ZS5wdXNoKHgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWV1ZSA9IHF1ZXVlLnNvcnQodGhhdC5ub2RlQ29tcGFyZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zdG9ja1dhc1Zpc2l0ZWQoZ3JhcGgsIHZpeik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHZpei5hZGRDb21tYW5kKG5ldyBWaXp1YWxpemVyLkNsZWFyU3R5bGVzKCkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIWdyYXBoLnN0b2NrKCkucHJldk5vZGUpIGJyZWFrO1xyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuY2xlYXJNYXJrcyhncmFwaCwgdml6KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGxldCByZXN1bHQgPSAwO1xyXG5cclxuICAgICAgICBncmFwaC5zb3VyY2UoKS5vdXRwdXQuZm9yRWFjaCh4ID0+IHJlc3VsdCArPSB4LmQpO1xyXG4gICAgICAgIHZpei5hZGRDb21tYW5kKG5ldyBWaXp1YWxpemVyLkVuZEFsZ1Jlc3VsdChyZXN1bHQpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgbm9kZUNvbXBhcmVyKGE6IEdyLkdyYXBoTm9kZSwgYjogR3IuR3JhcGhOb2RlKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gYS5pbmRleCAtIGIuaW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHN0b2NrV2FzVmlzaXRlZChncmFwaDogR3IuR3JhcGgsIHZpejogVml6dWFsaXplci5WaXp1YWxpemVyKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGN1ck5vZGUgPSBncmFwaC5zdG9jaygpO1xyXG5cclxuICAgICAgICB3aGlsZSAoY3VyTm9kZSAhPSBncmFwaC5zb3VyY2UoKSkge1xyXG4gICAgICAgICAgICB2aXouYWRkQ29tbWFuZChuZXcgVml6dWFsaXplci5WaXNpdFN0b2NrQ29tbWFuZChjdXJOb2RlLmluZGV4LCBjdXJOb2RlLnByZXZOb2RlLmluZGV4KSk7XHJcbiAgICAgICAgICAgIGxldCByZWxhdGlvbiA9IGdyYXBoLmdldFJlbGF0aW9uKGN1ck5vZGUsIGN1ck5vZGUucHJldk5vZGUpO1xyXG4gICAgICAgICAgICByZWxhdGlvbi5kID0gKHJlbGF0aW9uLmQgfHwgMCkgKyBjdXJOb2RlLm1hcmtEYXRhO1xyXG4gICAgICAgICAgICBjdXJOb2RlLnByZXZOb2RlLm1hcmtEYXRhID0gY3VyTm9kZS5tYXJrRGF0YTtcclxuICAgICAgICAgICAgY3VyTm9kZS5tYXJrRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgIGN1ck5vZGUgPSBjdXJOb2RlLnByZXZOb2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjdXJOb2RlLm1hcmtEYXRhID0gSW5maW5pdHk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGNsZWFyTWFya3MoZ3JhcGg6IEdyLkdyYXBoLCB2aXo6IFZpenVhbGl6ZXIuVml6dWFsaXplcik6IHZvaWQge1xyXG4gICAgICAgIGdyYXBoLm5vZGVzLmZvckVhY2goeCA9PiB7XHJcbiAgICAgICAgICAgIHgubWFya0RhdGEgPSAwO1xyXG4gICAgICAgICAgICB4LnByZXZOb2RlID0gbnVsbDtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICB2aXouYWRkQ29tbWFuZChuZXcgVml6dWFsaXplci5DbGVhck1hcmtzQ29tbWFuZCgpKTtcclxuICAgIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL1NjcmlwdHMvZm9yZEZ1bGtlcnNvbkFsZy50cyIsImltcG9ydCB7IEdyYXBoLCBSZWxhdGlvbiwgR3JhcGhOb2RlIH0gZnJvbSBcIi4vZ3JhcGhcIlxyXG5pbXBvcnQgeyBzdGFydCB9IGZyb20gXCJyZXBsXCI7XHJcbmltcG9ydCB7IGVuY29kZSB9IGZyb20gXCJwdW55Y29kZVwiO1xyXG5cclxuaW50ZXJmYWNlIE5vZGVQcmVzZW50ZXJPcHRpb25zIHtcclxuICAgIHN0YXJ0WDogbnVtYmVyO1xyXG4gICAgc3RhcnRZOiBudW1iZXI7XHJcbiAgICByYWRpdXM6IG51bWJlcjtcclxufVxyXG5cclxuaW50ZXJmYWNlIExpbmVPcHRpb25zIHtcclxuICAgIHgxOiBudW1iZXIsXHJcbiAgICB5MTogbnVtYmVyLFxyXG4gICAgeDI6IG51bWJlcixcclxuICAgIHkyOiBudW1iZXJcclxufVxyXG5cclxuY2xhc3MgTm9kZVByZXNlbnRlciB7XHJcblxyXG4gICAgcHJvdGVjdGVkIG5vZGU6IEdyYXBoTm9kZTtcclxuXHJcbiAgICBwdWJsaWMgb3B0aW9uczogTm9kZVByZXNlbnRlck9wdGlvbnM7XHJcbiAgICBwdWJsaWMgbm9kZVN0eWxlOiBzdHJpbmcgfCBDYW52YXNHcmFkaWVudCB8IENhbnZhc1BhdHRlcm47IFxyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5vZGU6IEdyYXBoTm9kZSkge1xyXG4gICAgICAgIHRoaXMubm9kZSA9IG5vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbmRlcihjYW52YXNDb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkIHtcclxuICAgICAgICBsZXQgb2xkU3R5bGUgPSBjYW52YXNDb250ZXh0LnN0cm9rZVN0eWxlO1xyXG5cclxuICAgICAgICBjYW52YXNDb250ZXh0LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgIGNhbnZhc0NvbnRleHQuc3Ryb2tlU3R5bGUgPSB0aGlzLm5vZGVTdHlsZSB8fCBvbGRTdHlsZTtcclxuICAgICAgICBjYW52YXNDb250ZXh0LmFyYyh0aGlzLm9wdGlvbnMuc3RhcnRYLCB0aGlzLm9wdGlvbnMuc3RhcnRZLCB0aGlzLm9wdGlvbnMucmFkaXVzLCAwLCBNYXRoLlBJICogMik7XHJcblxyXG4gICAgICAgIGNhbnZhc0NvbnRleHQudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcclxuICAgICAgICBjYW52YXNDb250ZXh0LmZvbnQgPSB0aGlzLm9wdGlvbnMucmFkaXVzICogMiArIFwicHhcIjtcclxuICAgICAgICBjYW52YXNDb250ZXh0LnN0cm9rZVRleHQodGhpcy5ub2RlLmluZGV4LnRvU3RyaW5nKCksIHRoaXMub3B0aW9ucy5zdGFydFgsIHRoaXMub3B0aW9ucy5zdGFydFksIHRoaXMub3B0aW9ucy5yYWRpdXMgLyAyKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMubm9kZS5tYXJrRGF0YSkge1xyXG4gICAgICAgICAgICBsZXQgcHJldk5vZGUgPSAodGhpcy5ub2RlLnByZXZOb2RlICYmIHRoaXMubm9kZS5wcmV2Tm9kZS5pbmRleC50b1N0cmluZygpKSB8fCAwO1xyXG4gICAgICAgICAgICBsZXQgbWFya0RhdGEgPSB0aGlzLm5vZGUubWFya0RhdGE7XHJcbiAgICAgICAgICAgIGlmIChtYXJrRGF0YSA8IDApIHtcclxuICAgICAgICAgICAgICAgIG1hcmtEYXRhID0gTWF0aC5hYnMobWFya0RhdGEpO1xyXG4gICAgICAgICAgICAgICAgcHJldk5vZGUgKz0gXCItXCI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNhbnZhc0NvbnRleHQudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcclxuICAgICAgICAgICAgY2FudmFzQ29udGV4dC5mb250ID0gdGhpcy5vcHRpb25zLnJhZGl1cyArIFwicHhcIjtcclxuICAgICAgICAgICAgY2FudmFzQ29udGV4dC5maWxsVGV4dChcIltcIiArIHByZXZOb2RlICsgXCI7IFwiICsgbWFya0RhdGEgKyBcIl1cIiwgdGhpcy5vcHRpb25zLnN0YXJ0WCwgdGhpcy5vcHRpb25zLnN0YXJ0WSAtIHRoaXMub3B0aW9ucy5yYWRpdXMgLSAxMCwgMiAqIHRoaXMub3B0aW9ucy5yYWRpdXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2FudmFzQ29udGV4dC5zdHJva2UoKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMubm9kZS5pc1N0b2NrT3JFbmQpIHtcclxuICAgICAgICAgICAgY2FudmFzQ29udGV4dC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgY2FudmFzQ29udGV4dC5hcmModGhpcy5vcHRpb25zLnN0YXJ0WCwgdGhpcy5vcHRpb25zLnN0YXJ0WSwgdGhpcy5vcHRpb25zLnJhZGl1cyAqIDAuOCwgMCwgTWF0aC5QSSAqIDIpO1xyXG4gICAgICAgICAgICBjYW52YXNDb250ZXh0LnN0cm9rZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2FudmFzQ29udGV4dC5zdHJva2VTdHlsZSA9IG9sZFN0eWxlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc0N1ck5vZGUobm9kZTogR3JhcGhOb2RlKSB7XHJcbiAgICAgICAgcmV0dXJuIChub2RlLmluZGV4ID09IHRoaXMubm9kZS5pbmRleCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFJlbGF0aW9uUHJlc2VudGVyIHtcclxuXHJcbiAgICBwcm90ZWN0ZWQgcmVsYXRpb246IFJlbGF0aW9uO1xyXG4gICAgcHVibGljIHJlbGF0aW9uU3R5bGU6IHN0cmluZyB8IENhbnZhc0dyYWRpZW50IHwgQ2FudmFzUGF0dGVybjsgXHJcblxyXG4gICAgcHJvdGVjdGVkIHN0YXJ0Tm9kZVByZXNlbnRlcjogTm9kZVByZXNlbnRlcjtcclxuICAgIHByb3RlY3RlZCBlbmROb2RlUHJlc2VudGVyOiBOb2RlUHJlc2VudGVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHJlbGF0aW9uOiBSZWxhdGlvbiwgc3RhcnROb2RlOiBOb2RlUHJlc2VudGVyLCBlbmROb2RlOiBOb2RlUHJlc2VudGVyKSB7XHJcbiAgICAgICAgdGhpcy5yZWxhdGlvbiA9IHJlbGF0aW9uO1xyXG5cclxuICAgICAgICB0aGlzLnN0YXJ0Tm9kZVByZXNlbnRlciA9IHN0YXJ0Tm9kZTtcclxuICAgICAgICB0aGlzLmVuZE5vZGVQcmVzZW50ZXIgPSBlbmROb2RlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW5kZXIoY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogdm9pZCB7XHJcblxyXG5cclxuICAgICAgICBsZXQgc3RhcnROb2RlOiBOb2RlUHJlc2VudGVyID0gdGhpcy5zdGFydE5vZGVQcmVzZW50ZXI7XHJcbiAgICAgICAgbGV0IGVuZE5vZGU6IE5vZGVQcmVzZW50ZXIgPSB0aGlzLmVuZE5vZGVQcmVzZW50ZXI7XHJcblxyXG4gICAgICAgIGxldCBvbGRTdHlsZSA9IGNvbnRleHQuc3Ryb2tlU3R5bGU7XHJcbiAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9IHRoaXMucmVsYXRpb25TdHlsZSB8fCBvbGRTdHlsZTtcclxuXHJcbiAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcclxuXHJcblxyXG4gICAgICAgIGxldCByZWxhdGlvbkxpbmU6IExpbmVPcHRpb25zID0gdGhpcy5nZXRSZWxhdGlvbkxpbmUoc3RhcnROb2RlLCBlbmROb2RlKTtcclxuXHJcbiAgICAgICAgY29udGV4dC5maWxsVGV4dChcImQgPSBcIiArIHRoaXMucmVsYXRpb24uZCwgKHJlbGF0aW9uTGluZS54MSArIHJlbGF0aW9uTGluZS54MikgLyAyLCAocmVsYXRpb25MaW5lLnkxICsgcmVsYXRpb25MaW5lLnkyIC0gMjApIC8gMik7XHJcbiAgICAgICAgY29udGV4dC5maWxsVGV4dChcInIgPSBcIiArIHRoaXMucmVsYXRpb24uciwgKHJlbGF0aW9uTGluZS54MSArIHJlbGF0aW9uTGluZS54MikgLyAyLCAocmVsYXRpb25MaW5lLnkxICsgcmVsYXRpb25MaW5lLnkyICsgMjApIC8gMik7XHJcblxyXG5cclxuICAgICAgICBjb250ZXh0Lm1vdmVUbyhyZWxhdGlvbkxpbmUueDEsIHJlbGF0aW9uTGluZS55MSk7XHJcbiAgICAgICAgY29udGV4dC5saW5lVG8ocmVsYXRpb25MaW5lLngyLCByZWxhdGlvbkxpbmUueTIpO1xyXG4gICAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XHJcblxyXG4gICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBvbGRTdHlsZTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZ2V0UmVsYXRpb25MaW5lKHN0YXJ0Tm9kZTogTm9kZVByZXNlbnRlciwgZW5kTm9kZTogTm9kZVByZXNlbnRlcik6IExpbmVPcHRpb25zIHtcclxuICAgICAgICBsZXQgZGlmWSA9IGVuZE5vZGUub3B0aW9ucy5zdGFydFkgLSBzdGFydE5vZGUub3B0aW9ucy5zdGFydFk7XHJcbiAgICAgICAgbGV0IGRpZlggPSBlbmROb2RlLm9wdGlvbnMuc3RhcnRYIC0gc3RhcnROb2RlLm9wdGlvbnMuc3RhcnRYO1xyXG5cclxuICAgICAgICBsZXQgYyA9IE1hdGguc3FydChNYXRoLnBvdyhkaWZZLCAyKSArIE1hdGgucG93KGRpZlgsIDIpKTtcclxuICAgICAgICBsZXQgYSA9IGRpZlkgLyBjO1xyXG4gICAgICAgIGxldCBiID0gZGlmWCAvIGM7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgeDE6IHN0YXJ0Tm9kZS5vcHRpb25zLnN0YXJ0WCArIHN0YXJ0Tm9kZS5vcHRpb25zLnJhZGl1cyAqIGIsXHJcbiAgICAgICAgICAgIHkxOiBzdGFydE5vZGUub3B0aW9ucy5zdGFydFkgKyBzdGFydE5vZGUub3B0aW9ucy5yYWRpdXMgKiBhLFxyXG4gICAgICAgICAgICB4MjogZW5kTm9kZS5vcHRpb25zLnN0YXJ0WCAtIGVuZE5vZGUub3B0aW9ucy5yYWRpdXMgKiBiLFxyXG4gICAgICAgICAgICB5MjogZW5kTm9kZS5vcHRpb25zLnN0YXJ0WSAtIGVuZE5vZGUub3B0aW9ucy5yYWRpdXMgKiBhXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc0N1clJlbGF0aW9uKHJlbDogUmVsYXRpb24pIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZWxhdGlvbiA9PSByZWw7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBHcmFwdGhQcmVzZW50ZXIge1xyXG5cclxuICAgIHByb3RlY3RlZCBncmF0aDogR3JhcGg7XHJcblxyXG4gICAgcHJvdGVjdGVkIHJlbGF0aW9uUHJlc2VudGVyczogUmVsYXRpb25QcmVzZW50ZXJbXTtcclxuICAgIHByb3RlY3RlZCBub2RlUHJlc2VudGVyczogTm9kZVByZXNlbnRlcltdO1xyXG5cclxuICAgIHByb3RlY3RlZCBkb21FbGVtZW50OiBIVE1MQ2FudmFzRWxlbWVudDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihncmFwaDogR3JhcGgsIGRvbUVsZW1lbnQ6IEhUTUxDYW52YXNFbGVtZW50KSB7XHJcbiAgICAgICAgdGhpcy5ncmF0aCA9IGdyYXBoO1xyXG4gICAgICAgIHRoaXMuZG9tRWxlbWVudCA9IGRvbUVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5pbml0UHJlc2VudGVycyhncmFwaCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyByZW5kZXIoc29ydE5vZGVzOiBib29sZWFuID0gZmFsc2UpIHtcclxuXHJcbiAgICAgICAgbGV0IGNvbnRleHQgPSB0aGlzLmRvbUVsZW1lbnQuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgIGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMuZG9tRWxlbWVudC53aWR0aCwgdGhpcy5kb21FbGVtZW50LmhlaWdodCk7XHJcblxyXG4gICAgICAgIC8vINCf0LXRgNC10YHRh9GR0YIg0LrQvtC+0YDQtNC40L3QsNGCINC4INC/0YDQvtGB0YLQsNC90L7QstC60LBcclxuICAgICAgICBsZXQgb3B0aW9uczogTm9kZVByZXNlbnRlck9wdGlvbnNbXSA9IHRoaXMuZ2V0Tm9kZVByZXNlbnRlck9wdGlvbnMoc29ydE5vZGVzKTtcclxuICAgICAgICB0aGlzLm5vZGVQcmVzZW50ZXJzLmZvckVhY2goeCA9PiB7IHgub3B0aW9ucyA9IG9wdGlvbnMuc2hpZnQoKTsgeC5yZW5kZXIoY29udGV4dCk7IH0pO1xyXG5cclxuICAgICAgICAvLyDQntGC0YDQuNGB0L7QstC60LAg0YHQstGP0LfQtdC5INC4INCy0YvQt9C+0LIg0L7RgtGA0LjRgdC+0LrQuCDQstC10YDRiNC40L1cclxuICAgICAgICB0aGlzLnJlbGF0aW9uUHJlc2VudGVycy5mb3JFYWNoKHggPT4ge1xyXG4gICAgICAgICAgICB4LnJlbmRlcihjb250ZXh0KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0Tm9kZVN0eWxlKGlkeDogbnVtYmVyLCBzdHlsZTogc3RyaW5nIHwgQ2FudmFzR3JhZGllbnQgfCBDYW52YXNQYXR0ZXJuKSB7XHJcbiAgICAgICAgbGV0IG5vZGU6IE5vZGVQcmVzZW50ZXIgPSB0aGlzLmdldE5vZGVQcmVzZW50ZXIodGhpcy5ncmF0aC5nZXROb2RlQnlJbmRleChpZHgpKTtcclxuICAgICAgICBub2RlLm5vZGVTdHlsZSA9IHN0eWxlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRSZWxhdGlvblN0eWxlKGlkeFN0YXJ0OiBudW1iZXIsIGlkeEVuZDogbnVtYmVyLCBzdHlsZTogc3RyaW5nIHwgQ2FudmFzR3JhZGllbnQgfCBDYW52YXNQYXR0ZXJuKSB7XHJcbiAgICAgICAgbGV0IHJlbGF0aW9uID0gdGhpcy5ncmF0aC5nZXRSZWxhdGlvbih0aGlzLmdyYXRoLmdldE5vZGVCeUluZGV4KGlkeFN0YXJ0KSwgdGhpcy5ncmF0aC5nZXROb2RlQnlJbmRleChpZHhFbmQpKTtcclxuICAgICAgICBsZXQgcmVsUHJlc2VudGVyID0gdGhpcy5yZWxhdGlvblByZXNlbnRlcnMuZmlsdGVyKHggPT4geC5pc0N1clJlbGF0aW9uKHJlbGF0aW9uKSlbMF07XHJcbiAgICAgICAgcmVsUHJlc2VudGVyLnJlbGF0aW9uU3R5bGUgPSBzdHlsZSB8fCBcImJsYWNrXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEdyYXBoKCk6IEdyYXBoIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5ncmF0aDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXJTdHlsZXMoKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IG5vZGVzID0gdGhpcy5ub2RlUHJlc2VudGVycy5maWx0ZXIoeCA9PiB4Lm5vZGVTdHlsZSk7XHJcbiAgICAgICAgbm9kZXMuZm9yRWFjaCh4ID0+IHgubm9kZVN0eWxlID0gbnVsbCk7XHJcblxyXG4gICAgICAgIGxldCByZWwgPSB0aGlzLnJlbGF0aW9uUHJlc2VudGVycy5maWx0ZXIoeCA9PiB4LnJlbGF0aW9uU3R5bGUpO1xyXG4gICAgICAgIHJlbC5mb3JFYWNoKHggPT4geC5yZWxhdGlvblN0eWxlID0gbnVsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRQcmVzZW50ZXJzKGdyYXBoOiBHcmFwaCk6IHZvaWQge1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICB0aGF0LnJlbGF0aW9uUHJlc2VudGVycyA9IFtdO1xyXG4gICAgICAgIHRoYXQubm9kZVByZXNlbnRlcnMgPSBbXTtcclxuXHJcbiAgICAgICAgLy8g0J/RgNC+0YXQvtC00LjQvCDQv9C+INCy0YHQtdC8INGB0LLRj9C30Y/QvFxyXG4gICAgICAgIGdyYXBoLnJlbGF0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChyZWxhdGlvbikge1xyXG4gICAgICAgICAgICBsZXQgZmlyc3ROb2RlID0gdGhhdC5nZXROb2RlUHJlc2VudGVyKHJlbGF0aW9uLnN0YXJ0Tm9kZSk7XHJcbiAgICAgICAgICAgIGxldCBzZWNvbk5vZGUgPSB0aGF0LmdldE5vZGVQcmVzZW50ZXIocmVsYXRpb24uZW5kTm9kZSk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LnJlbGF0aW9uUHJlc2VudGVycy5wdXNoKG5ldyBSZWxhdGlvblByZXNlbnRlcihyZWxhdGlvbiwgZmlyc3ROb2RlLCBzZWNvbk5vZGUpKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZ2V0Tm9kZVByZXNlbnRlcihub2RlOiBHcmFwaE5vZGUpOiBOb2RlUHJlc2VudGVyIHtcclxuICAgICAgICBsZXQgbm9kZVByZXNlbnRlcjogTm9kZVByZXNlbnRlciA9IHRoaXMubm9kZVByZXNlbnRlcnMuZmlsdGVyKHggPT4geC5pc0N1ck5vZGUobm9kZSkpWzBdO1xyXG4gICAgICAgIGlmICghbm9kZVByZXNlbnRlcikge1xyXG4gICAgICAgICAgICBub2RlUHJlc2VudGVyID0gbmV3IE5vZGVQcmVzZW50ZXIobm9kZSk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZVByZXNlbnRlcnMucHVzaChub2RlUHJlc2VudGVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5vZGVQcmVzZW50ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGdldE5vZGVQcmVzZW50ZXJPcHRpb25zKHNvcnROb2RlczogYm9vbGVhbiA9IGZhbHNlKTogTm9kZVByZXNlbnRlck9wdGlvbnNbXSB7XHJcbiAgICAgICAgbGV0IGNlbnRlclggPSB0aGlzLmRvbUVsZW1lbnQud2lkdGggLyAyO1xyXG4gICAgICAgIGxldCBjZW50ZXJZID0gdGhpcy5kb21FbGVtZW50LmhlaWdodCAvIDI7XHJcblxyXG4gICAgICAgIGxldCBub2RlQ291bnQgPSB0aGlzLmdyYXRoLm5vZGVzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgbGV0IHJhZCA9IE1hdGgubWluKGNlbnRlclgsIGNlbnRlclkpIC8gNztcclxuICAgICAgICBsZXQgZ3JhZCA9IDIgKiBNYXRoLlBJIC8gbm9kZUNvdW50O1xyXG5cclxuICAgICAgICBsZXQgb3B0aW9uczogTm9kZVByZXNlbnRlck9wdGlvbnNbXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZUNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgb3B0aW9ucy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHN0YXJ0WDogY2VudGVyWCArIHRoaXMuZG9tRWxlbWVudC53aWR0aCAqIE1hdGguY29zKGkgKiBncmFkICsgTWF0aC5QSSkgLyAzLFxyXG4gICAgICAgICAgICAgICAgc3RhcnRZOiBjZW50ZXJZICsgdGhpcy5kb21FbGVtZW50LmhlaWdodCAqIE1hdGguc2luKGkgKiBncmFkICsgTWF0aC5QSSkgLyAzLFxyXG4gICAgICAgICAgICAgICAgcmFkaXVzOiByYWRcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKCFzb3J0Tm9kZXMpIG9wdGlvbnMgPSBvcHRpb25zLnNvcnQoKGEsIGIpID0+IGEuc3RhcnRYIC0gYi5zdGFydFgpO1xyXG4gICAgICAgIHJldHVybiBvcHRpb25zO1xyXG4gICAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vU2NyaXB0cy9ncmFwaFByZXNlbnRlci50cyIsImltcG9ydCAqIGFzIFZpenVhbGl6ZXIgZnJvbSBcIi4vVml6dWFsaXplclwiO1xyXG5sZXQgdml6ID0gbmV3IFZpenVhbGl6ZXIuVml6dWFsaXplcigpO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9TY3JpcHRzL21haW4udHMiXSwic291cmNlUm9vdCI6IiJ9