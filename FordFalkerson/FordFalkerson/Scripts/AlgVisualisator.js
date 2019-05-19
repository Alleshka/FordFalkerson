var Step = /** @class */ (function () {
    function Step() {
    }
    return Step;
}());
export { Step };
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
export { Vuzualizer };
//# sourceMappingURL=AlgVisualisator.js.map