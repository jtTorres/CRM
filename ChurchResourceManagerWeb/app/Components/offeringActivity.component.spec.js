describe("Offering Activity Component Unit Tests", function () {
    var $componentController;
    var ctrl;
    var initializeComponentController, getOfferingActivitySpy;
    var bindings = {};

    beforeEach(module("app"));

    beforeEach(inject(function ($injector) {
        $componentController = $injector.get("$componentController");
    }));

    beforeEach(function () {
        getOfferingActivitySpy = jasmine.createSpy("getOfferingActivity");
    });

    beforeEach(function () {
        bindings = { getOfferingActivity: getOfferingActivitySpy };
        initializeComponentController = function (bindings) {
            ctrl = {};
            ctrl = $componentController("offeringActivity", null, bindings);
            ctrl.$onInit();
        }
        initializeComponentController(bindings);

    });

    it("$onInit - should call getOfferingActivity", function () {
        expect(getOfferingActivitySpy).toHaveBeenCalled();
    });


});