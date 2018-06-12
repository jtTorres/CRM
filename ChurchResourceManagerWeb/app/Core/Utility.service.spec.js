describe("Utility Service Tests", function () {
    var utilityService;

    beforeEach(module("app"));

    beforeEach(inject(function ($injector) {
        utilityService = $injector.get("utilityService");
    }));

    it("httpError - should set error variables", function () {
        var error = {
            message: "Something went wrong",
            reason: "because"
        }

        var serviceError = utilityService.httpError("because", "Something went wrong");

        expect(error).toEqual(serviceError);

    });

    it("processCompletion - should set processVar for success", function () {
        var processVar = {
            success: true,
            successMessage: "Success"
        }

        var serviceProcessVar = utilityService.processCompletion(processVar, "Success", true);

        expect(processVar).toEqual(serviceProcessVar);

    });

    it("processCompletion - should set processVar for failure", function () {
        var processVar = {
            error: true,
            errorMessage: "Error"
        }

        var serviceProcessVar = utilityService.processCompletion(processVar, "Error", false);

        expect(processVar).toEqual(serviceProcessVar);

    });

    it("clearObject - should set object to an empty object", function () {
        var objectVar = { something: "Hello" };

        objectVar = utilityService.clearObject(objectVar);

        expect(objectVar).toEqual({});
    });

    it("isUndefinedOrNull - should return true when a null value is passed", function () {
        expect(utilityService.isUndefinedOrNull(null)).toBeTruthy();
    });

    it("isUndefinedOrNull - should return true when an undefined value is passed", function () {
        expect(utilityService.isUndefinedOrNull(undefined)).toBeTruthy();
    });
});