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
        MEMBER_ID: 9
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
        ctrl = $controller("tithingController", {});
        ctrl.Tithe = {};
    });



    it("initialization - vm.allMembership should be set", function () {
        expect(ctrl.allMembership).toEqual(jasmine.any(Object));
    });

    it("initialization - getAllMembership should be called", function () {
        expect(membershipDataService.getAllMembership).toHaveBeenCalled();
    });

    it("initialization - getTodaysTithingActivity should be called", function () {
        $rootScope.$apply();
        expect(tithingDataService.getTodaysTithingActivity).toHaveBeenCalled();
    });

    it("addTithe function should be defined", function () {
        expect(ctrl.addTithe).toBeDefined();
    });

    it("addTithe service should be called successfully", function () {
        doSpy(true, tithingDataService, "addTithe");
        doSpy(true, tithingDataService, "getTithesRunningTotal", null, { data: "10" });
        doSpy(true, ctrl, "onMemberSelected", null, {});

        ctrl.addTithe(titheRecord);
        $rootScope.$apply();

        expect(tithingDataService.addTithe).toHaveBeenCalled();
    });

    it("addTithe service should be called successfully and processSuccess should be true", function () {
        doSpy(true, tithingDataService, "addTithe");
        doSpy(true, tithingDataService, "getTithesRunningTotal", null, { data: "10" });
        doSpy(true, ctrl, "onMemberSelected", null, {});

        ctrl.addTithe(titheRecord);
        $rootScope.$apply();

        expect(tithingDataService.addTithe).toHaveBeenCalled();
        expect(ctrl.processFlow.success).toBe(true);

    });

    it("addTithe service should be called successfully and processError should be true", function () {
        doSpy(false, tithingDataService, "addTithe", "Error Adding Tithe Record");
        doSpy(true, tithingDataService, "getTithesRunningTotal", null, { data: "10" });

        ctrl.addTithe(titheRecord);
        $rootScope.$apply();

        expect(tithingDataService.addTithe).toHaveBeenCalled();
        expect(ctrl.processFlow.error).toBe(true);
        expect(ctrl.processFlow.errorMessage).toBe("Error Adding Tithe Record");
    });

    it("addTithe - should be called successfully and getTithesRunningTotal should be called", function () {
        doSpy(true, tithingDataService, "addTithe");
        doSpy(true, tithingDataService, "getTithesRunningTotal", null, { data: "10" });
        doSpy(true, ctrl, "onMemberSelected", null, {});

        ctrl.addTithe(titheRecord);
        $rootScope.$apply();

        expect(tithingDataService.getTithesRunningTotal).toHaveBeenCalled();
    });

    it("addTithe - should be called successfully and getTodaysTithingActivity should be called twice", function () {
        doSpy(true, tithingDataService, "addTithe");
        doSpy(true, tithingDataService, "getTithesRunningTotal", null, { data: "10" });
        doSpy(true, ctrl, "onMemberSelected", null, {});

        ctrl.addTithe(titheRecord);
        $rootScope.$apply();

        expect(tithingDataService.getTodaysTithingActivity).toHaveBeenCalled();
        expect(tithingDataService.getTodaysTithingActivity.calls.count()).toEqual(2);
    });

    it("onMemberSelected - should call getMemberTithes", function () {
        doSpy(true, tithingDataService, "getMemberTithes", null, { data: "stuff" });

        ctrl.onMemberSelected(typeAheadSelection);
        $rootScope.$apply();

        expect(tithingDataService.getMemberTithes).toHaveBeenCalled();
    });

    it("getTithesRunningTotal - should set tithesRunningTotal", function () {
        doSpy(true, tithingDataService, "getTithesRunningTotal", null, { data: "10" });

        ctrl.getTithesRunningTotal(today);
        $rootScope.$apply();

        expect(ctrl.tithesRunningTotal).toBe("10");
    });

    it("clearForm - should set vm.Tithe to a blank object", function () {
        ctrl.clearForm();

        expect(ctrl.Tithe).toEqual(jasmine.any(Object));
    });

    it("clearForm - should set vm.selectedMember to blank", function () {
        ctrl.clearForm();

        expect(ctrl.selectedMember).toBe("");
    });

    it("deleteTithe - should call deleteTithe", function () {
        doSpy(true, tithingDataService, "deleteTithe");

        ctrl.deleteTithe();

        expect(tithingDataService.deleteTithe).toHaveBeenCalled();
    });

    it("deleteTithe - should call closeDeleteTitheModal", function () {
        doSpy(true, tithingDataService, "deleteTithe");
        doSpy(true, ctrl, "closeDeleteTitheModal");
        ctrl.MemberTithes = memberTithes;

        ctrl.deleteTithe();
        $rootScope.$apply();

        expect(ctrl.closeDeleteTitheModal).toHaveBeenCalled();
    });

});