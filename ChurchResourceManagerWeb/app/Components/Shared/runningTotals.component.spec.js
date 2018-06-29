describe("Running Totals Component Unit Tests", function () {
    var $componentController;
    var ctrl;
    var initializeComponentController;
    var getTithesRunningTotalSpy = jasmine.createSpy("getTithesRunningTotal");
    var bindings = { tithesRunningTotal: "0", getTithesRunningTotal: getTithesRunningTotalSpy };

    beforeEach(module("app"));

    beforeEach(inject(function ($injector) {
        $componentController = $injector.get("$componentController");
    }));

    beforeEach(function () {

        initializeComponentController = function(bindings) {
            ctrl = $componentController("runningTotals", null, bindings);
        }
    });

    it("refreshTotals - should call getTithesRunningTotal binding", function () {
        initializeComponentController(bindings);

        ctrl.refreshTotals();
        expect(getTithesRunningTotalSpy).toHaveBeenCalled();
    });

    it("refreshTotals - tithesRunningTotal should have a value of 0", function () {
        initializeComponentController(bindings);
        expect(ctrl.tithesRunningTotal).toBe("0");
    });


});