describe("Tithing Data Service", function () {

    var tithingDataService = {};
    var $httpBackend;
    var httpResponses = {};
    var titheRecord = {};
    var urls = {
        addTithe: "/Tithing/AddTitheRecord/",
        getMemberTithes: "/Tithing/GetMemberTithes/",
        updateTithe: "/Tithing/UpdateTithe/",
        deleteTithe: "/Tithing/DeleteTithe/",
        getTithesRunningTotal: "/Tithing/GetTithesRunningTotal/",
        getTodaysTithingActivity: "/Tithing/GetTodaysTithingActivity/",
        getTithingActivity: "/Tithing/GetTithingActivity/"
    };
    var responseData = {
        memberTithes: { memberId: 1 },
        runningTotal: { Total: "10" },
        todaysTithingActivity: { MemberName: "Jose Torres" },
        tithingActivity: { MemberName: "Jose Torres" }
    };

    var today = new Date();
    //function vars
    var addTithe, getMemberTithes, updateTithe, deleteTithe, getTithesRunningTotal, getTodaysTithingActivity, getTithingActivity, setResponseStatus, doWhen, httpFlush, expectHttpOk, expectHttpError;

    //get an instance of the module
    beforeEach(module("app"));

    //inject necessary services

    beforeEach(inject(function ($injector) {
        tithingDataService = $injector.get("tithingDataService");
        $httpBackend = $injector.get("$httpBackend");
    }));

    //fake http requests
    beforeEach(function () {
        doWhen = function (verb, url, httpStatus, httpResponseData) {
            url = RegExp(url);
            $httpBackend.when(verb, url)
                .respond(httpStatus, httpResponseData);
        }

        httpFlush = function () {
            $httpBackend.flush();
        }

        expectHttpOk = function () {
            expect(httpResponses.status).toBe(200);
        }

        expectHttpError = function (errorMessage) {
            expect(httpResponses.reason.status).toBe(500);
            expect(httpResponses.message).toBe(errorMessage);
        }

    });

    //mock service functions
    beforeEach(function () {
        setResponseStatus = function (response) {
            httpResponses = response;
        }

        addTithe = function (titheRecord, httpStatus) {
            doWhen("POST", urls.addTithe, httpStatus);

            tithingDataService.addTithe(titheRecord)
                .then(setResponseStatus)
                .catch(setResponseStatus);

            httpFlush();
        }

        getMemberTithes = function (memberId, httpStatus, httpData) {
            doWhen("GET", urls.getMemberTithes, httpStatus, httpData);

            tithingDataService.getMemberTithes(memberId, today)
                .then(setResponseStatus)
                .catch(setResponseStatus);

            httpFlush();
        }

        updateTithe = function (tithe, httpStatus) {
            doWhen("POST", urls.updateTithe, httpStatus);

            tithingDataService.updateTithe(tithe)
                .then(setResponseStatus)
                .catch(setResponseStatus);

            httpFlush();
        }

        deleteTithe = function (titheId, httpStatus) {
            doWhen("POST", urls.deleteTithe, httpStatus);

            tithingDataService.deleteTithe(titheId)
                .then(setResponseStatus)
                .catch(setResponseStatus);

            httpFlush();
        }

        getTithesRunningTotal = function (date, httpStatus, httpData) {
            doWhen("GET", urls.getTithesRunningTotal, httpStatus, httpData);

            tithingDataService.getTithesRunningTotal(date)
                .then(setResponseStatus)
                .catch(setResponseStatus);

            httpFlush();
        }

        getTodaysTithingActivity = function (httpStatus, httpData) {
            doWhen("GET", urls.getTodaysTithingActivity, httpStatus, httpData);

            tithingDataService.getTodaysTithingActivity()
                .then(setResponseStatus)
                .catch(setResponseStatus);

            httpFlush();
        }

        getTithingActivity = function (httpStatus, httpData) {
            doWhen("GET", urls.getTithingActivity, httpStatus, httpData);

            tithingDataService.getTithingActivity()
                .then(setResponseStatus)
                .catch(setResponseStatus);

            httpFlush();
        }
    });

    afterEach(function () {
        expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
    });

    it("addTithe - should return http succes", function () {
        addTithe(titheRecord, 200);
        expectHttpOk();
    });

    it("addTithe - should return http Server Error", function () {
        addTithe(titheRecord, 500);

        expectHttpError("Error Adding Tithe Record");
    });

    it("getMemberTithes - should return http success", function () {
        getMemberTithes(1, 200);
        expectHttpOk();
    });

    it("getMemberTithes - should return http Server Error", function () {
        getMemberTithes(1, 500);

        expectHttpError("Error Getting Member Tithes");
    });

    it("getMemberTithes - should return data", function () {
        getMemberTithes(1, 200, responseData.memberTithes);

        expect(httpResponses.data.memberId).toBe(1);
    });

    it("updateTithe - should return http success", function () {
        updateTithe(1, 200);
        expectHttpOk();
    });

    it("updateTithe - should return Server Error", function () {
        updateTithe(1, 500);
        expectHttpError("Error Updating Tithes");
    });

    it("deleteTithe - should return http success", function () {
        deleteTithe(1, 200);
        expectHttpOk();
    });

    it("deleteTithe - should return http Server Error", function () {
        deleteTithe(1, 500);
        expectHttpError("Error Deleting Tithes");

    });

    it("memberTithe - should return value assigned to memberTithe service variable", function () {
        tithingDataService.memberTithe = "stuff";

        expect(tithingDataService.memberTithe).toBe("stuff");
    });

    it("getTithesRunningTotal - should return http success", function () {
        getTithesRunningTotal(today, 200);
        expectHttpOk();
    });

    it("getTithesRunningTotal - should return http Server Error", function () {
        getTithesRunningTotal(today, 500);

        expectHttpError("Error Getting Tithes Running Total");
    });

    it("getTithesRunningTotal - should return data", function () {
        getTithesRunningTotal(today, 200, responseData.runningTotal);

        expect(httpResponses.data.Total).toBe("10");
    });

    it("getTithesRunningTotal - should return still return data even if date is null", function () {
        getTithesRunningTotal(null, 200, responseData.runningTotal);

        expect(httpResponses.data.Total).toBe("10");
    });

    it("getTodaysTithingActivity - should return http success", function () {
        getTodaysTithingActivity(200, responseData.todaysTithingActivity);

        expectHttpOk();
    });

    it("getTodaysTithingActivity - should return http Server Error", function () {
        getTodaysTithingActivity(500);

        expectHttpError("Error Getting Today's Tithing Activity");
    });

    it("getTodaysTithingActivity - should return data", function () {
        getTodaysTithingActivity(200, responseData.todaysTithingActivity);

        expect(httpResponses.data.MemberName).toBe("Jose Torres");
    });

    it("getTithingActivity - should return http success", function () {
        getTithingActivity(200);

        expectHttpOk();
    });

    it("getTithingActivity - should return http Server Error", function () {
        getTithingActivity(500);

        expectHttpError("Error Getting Tithing Activity");
    });

    it("getTithingActivity - should return data", function () {
        getTithingActivity(200, responseData.tithingActivity);

        expect(httpResponses.data.MemberName).toBe("Jose Torres");
    });

});