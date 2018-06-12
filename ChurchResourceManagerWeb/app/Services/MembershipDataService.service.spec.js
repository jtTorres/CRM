describe("Membership Data Service Unit Tests", function () {
    var membershipDataService, $q, $httpBackend;
    var httpResponses = {};
    var urls = {
        getMembers: "/Home/GetAllMembership/"
    };
    var responseData = {
        members: {
            MemberId: 9,
            FirstName: "Jose",
            LastName: "Torres"
        }
    };

    // function vars
    var getMembers, doWhen, httpFlush, expectHttpOk, expectHttpError, setResponseStatus;

    beforeEach(module("app"));

    beforeEach(inject(function ($injector) {
        membershipDataService = $injector.get("membershipDataService");
        $q = $injector.get("$q");
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

        getMembers = function (httpStatus, httpData) {
            doWhen("GET", urls.getMembers, httpStatus, httpData);

            membershipDataService.getAllMembership()
                .then(setResponseStatus)
                .catch(setResponseStatus);

            httpFlush();
        }
    });

    afterEach(function () {
        expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
    });

    it("getMembers - should return http success", function () {
        getMembers(200);
        expectHttpOk();
    });

    it("getMembers - should return Server Error", function () {
        getMembers(500);
        expectHttpError("Error Getting Membership");

    });

    it("getMembers - should return memberData", function () {
        getMembers(200, responseData.members);
        expectHttpOk();
        expect(responseData.members).toEqual(httpResponses.data);
    });
});