describe("Add Offering Unit Tests", function () {
    var $componentController;
    var ctrl;
    var initializeComponentController, onSaveSpy;

    beforeEach(module("app"));

    beforeEach(inject(function ($injector) {
        $componentController = $injector.get("$componentController");
    }));

    beforeEach(function () {

        initializeComponentController = function (bindings) {
            ctrl = $componentController("addOffering", null, bindings);
        }
    });

    beforeEach(function () {
        onSaveSpy = jasmine.createSpy("onSave");
    });

    it("addOffering - should call vm.onSave", function () {
        var bindings = { onSave: onSaveSpy };

        initializeComponentController(bindings);

        ctrl.addOffering();

        expect(onSaveSpy).toHaveBeenCalled();
    });

});