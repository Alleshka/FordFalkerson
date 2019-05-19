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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return GraphNode; });
/* unused harmony export Relation */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Graph; });
var GraphNode = /** @class */ (function () {
    function GraphNode(idx) {
        this.index = idx;
        this.output = [];
    }
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
    return Graph;
}());



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Step */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Vuzualizer; });
var Step = /** @class */ (function () {
    function Step() {
    }
    return Step;
}());

var Vuzualizer = /** @class */ (function () {
    function Vuzualizer() {
        this.steps = [];
    }
    Vuzualizer.prototype.addStep = function (descr, action) {
        this.steps.push({
            descr: descr,
            action: action
        });
    };
    Vuzualizer.prototype.getStep = function (idx) {
        this.steps[idx].action.call(this);
    };
    return Vuzualizer;
}());



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FordFalkerson; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__graph__ = __webpack_require__(0);

var FordFalkerson = /** @class */ (function () {
    function FordFalkerson() {
    }
    FordFalkerson.prototype.runAlg = function (graph, viz) {
        var that = this;
        var queue = [];
        var curNode;
        var emptyNode = new __WEBPACK_IMPORTED_MODULE_0__graph__["b" /* GraphNode */](0);
        while (true) {
            graph.source.markData = Infinity;
            graph.source.prevNode = emptyNode;
            queue.push(graph.source);
            while (queue.length != 0) {
                curNode = queue.shift();
                if (viz) {
                    viz.addStep("Выбираем вершину", function () {
                        var node = viz.presenter.getNodePresenter(curNode.index);
                        node.render("green");
                    });
                }
                var neightboards = curNode.output.map(function (x) { return curNode == x.startNode ? x.endNode : x.startNode; }).filter(function (x) {
                    var rel = graph.getRelation(curNode, x);
                    return (rel.d < rel.r) && (!x.prevNode || (x == graph.end));
                });
                neightboards.forEach(function (x) {
                    x.prevNode = curNode;
                    var relation = graph.getRelation(curNode, x);
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
            if (!graph.end.prevNode)
                break;
            else {
                that.clearMarks(graph);
            }
        }
        console.log(graph);
        var result = 0;
        graph.source.output.forEach(function (x) { return result += x.d; });
        return result;
    };
    FordFalkerson.prototype.nodeComparer = function (a, b) {
        return a.index - b.index;
    };
    FordFalkerson.prototype.stockWasVisited = function (graph) {
        var curNode = graph.end;
        while (curNode != graph.source) {
            var relation = graph.getRelation(curNode, curNode.prevNode);
            relation.d = (relation.d || 0) + curNode.markData;
            curNode.prevNode.markData = curNode.markData;
            curNode.markData = null;
            curNode = curNode.prevNode;
        }
        curNode.markData = Infinity;
    };
    FordFalkerson.prototype.clearMarks = function (graph) {
        graph.nodes.forEach(function (x) {
            x.markData = 0;
            x.prevNode = null;
        });
    };
    return FordFalkerson;
}());



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GraphPresenter; });
var NodePresenter = /** @class */ (function () {
    function NodePresenter(node, point, domElement) {
        this.node = node;
        this.point = point;
        this.dom = domElement;
    }
    NodePresenter.prototype.render = function (style, domElement) {
        domElement = domElement || this.dom;
        var context = domElement.getContext("2d");
        context.beginPath();
        context.fillStyle = style;
        context.arc(this.point.x, this.point.y, 50, 0, 360);
        context.stroke();
    };
    return NodePresenter;
}());
var RelationPresenter = /** @class */ (function () {
    function RelationPresenter(rel, domElement) {
        this.relation = rel;
    }
    RelationPresenter.prototype.render = function (style, domElement) {
        console.log("hi mark");
    };
    return RelationPresenter;
}());
var GraphPresenter = /** @class */ (function () {
    function GraphPresenter(graph, points, domElement) {
        var _this = this;
        this.nodePresenters = [];
        this.relationPresenters = [];
        this.graph = graph;
        graph.nodes.forEach(function (node, i) {
            _this.nodePresenters.push(new NodePresenter(node, points[i] || points[0], domElement));
        });
        graph.relations.forEach(function (x) { return _this.relationPresenters.push(new RelationPresenter(x, domElement)); });
    }
    GraphPresenter.prototype.render = function (style, domElement) {
        domElement = domElement || this.domElement;
        this.nodePresenters.forEach(function (x) { return x.render(style, domElement); });
        this.relationPresenters.forEach(function (x) { return x.render(style, domElement); });
    };
    GraphPresenter.prototype.getNodePresenter = function (nodeIndex) {
        return this.nodePresenters.filter(function (x) { return x.node.index == nodeIndex; })[0];
    };
    GraphPresenter.prototype.getRelationPresenter = function (firsNode, seconNode) {
        var relData = this.graph.getRelation(this.graph.getNodeByIndex(firsNode), this.graph.getNodeByIndex(seconNode));
        return this.relationPresenters.filter(function (x) { return x.relation == relData; });
    };
    return GraphPresenter;
}());



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fordFulkersonAlg__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__graph__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__graphPresenter__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__AlgVisualisator__ = __webpack_require__(1);




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
graph.source = graph.getNodeByIndex(1);
graph.end = graph.getNodeByIndex(5);
var presenter = new __WEBPACK_IMPORTED_MODULE_2__graphPresenter__["a" /* GraphPresenter */](graph, [
    { x: 10, y: 10 },
    { x: 60, y: 60 },
    { x: 120, y: 120 },
    { x: 180, y: 180 },
    { x: 220, y: 220 },
    { x: 270, y: 270 },
], document.getElementById("canvas"));
presenter.render("black", document.getElementById("canvas"));
var viz = new __WEBPACK_IMPORTED_MODULE_3__AlgVisualisator__["a" /* Vuzualizer */]();
viz.presenter = presenter;
var alg = new __WEBPACK_IMPORTED_MODULE_0__fordFulkersonAlg__["a" /* FordFalkerson */]();
alg.runAlg(graph, viz);
document.getElementById("canvas").onclick = function (e) {
    viz.getStep(Math.floor(Math.random() * (viz.steps.length - 1)));
};


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjkwZDFhMTI5Mzk2MjBiMWJhYjUiLCJ3ZWJwYWNrOi8vLy4vU2NyaXB0cy9ncmFwaC50cyIsIndlYnBhY2s6Ly8vLi9TY3JpcHRzL0FsZ1Zpc3VhbGlzYXRvci50cyIsIndlYnBhY2s6Ly8vLi9TY3JpcHRzL2ZvcmRGdWxrZXJzb25BbGcudHMiLCJ3ZWJwYWNrOi8vLy4vU2NyaXB0cy9ncmFwaFByZXNlbnRlci50cyIsIndlYnBhY2s6Ly8vLi9TY3JpcHRzL21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztBQzlEQTtBQUFBO0FBQUE7QUFBQTtJQU9JLG1CQUFZLEdBQVc7UUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7UUFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUNMLGdCQUFDO0FBQUQsQ0FBQzs7QUFFRDtJQU9JLGtCQUFZLEtBQWdCLEVBQUUsR0FBYyxFQUFFLENBQVM7UUFDbkQsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7UUFDbkIsSUFBSSxD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RyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUU7SUFDbEIsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUU7SUFDbEIsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUU7Q0FDckIsRUFDa0IsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FDdkQsQ0FBQztBQUNGLFNBQVMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFxQixRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRS9FLElBQUksR0FBRyxHQUFHLElBQUksb0VBQVUsRUFBRSxDQUFDO0FBQzNCLEdBQUcsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0FBRTFCLElBQUksR0FBRyxHQUFHLElBQUksd0VBQWdCLEVBQUUsQ0FBQztBQUNqQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztBQUV2QixRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sR0FBRyxVQUFDLENBQUM7SUFDMUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNwRSxDQUFDIiwiZmlsZSI6InNjcmlwdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYjkwZDFhMTI5Mzk2MjBiMWJhYjUiLCJcclxuXHJcbmV4cG9ydCBjbGFzcyBHcmFwaE5vZGUge1xyXG5cclxuICAgIHB1YmxpYyBpbmRleDogbnVtYmVyO1xyXG4gICAgcHVibGljIHByZXZOb2RlOiBHcmFwaE5vZGU7XHJcbiAgICBwdWJsaWMgb3V0cHV0OiBSZWxhdGlvbltdO1xyXG4gICAgcHVibGljIG1hcmtEYXRhOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoaWR4OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmluZGV4ID0gaWR4O1xyXG4gICAgICAgIHRoaXMub3V0cHV0ID0gW107XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBSZWxhdGlvbiB7XHJcbiAgICBwdWJsaWMgZDogbnVtYmVyO1xyXG4gICAgcHVibGljIHI6IG51bWJlcjtcclxuXHJcbiAgICBwdWJsaWMgc3RhcnROb2RlOiBHcmFwaE5vZGU7XHJcbiAgICBwdWJsaWMgZW5kTm9kZTogR3JhcGhOb2RlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHN0YXJ0OiBHcmFwaE5vZGUsIGVuZDogR3JhcGhOb2RlLCByOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnN0YXJ0Tm9kZSA9IHN0YXJ0O1xyXG4gICAgICAgIHRoaXMuZW5kTm9kZSA9IGVuZDtcclxuICAgICAgICB0aGlzLnIgPSByO1xyXG4gICAgICAgIHRoaXMuZCA9IDA7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBHcmFwaCB7XHJcbiAgICBwdWJsaWMgbm9kZXM6IEdyYXBoTm9kZVtdO1xyXG4gICAgcHVibGljIHJlbGF0aW9uczogUmVsYXRpb25bXTtcclxuXHJcbiAgICBwdWJsaWMgc291cmNlOiBHcmFwaE5vZGU7XHJcbiAgICBwdWJsaWMgZW5kOiBHcmFwaE5vZGU7XHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKG1hdHJpeD86IG51bWJlcltdW10pIHtcclxuICAgICAgICB0aGlzLm5vZGVzID0gW107XHJcbiAgICAgICAgdGhpcy5yZWxhdGlvbnMgPSBbXTtcclxuXHJcbiAgICAgICAgaWYgKG1hdHJpeCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtYXRyaXgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGFkZE5vZGUobm9kZTogR3JhcGhOb2RlKSB7XHJcbiAgICAgICAgdGhpcy5ub2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRSZWxhdGlvbihpZHhTdGFydDogbnVtYmVyLCBpZHhFbmQ6IG51bWJlciwgcjogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHN0YXJ0OiBHcmFwaE5vZGUgPSB0aGlzLmdldE5vZGVCeUluZGV4KGlkeFN0YXJ0KTtcclxuICAgICAgICBsZXQgZW5kOiBHcmFwaE5vZGUgPSB0aGlzLmdldE5vZGVCeUluZGV4KGlkeEVuZCk7XHJcblxyXG4gICAgICAgIGxldCByZWwgPSBuZXcgUmVsYXRpb24oc3RhcnQsIGVuZCwgcik7XHJcbiAgICAgICAgc3RhcnQub3V0cHV0LnB1c2gocmVsKTtcclxuICAgICAgICBlbmQub3V0cHV0LnB1c2gocmVsKTtcclxuICAgICAgICB0aGlzLnJlbGF0aW9ucy5wdXNoKHJlbCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldE5vZGVCeUluZGV4KGlkeDogbnVtYmVyKTogR3JhcGhOb2RlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5ub2Rlcy5maWx0ZXIoeCA9PiB4LmluZGV4ID09IGlkeClbMF07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFJlbGF0aW9uKGE6IEdyYXBoTm9kZSwgYjogR3JhcGhOb2RlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVsYXRpb25zLmZpbHRlcih4ID0+ICh4LnN0YXJ0Tm9kZSA9PSBhICYmIHguZW5kTm9kZSA9PSBiKSB8fCAoeC5lbmROb2RlID09IGEgJiYgeC5zdGFydE5vZGUgPT0gYikpWzBdO1xyXG4gICAgfVxyXG5cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL1NjcmlwdHMvZ3JhcGgudHMiLCJpbXBvcnQgKiBhcyBQcmVzZW50ZXIgZnJvbSBcIi4vZ3JhcGhQcmVzZW50ZXJcIlxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBTdGVwIHtcclxuXHJcbiAgICBwdWJsaWMgZGVzY3I6IHN0cmluZztcclxuICAgIHB1YmxpYyBhY3Rpb246IEZ1bmN0aW9uO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFZ1enVhbGl6ZXIge1xyXG4gICAgcHVibGljIHN0ZXBzOiBTdGVwW107XHJcbiAgICBwdWJsaWMgcHJlc2VudGVyOiBQcmVzZW50ZXIuR3JhcGhQcmVzZW50ZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5zdGVwcyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRTdGVwKGRlc2NyOiBzdHJpbmcsIGFjdGlvbjogRnVuY3Rpb24pIHtcclxuICAgICAgICB0aGlzLnN0ZXBzLnB1c2goe1xyXG4gICAgICAgICAgICBkZXNjcjogZGVzY3IsXHJcbiAgICAgICAgICAgIGFjdGlvbjogYWN0aW9uXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFN0ZXAoaWR4OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnN0ZXBzW2lkeF0uYWN0aW9uLmNhbGwodGhpcyk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL1NjcmlwdHMvQWxnVmlzdWFsaXNhdG9yLnRzIiwiaW1wb3J0ICogYXMgR3IgZnJvbSBcIi4vZ3JhcGhcIlxyXG5pbXBvcnQgeyBWdXp1YWxpemVyIH0gZnJvbSBcIi4vQWxnVmlzdWFsaXNhdG9yXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRm9yZEZhbGtlcnNvbiB7XHJcblxyXG4gICAgcHVibGljIHJ1bkFsZyhncmFwaDogR3IuR3JhcGgsIHZpej86IFZ1enVhbGl6ZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgbGV0IHF1ZXVlOiBHci5HcmFwaE5vZGVbXSA9IFtdO1xyXG4gICAgICAgIGxldCBjdXJOb2RlOiBHci5HcmFwaE5vZGU7XHJcblxyXG4gICAgICAgIGxldCBlbXB0eU5vZGUgPSBuZXcgR3IuR3JhcGhOb2RlKDApO1xyXG5cclxuICAgICAgICB3aGlsZSAodHJ1ZSkge1xyXG5cclxuICAgICAgICAgICAgZ3JhcGguc291cmNlLm1hcmtEYXRhID0gSW5maW5pdHk7XHJcbiAgICAgICAgICAgIGdyYXBoLnNvdXJjZS5wcmV2Tm9kZSA9IGVtcHR5Tm9kZTtcclxuICAgICAgICAgICAgcXVldWUucHVzaChncmFwaC5zb3VyY2UpO1xyXG5cclxuICAgICAgICAgICAgd2hpbGUgKHF1ZXVlLmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJOb2RlID0gcXVldWUuc2hpZnQoKTtcclxuICAgICAgICAgICAgICAgIGlmICh2aXopIHtcclxuICAgICAgICAgICAgICAgICAgICB2aXouYWRkU3RlcChcItCS0YvQsdC40YDQsNC10Lwg0LLQtdGA0YjQuNC90YNcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbm9kZSA9IHZpei5wcmVzZW50ZXIuZ2V0Tm9kZVByZXNlbnRlcihjdXJOb2RlLmluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5yZW5kZXIoXCJncmVlblwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG5laWdodGJvYXJkcyA9IGN1ck5vZGUub3V0cHV0Lm1hcCh4ID0+IGN1ck5vZGUgPT0geC5zdGFydE5vZGUgPyB4LmVuZE5vZGUgOiB4LnN0YXJ0Tm9kZSkuZmlsdGVyKHggPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByZWwgPSBncmFwaC5nZXRSZWxhdGlvbihjdXJOb2RlLCB4KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHJlbC5kIDwgcmVsLnIpICYmICgheC5wcmV2Tm9kZSB8fCAoeCA9PSBncmFwaC5lbmQpKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIG5laWdodGJvYXJkcy5mb3JFYWNoKHggPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHgucHJldk5vZGUgPSBjdXJOb2RlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVsYXRpb24gPSBncmFwaC5nZXRSZWxhdGlvbihjdXJOb2RlLCB4KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVsYXRpb24uZCA8IHJlbGF0aW9uLnIgJiYgcmVsYXRpb24uc3RhcnROb2RlID09IGN1ck5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeC5tYXJrRGF0YSA9IE1hdGgubWluKHJlbGF0aW9uLnIgLSByZWxhdGlvbi5kLCBNYXRoLmFicyh4LnByZXZOb2RlLm1hcmtEYXRhKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB4Lm1hcmtEYXRhID0gKC0xKSAqIE1hdGgubWluKE1hdGguYWJzKHgucHJldk5vZGUubWFya0RhdGEpLCByZWxhdGlvbi5kKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh4ICE9IGdyYXBoLmVuZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWV1ZS5wdXNoKHgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWV1ZSA9IHF1ZXVlLnNvcnQodGhhdC5ub2RlQ29tcGFyZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zdG9ja1dhc1Zpc2l0ZWQoZ3JhcGgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIWdyYXBoLmVuZC5wcmV2Tm9kZSkgYnJlYWs7XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5jbGVhck1hcmtzKGdyYXBoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coZ3JhcGgpO1xyXG4gICAgICAgIGxldCByZXN1bHQgPSAwO1xyXG5cclxuICAgICAgICBncmFwaC5zb3VyY2Uub3V0cHV0LmZvckVhY2goeCA9PiByZXN1bHQgKz0geC5kKTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBub2RlQ29tcGFyZXIoYTogR3IuR3JhcGhOb2RlLCBiOiBHci5HcmFwaE5vZGUpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBhLmluZGV4IC0gYi5pbmRleDtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgc3RvY2tXYXNWaXNpdGVkKGdyYXBoOiBHci5HcmFwaCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBjdXJOb2RlID0gZ3JhcGguZW5kO1xyXG5cclxuICAgICAgICB3aGlsZSAoY3VyTm9kZSAhPSBncmFwaC5zb3VyY2UpIHtcclxuICAgICAgICAgICAgbGV0IHJlbGF0aW9uID0gZ3JhcGguZ2V0UmVsYXRpb24oY3VyTm9kZSwgY3VyTm9kZS5wcmV2Tm9kZSk7XHJcbiAgICAgICAgICAgIHJlbGF0aW9uLmQgPSAocmVsYXRpb24uZCB8fCAwKSArIGN1ck5vZGUubWFya0RhdGE7XHJcbiAgICAgICAgICAgIGN1ck5vZGUucHJldk5vZGUubWFya0RhdGEgPSBjdXJOb2RlLm1hcmtEYXRhO1xyXG4gICAgICAgICAgICBjdXJOb2RlLm1hcmtEYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgY3VyTm9kZSA9IGN1ck5vZGUucHJldk5vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGN1ck5vZGUubWFya0RhdGEgPSBJbmZpbml0eTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgY2xlYXJNYXJrcyhncmFwaDogR3IuR3JhcGgpOiB2b2lkIHtcclxuICAgICAgICBncmFwaC5ub2Rlcy5mb3JFYWNoKHggPT4ge1xyXG4gICAgICAgICAgICB4Lm1hcmtEYXRhID0gMDtcclxuICAgICAgICAgICAgeC5wcmV2Tm9kZSA9IG51bGw7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL1NjcmlwdHMvZm9yZEZ1bGtlcnNvbkFsZy50cyIsImltcG9ydCAqIGFzIEdyIGZyb20gXCIuL2dyYXBoXCJcclxuXHJcbmludGVyZmFjZSBJTm9kZVBvaW50IHtcclxuICAgIHg6IG51bWJlcjtcclxuICAgIHk6IG51bWJlcjtcclxufVxyXG5cclxuaW50ZXJmYWNlIElQcmVzZW50ZXIge1xyXG4gICAgcmVuZGVyKHN0eWxlPzogc3RyaW5nIHwgQ2FudmFzR3JhZGllbnQgfCBDYW52YXNQYXR0ZXJuLCBkb21FbGVtZW50PzogSFRNTENhbnZhc0VsZW1lbnQpIDogdm9pZDtcclxufVxyXG5cclxuY2xhc3MgTm9kZVByZXNlbnRlciBpbXBsZW1lbnRzIElQcmVzZW50ZXIge1xyXG5cclxuICAgIHB1YmxpYyBub2RlOiBHci5HcmFwaE5vZGU7XHJcbiAgICBwdWJsaWMgcG9pbnQ6IElOb2RlUG9pbnQ7XHJcbiAgICBwcm90ZWN0ZWQgZG9tOiBIVE1MQ2FudmFzRWxlbWVudDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihub2RlOiBHci5HcmFwaE5vZGUsIHBvaW50OiBJTm9kZVBvaW50LCBkb21FbGVtZW50PzogSFRNTENhbnZhc0VsZW1lbnQpIHtcclxuICAgICAgICB0aGlzLm5vZGUgPSBub2RlO1xyXG4gICAgICAgIHRoaXMucG9pbnQgPSBwb2ludDtcclxuICAgICAgICB0aGlzLmRvbSA9IGRvbUVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKHN0eWxlPzogc3RyaW5nIHwgQ2FudmFzR3JhZGllbnQgfCBDYW52YXNQYXR0ZXJuLCBkb21FbGVtZW50PzogSFRNTENhbnZhc0VsZW1lbnQpOiB2b2lkIHtcclxuICAgICAgICBkb21FbGVtZW50ID0gZG9tRWxlbWVudCB8fCB0aGlzLmRvbTtcclxuICAgICAgICB2YXIgY29udGV4dCA9IGRvbUVsZW1lbnQuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7ICAgXHJcbiAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBzdHlsZTtcclxuICAgICAgICBjb250ZXh0LmFyYyh0aGlzLnBvaW50LngsIHRoaXMucG9pbnQueSwgNTAsIDAsIDM2MCk7XHJcbiAgICAgICAgY29udGV4dC5zdHJva2UoKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgUmVsYXRpb25QcmVzZW50ZXIgaW1wbGVtZW50cyBJUHJlc2VudGVyIHtcclxuICAgIHB1YmxpYyByZWxhdGlvbjogR3IuUmVsYXRpb247XHJcblxyXG4gICAgY29uc3RydWN0b3IocmVsOiBHci5SZWxhdGlvbiwgZG9tRWxlbWVudD86IEhUTUxDYW52YXNFbGVtZW50KSB7XHJcbiAgICAgICAgdGhpcy5yZWxhdGlvbiA9IHJlbDtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoc3R5bGU/OiBzdHJpbmcgfCBDYW52YXNHcmFkaWVudCB8IENhbnZhc1BhdHRlcm4sIGRvbUVsZW1lbnQ/OiBIVE1MQ2FudmFzRWxlbWVudCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiaGkgbWFya1wiKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEdyYXBoUHJlc2VudGVyIGltcGxlbWVudHMgSVByZXNlbnRlciB7XHJcblxyXG4gICAgcHJvdGVjdGVkIG5vZGVQcmVzZW50ZXJzOiBOb2RlUHJlc2VudGVyW107XHJcbiAgICBwcm90ZWN0ZWQgcmVsYXRpb25QcmVzZW50ZXJzOiBSZWxhdGlvblByZXNlbnRlcltdO1xyXG4gICAgcHJvdGVjdGVkIGdyYXBoOiBHci5HcmFwaDtcclxuXHJcbiAgICBwcm90ZWN0ZWQgZG9tRWxlbWVudDogSFRNTENhbnZhc0VsZW1lbnQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IoZ3JhcGg6IEdyLkdyYXBoLCBwb2ludHM6IElOb2RlUG9pbnRbXSwgZG9tRWxlbWVudD86IEhUTUxDYW52YXNFbGVtZW50KSB7XHJcbiAgICAgICAgdGhpcy5ub2RlUHJlc2VudGVycyA9IFtdO1xyXG4gICAgICAgIHRoaXMucmVsYXRpb25QcmVzZW50ZXJzID0gW107XHJcbiAgICAgICAgdGhpcy5ncmFwaCA9IGdyYXBoO1xyXG5cclxuICAgICAgICBncmFwaC5ub2Rlcy5mb3JFYWNoKChub2RlLCBpKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZVByZXNlbnRlcnMucHVzaChuZXcgTm9kZVByZXNlbnRlcihub2RlLCBwb2ludHNbaV0gfHwgcG9pbnRzWzBdLCBkb21FbGVtZW50KSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGdyYXBoLnJlbGF0aW9ucy5mb3JFYWNoKHggPT4gdGhpcy5yZWxhdGlvblByZXNlbnRlcnMucHVzaChuZXcgUmVsYXRpb25QcmVzZW50ZXIoeCwgZG9tRWxlbWVudCkpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVuZGVyKHN0eWxlPzogc3RyaW5nIHwgQ2FudmFzR3JhZGllbnQgfCBDYW52YXNQYXR0ZXJuLCBkb21FbGVtZW50PzogSFRNTENhbnZhc0VsZW1lbnQpOiB2b2lkIHtcclxuICAgICAgICBkb21FbGVtZW50ID0gZG9tRWxlbWVudCB8fCB0aGlzLmRvbUVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5ub2RlUHJlc2VudGVycy5mb3JFYWNoKHggPT4geC5yZW5kZXIoc3R5bGUsIGRvbUVsZW1lbnQpKTtcclxuICAgICAgICB0aGlzLnJlbGF0aW9uUHJlc2VudGVycy5mb3JFYWNoKHggPT4geC5yZW5kZXIoc3R5bGUsIGRvbUVsZW1lbnQpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Tm9kZVByZXNlbnRlcihub2RlSW5kZXg6IG51bWJlcik6IE5vZGVQcmVzZW50ZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5vZGVQcmVzZW50ZXJzLmZpbHRlcih4ID0+IHgubm9kZS5pbmRleCA9PSBub2RlSW5kZXgpWzBdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRSZWxhdGlvblByZXNlbnRlcihmaXJzTm9kZTogbnVtYmVyLCBzZWNvbk5vZGU6IG51bWJlcikge1xyXG4gICAgICAgIGxldCByZWxEYXRhID0gdGhpcy5ncmFwaC5nZXRSZWxhdGlvbih0aGlzLmdyYXBoLmdldE5vZGVCeUluZGV4KGZpcnNOb2RlKSwgdGhpcy5ncmFwaC5nZXROb2RlQnlJbmRleChzZWNvbk5vZGUpKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZWxhdGlvblByZXNlbnRlcnMuZmlsdGVyKHggPT4geC5yZWxhdGlvbiA9PSByZWxEYXRhKTtcclxuICAgIH1cclxuXHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9TY3JpcHRzL2dyYXBoUHJlc2VudGVyLnRzIiwiaW1wb3J0ICogYXMgRkYgZnJvbSBcIi4vZm9yZEZ1bGtlcnNvbkFsZ1wiXHJcbmltcG9ydCAqIGFzIEdyIGZyb20gXCIuL2dyYXBoXCJcclxuaW1wb3J0ICogYXMgUHJlc2VudGVyIGZyb20gXCIuL2dyYXBoUHJlc2VudGVyXCJcclxuaW1wb3J0IHsgVnV6dWFsaXplciB9IGZyb20gXCIuL0FsZ1Zpc3VhbGlzYXRvclwiXHJcblxyXG4vL2xldCBncmFwaCA9IG5ldyBHci5HcmFwaCgpO1xyXG4vL2dyYXBoLmFkZE5vZGUobmV3IEdyLkdyYXBoTm9kZSgxKSk7XHJcbi8vZ3JhcGguYWRkTm9kZShuZXcgR3IuR3JhcGhOb2RlKDIpKTtcclxuLy9ncmFwaC5hZGROb2RlKG5ldyBHci5HcmFwaE5vZGUoMykpO1xyXG4vL2dyYXBoLmFkZE5vZGUobmV3IEdyLkdyYXBoTm9kZSg0KSk7XHJcbi8vZ3JhcGguYWRkTm9kZShuZXcgR3IuR3JhcGhOb2RlKDUpKTtcclxuLy9ncmFwaC5hZGROb2RlKG5ldyBHci5HcmFwaE5vZGUoNikpO1xyXG4vL2dyYXBoLmFkZE5vZGUobmV3IEdyLkdyYXBoTm9kZSg3KSk7XHJcbi8vZ3JhcGguYWRkTm9kZShuZXcgR3IuR3JhcGhOb2RlKDgpKTtcclxuXHJcbi8vZ3JhcGguYWRkUmVsYXRpb24oMSwgMiwgNyk7XHJcbi8vZ3JhcGguYWRkUmVsYXRpb24oMSwgMywgNCk7XHJcbi8vZ3JhcGguYWRkUmVsYXRpb24oMSwgNCwgOSk7XHJcbi8vZ3JhcGguYWRkUmVsYXRpb24oMiwgMywgMyk7XHJcbi8vZ3JhcGguYWRkUmVsYXRpb24oMiwgNSwgNSk7XHJcbi8vZ3JhcGguYWRkUmVsYXRpb24oMywgNiwgMTEpO1xyXG4vL2dyYXBoLmFkZFJlbGF0aW9uKDQsIDcsIDcpO1xyXG4vL2dyYXBoLmFkZFJlbGF0aW9uKDQsIDYsIDMpO1xyXG4vL2dyYXBoLmFkZFJlbGF0aW9uKDUsIDMsIDgpO1xyXG4vL2dyYXBoLmFkZFJlbGF0aW9uKDUsIDgsIDMpO1xyXG4vL2dyYXBoLmFkZFJlbGF0aW9uKDcsIDgsIDQpO1xyXG4vL2dyYXBoLmFkZFJlbGF0aW9uKDgsIDYsIDIpO1xyXG5cclxuLy9ncmFwaC5zb3VyY2UgPSBncmFwaC5nZXROb2RlQnlJbmRleCgxKTtcclxuLy9ncmFwaC5lbmQgPSBncmFwaC5nZXROb2RlQnlJbmRleCg2KTtcclxuXHJcbmxldCBncmFwaCA9IG5ldyBHci5HcmFwaCgpO1xyXG5ncmFwaC5hZGROb2RlKG5ldyBHci5HcmFwaE5vZGUoMSkpO1xyXG5ncmFwaC5hZGROb2RlKG5ldyBHci5HcmFwaE5vZGUoMikpO1xyXG5ncmFwaC5hZGROb2RlKG5ldyBHci5HcmFwaE5vZGUoMykpO1xyXG5ncmFwaC5hZGROb2RlKG5ldyBHci5HcmFwaE5vZGUoNCkpO1xyXG5ncmFwaC5hZGROb2RlKG5ldyBHci5HcmFwaE5vZGUoNSkpO1xyXG5cclxuZ3JhcGguYWRkUmVsYXRpb24oMSwgMiwgMjApO1xyXG5ncmFwaC5hZGRSZWxhdGlvbigxLCAzLCAzMCk7XHJcbmdyYXBoLmFkZFJlbGF0aW9uKDEsIDQsIDEwKTtcclxuZ3JhcGguYWRkUmVsYXRpb24oMiwgMywgNDApO1xyXG5ncmFwaC5hZGRSZWxhdGlvbigyLCA1LCAzMCk7XHJcbmdyYXBoLmFkZFJlbGF0aW9uKDMsIDQsIDEwKTtcclxuZ3JhcGguYWRkUmVsYXRpb24oMywgNSwgMjApO1xyXG5ncmFwaC5hZGRSZWxhdGlvbig0LCA1LCAyMCk7XHJcblxyXG5ncmFwaC5zb3VyY2UgPSBncmFwaC5nZXROb2RlQnlJbmRleCgxKTtcclxuZ3JhcGguZW5kID0gZ3JhcGguZ2V0Tm9kZUJ5SW5kZXgoNSk7XHJcblxyXG5sZXQgcHJlc2VudGVyID0gbmV3IFByZXNlbnRlci5HcmFwaFByZXNlbnRlcihncmFwaCxcclxuICAgIFtcclxuICAgICAgICB7IHg6IDEwLCB5OiAxMCB9LFxyXG4gICAgICAgIHsgeDogNjAsIHk6IDYwIH0sXHJcbiAgICAgICAgeyB4OiAxMjAsIHk6IDEyMCB9LFxyXG4gICAgICAgIHsgeDogMTgwLCB5OiAxODAgfSxcclxuICAgICAgICB7IHg6IDIyMCwgeTogMjIwIH0sXHJcbiAgICAgICAgeyB4OiAyNzAsIHk6IDI3MCB9LFxyXG4gICAgXSwgXHJcbiAgICA8SFRNTENhbnZhc0VsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW52YXNcIilcclxuKTtcclxucHJlc2VudGVyLnJlbmRlcihcImJsYWNrXCIsIDxIVE1MQ2FudmFzRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbnZhc1wiKSlcclxuXHJcbmxldCB2aXogPSBuZXcgVnV6dWFsaXplcigpO1xyXG52aXoucHJlc2VudGVyID0gcHJlc2VudGVyO1xyXG5cclxubGV0IGFsZyA9IG5ldyBGRi5Gb3JkRmFsa2Vyc29uKCk7XHJcbmFsZy5ydW5BbGcoZ3JhcGgsIHZpeik7XHJcblxyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbnZhc1wiKS5vbmNsaWNrID0gKGUpID0+IHtcclxuICAgIHZpei5nZXRTdGVwKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICh2aXouc3RlcHMubGVuZ3RoIC0gMSkpKTtcclxufVxyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vU2NyaXB0cy9tYWluLnRzIl0sInNvdXJjZVJvb3QiOiIifQ==