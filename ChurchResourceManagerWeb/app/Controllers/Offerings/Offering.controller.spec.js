describe("Offering Controller Unit Tests", function () {
    var $controller, ctrl;
    var offeringDataService, utilityService;
    var $q, $rootScope;
    var doSpy;
    var promiseResponse = {
        offeringTotal: { data: "10" }
    }
    var offeringActivityPanelSettings = {
        panelHeading: "Today's Offering Activity",
        isOpen: false
    }
    var offeringRecord = {};

    beforeEach(function () {
        offeringRecord = {
            OfferingId: undefined
        };
    });

    // initialize module
    beforeEach(module("app"));

    beforeEach(inject(function ($injector) {
        $controller = $injector.get("$controller");
        offeringDataService = $injector.get("offeringDataService");
        utilityService = $injector.get("utilityService");
        $q = $injector.get("$q");
        $rootScope = $injector.get("$rootScope");
    }));

    // setup spies
    beforeEach(function () {
        var deferred;

        doSpy = function (isSuccess, service, serviceFunction, errorMessage, responseData, spyType) {
            if (spyType === "doNothing")
                spyOn(service, serviceFunction).and.callFake(function () {
                    return;
                });
            else
                spyOn(service, serviceFunction).and.callFake(function () {
                    deferred = $q.defer();
                    if (isSuccess) {
                        deferred.resolve(responseData);
                    } else {
                        deferred.reject(utilityService.httpError(null, errorMessage));
                    }

                    return deferred.promise;
                });
        }

        // setup spy for controller initialization logic
        //doSpy(true, membershipDataService, "getAllMembership", null, promiseResponse.members);
    });

    // initialize controller
    beforeEach(function () {
        ctrl = $controller("offeringController", {});
        ctrl.Tithe = {};
        ctrl.runningTotal = {};
    });

    it("activate -should set vm.OfferingActivityPanelSetting defaults", function () {
        expect(ctrl.offeringActivityPanelSettings).toEqual(offeringActivityPanelSettings);
    });

    it("doSaveOffering - should call addOffering when there is no OfferingId", function () {
        doSpy(true, offeringDataService, "addOffering");
        doSpy(false, offeringDataService, "getRunningTotals");

        ctrl.doSaveOffering(offeringRecord);
        $rootScope.$apply();

        expect(offeringDataService.addOffering).toHaveBeenCalled();
    });

    it("doSaveOffering - should call updateOffering when there is an OfferingId", function () {
        doSpy(true, offeringDataService, "updateOffering");
        doSpy(false, offeringDataService, "getRunningTotals");

        offeringRecord.OfferingId = 1;

        ctrl.doSaveOffering(offeringRecord);
        $rootScope.$apply();

        expect(offeringDataService.updateOffering).toHaveBeenCalled();
    });

    it("doSaveOffering - should call getOfferingRunningTotal", function () {
        doSpy(true, offeringDataService, "addOffering");
        doSpy(true, offeringDataService, "getRunningTotals", null, promiseResponse.offeringTotal);

        ctrl.doSaveOffering(offeringRecord);
        $rootScope.$apply();

        expect(offeringDataService.getRunningTotals).toHaveBeenCalled();
        expect(ctrl.runningTotal.data).toBe("10");
    });
});