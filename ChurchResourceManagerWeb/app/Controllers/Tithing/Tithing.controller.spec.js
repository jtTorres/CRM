describe("Tithing Controller Testing", function () {
    var $controller, ctrl;
    var tithingDataService, utilityService, membershipDataService;
    var $q;
    var $scope; //probably won't need since i'm doing controller as syntax
    var $rootScope;
    var doSpy;
    var promiseResponse = {
        members: {
            MemberId: 9,
            FirstName: "Jose",
            LastName: "Torres"
        }
    }
    var titheRecord = {
        MemberId: 9
    }
    var typeAheadSelection = {
        MemberId: 9
    }
    var today = new Date();
    const memberTithes = [{ titheId: 1, titheAmount: 10 }, { titheId: 2, titheAmount: 20 }];

    // initialize module
    beforeEach(module("app"));

    // inject stuff
    beforeEach(inject(function ($injector) {
        $controller = $injector.get("$controller");
        tithingDataService = $injector.get("tithingDataService");
        $q = $injector.get("$q");
        $rootScope = $injector.get("$rootScope");
        utilityService = $injector.get("utilityService");
        membershipDataService = $injector.get("membershipDataService");
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
        doSpy(true, membershipDataService, "getAllMembership", null, promiseResponse.members);
        doSpy(true, tithingDataService, "getTithingActivity", null, titheRecord);
        doSpy(true, tithingDataService, "getTithesRunningTotal", null, { data: "10" });
    });



    // initialize controller
    beforeEach(function () {
        ctrl = $controller("tithingController", {});
        ctrl.Tithe = {};
    });



    it("initialization - vm.allMembership should be set", function () {
        $rootScope.$apply();
        expect(ctrl.allMembership).toEqual(jasmine.any(Object));
    });

    it("initialization - getAllMembership should be called", function () {
        expect(membershipDataService.getAllMembership).toHaveBeenCalled();
    });

    it("doSaveTithe function should be defined", function () {
        expect(ctrl.doSaveTithe).toBeDefined();
    });

    it("doSaveTithe service should be called successfully", function () {
        doSpy(true, tithingDataService, "addTithe");
        doSpy(true, tithingDataService, "getTodaysTithingActivity", null, { data: "10" });

        ctrl.tithingActivityType = "today";
        ctrl.doSaveTithe(titheRecord);
        $rootScope.$apply();

        expect(tithingDataService.addTithe).toHaveBeenCalled();
    });

    it("doSaveTithe - should be called successfully and getTithesRunningTotal should be called", function () {
        doSpy(true, tithingDataService, "addTithe");
        doSpy(true, tithingDataService, "getTodaysTithingActivity", null, { data: "10" });

        ctrl.tithingActivityType = "today";
        ctrl.doSaveTithe(titheRecord);
        $rootScope.$apply();

        expect(tithingDataService.getTithesRunningTotal).toHaveBeenCalled();
    });

    it("getTithesRunningTotal - should set tithesRunningTotal", function () {
        ctrl.getTithesRunningTotal(today);
        $rootScope.$apply();

        expect(ctrl.tithesRunningTotal.data).toBe("10");
    });

    it("deleteTithe - should call deleteTithe", function () {
        doSpy(true, tithingDataService, "deleteTithe");

        ctrl.deleteTithe();

        expect(tithingDataService.deleteTithe).toHaveBeenCalled();
    });
});