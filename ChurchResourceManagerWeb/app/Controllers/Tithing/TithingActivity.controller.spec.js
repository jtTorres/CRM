describe("tithingActivityController Testing", function () {
    var $controller, ctrl;
    var tithingDataService, utilityService;
    var $q, $rootScope;
    var doSpy;
    var promiseResponse = {
        tithingActivity: {
            MemberId: 9,
            FirstName: "Jose",
            LastName: "Torres"
        }
    };
    var titheRecord = {
        MemberId: 9,
        FirstName: "Jose",
        LastName: "Torres"
    };

    beforeEach(module("app"));

    beforeEach(inject(function ($injector) {
        $controller = $injector.get("$controller");
        tithingDataService = $injector.get("tithingDataService");
        utilityService = $injector.get("utilityService");
        $q = $injector.get("$q");
        $rootScope = $injector.get("$rootScope");
    }));

    beforeEach(function () {
        var deferred;

        doSpy = function(isSuccess, service, serviceFunction, errorMessage, responseData, spyType) {
            spyOn(service, serviceFunction).and.callFake(function() {
                deferred = $q.defer();
                if (isSuccess) {
                    deferred.resolve(responseData);
                } else {
                    deferred.reject(utilityService.httpError(null, errorMessage));
                }

                return deferred.promise;
            });
        };

        // setup spy for controller initialization logic***this has to be run before controller initialization for it to work****
        doSpy(true, tithingDataService, "getTithingActivity", null, promiseResponse.tithingActivity);
    });

    beforeEach(function () {
        ctrl = $controller("tithingActivityController", {});
        ctrl.tithingActivity = {};
    });


    it("init - vm.tithingActivity should be set", function () {
        expect(ctrl.tithingActivity).toEqual(jasmine.any(Object));
    });
});