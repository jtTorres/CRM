describe("editTitheController Unit Tests", function () {
    var $controller, ctrl, $q, $rootScope;
    var tithingDataService, utilityService;
    var doSpy;

    var titheRecord = {
        MemberId: 9,
        FirstName: "Jose",
        LastName: "Torres"
    }

    beforeEach(module("app"));

    beforeEach(inject(function ($injector) {
        $controller = $injector.get("$controller");
        tithingDataService = $injector.get("tithingDataService");
        $q = $injector.get("$q");
        $rootScope = $injector.get("$rootScope");
        utilityService = $injector.get("utilityService");
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

    });



    beforeEach(function () {
        // mock out the editTithe from editTitheController. This is what's going to be kicking off this controller
        tithingDataService.titheToEdit = angular.copy(titheRecord);
    });

    // initialize controller
    beforeEach(function () {
        ctrl = $controller("editTitheController", {});
        ctrl.edit = {};
    });

    //it("initialization - vm.edit.Tithe should be populated", function () {
    //    expect(ctrl.edit.Tithe).toEqual(titheRecord);
    //});

});