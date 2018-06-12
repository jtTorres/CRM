describe("addTithesController Unit Testing", function () {
    var $controller, ctrl;
    var tithingDataService, utilityService, membershipDataService;
    var $q;
    var $rootScope;
    var doSpy;

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
        doSpy(true, tithingDataService, "getTodaysTithingActivity", null, titheRecord);
    });



    // initialize controller
    beforeEach(function () {
        ctrl = $controller("addTithesController", {});
        ctrl.Tithe = {};
    });


});