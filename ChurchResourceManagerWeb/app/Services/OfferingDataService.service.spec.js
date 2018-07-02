describe("Offering Data Service Testing", function () {

    var offeringDataService = {};
    var $httpBackend;
    var httpResponses = {};
    var offeringRecord = {};
    var urls = {
        addOffering: "/Offerings/AddOfferingRecord/",
        updateOffering: "/Offerings/UpdateOffering/",
        deleteOffering: "/Offerings/DeleteOffering/",
        getRunningTotals: "/Shared/GetRunningTotals/",
        getActivity: "/Shared/GetEntityActivityReport/"
    };

    var responseData = {
        runningTotal: { Total: "10" },
        todaysActivity: { Amount: "10.00" }
    }

    var today = new Date();

    // function vars
    var addOffering, updateOffering, deleteOffering, getRunningTotals, getActivity, setResponseStatus, doWhen, httpFlush, expectHttpOk, expectHttpError;

    beforeEach(module("app"));

    beforeEach(inject(function ($injector) {
        offeringDataService = $injector.get("offeringDataService");
        $httpBackend = $injector.get("$httpBackend");
    }));

    // fake http requests
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

    // mock service functions
    beforeEach(function () {
        setResponseStatus = function (response) {
            httpResponses = response;
        }

        addOffering = function (offeringRecord, httpStatus) {
            doWhen("POST", urls.addOffering, httpStatus);

            offeringDataService.addOffering(offeringRecord)
                .then(setResponseStatus)
                .catch(setResponseStatus);

            httpFlush();
        }

        updateOffering = function (offering, httpStatus) {
            doWhen("POST", urls.updateOffering, httpStatus);

            offeringDataService.updateOffering(offering)
                .then(setResponseStatus)
                .catch(setResponseStatus);

            httpFlush();
        }

        deleteOffering = function (offeringId, httpStatus) {
            doWhen("POST", urls.deleteOffering, httpStatus);

            offeringDataService.deleteOffering(offeringId)
                .then(setResponseStatus)
                .catch(setResponseStatus);

            httpFlush();
        }

        getRunningTotals = function (date, httpStatus, httpData) {
            doWhen("GET", urls.getRunningTotals, httpStatus, httpData);

            offeringDataService.getRunningTotals(date)
                .then(setResponseStatus)
                .catch(setResponseStatus);

            httpFlush();
        }

        getActivity = function (httpStatus, httpData) {
            doWhen("GET", urls.getActivity, httpStatus, httpData);

            offeringDataService.getActivity()
                .then(setResponseStatus)
                .catch(setResponseStatus);

            httpFlush();
        }
    });

    afterEach(function () {
        expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
    });

    it("addOffering - should return http success", function () {
        addOffering(offeringRecord, 200);
        expectHttpOk();
    });

    it("addOffering - should return http error", function () {
        addOffering(offeringRecord, 500);
        expectHttpError("Error Adding Offering");
    });

    it("updateOffering - should return http success", function () {
        updateOffering(offeringRecord, 200);
        expectHttpOk();
    });

    it("updateOffering - should return http error", function () {
        updateOffering(offeringRecord, 500);
        expectHttpError("Error Updating Offering");
    });

    it("deleteOffering - should return http success", function () {
        deleteOffering(1, 200);
        expectHttpOk();
    });

    it("deleteOffering - should return http error", function () {
        deleteOffering(1, 500);
        expectHttpError("Error Deleting Offering");
    });

    it("getRunningTotals - should return http success", function () {
        getRunningTotals(today, 200);
        expectHttpOk();
    });

    it("getRunningTotals - should return http error", function () {
        getRunningTotals(today, 500);
        expectHttpError("Error Getting Running Totals");
    });

    it("getRunningTotals - should return data", function () {
        getRunningTotals(today, 200, responseData.runningTotal);
        expect(httpResponses.data.Total).toBe("10");
    });

    it("getRunningTotals - should still return data even if date is null", function () {
        getRunningTotals(null, 200, responseData.runningTotal);
        expect(httpResponses.data.Total).toBe("10");
    });

    it("getActivity - should return http success", function () {
        getActivity(200, responseData.todaysActivity);

        expectHttpOk();
    });

    it("getActivity - should return http Server Error", function () {
        getActivity(500);

        expectHttpError("Error Getting Activity");
    });

    it("getActivity - should return data", function () {
        getActivity(200, responseData.todaysActivity);

        expect(httpResponses.data.Amount).toBe("10.00");
    });


});