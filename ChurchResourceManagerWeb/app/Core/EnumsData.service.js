(function () {

    "use strict";
    angular.module("app")
        .factory("enumsDataService", enumsDataService);

    enumsDataService.$inject = ["$http", "$q", "utilityService"];

    function enumsDataService($http, $q, utilityService) {

        var enums = {
            contactMethods: {},
            membershipStatuses: {},
            relationshipTypes: {},
            maritalStatuses: {},
            memberGroups: {},
            transactionTypes: {},
            genders: [
                { Description: "Male", Id: "M" },
                { Description: "Female", Id: "F" }
            ]
        };
        var transactionInquiryTypes = {
            Expenses: 1,
            Income: 2
        };


        return {
            getContactMethods: getContactMethods,
            getMembershipStatuses: getMembershipStatuses,
            getRelationshipTypes: getRelationshipTypes,
            getMaritalStatuses: getMaritalStatuses,
            getMemberGroups: getMemberGroups,
            getTransactionTypes: getTransactionTypes,

            enums: enums,
            transactionInquiryTypes: transactionInquiryTypes
        };

        function onSuccess(response) {
            return response;
        }

        function onFailure(reason) {
            return $q.reject(utilityService.httpError(reason, "Error Getting Enum"));
        }

        function getContactMethods() {
            return $http({
                method: "GET",
                url: "/Enums/GetContactMethods/"
            })
                .then(onSuccess)
                .catch(onFailure);
        }

        function getMembershipStatuses() {
            return $http({
                method: "GET",
                url: "/Enums/GetMembershipStatuses/"
            })
                .then(onSuccess)
                .catch(onFailure);
        }

        function getRelationshipTypes() {
            return $http({
                method: "GET",
                url: "/Enums/GetRelationshipTypes/"
            })
                .then(onSuccess)
                .catch(onFailure);
        }

        function getMaritalStatuses() {
            return $http({
                method: "GET",
                url: "/Enums/GetMaritalStatuses/"
            })
                .then(onSuccess)
                .catch(onFailure);
        }

        function getMemberGroups() {
            return $http({
                method: "GET",
                url: "/Enums/GetMemberGroups/"
            })
                .then(onSuccess)
                .catch(onFailure);
        }

        function getTransactionTypes() {
            return $http({
                method: "GET",
                url: "/Enums/GetTransactionTypes/"
            })
                .then(onSuccess)
                .catch(onFailure);
        }
    }

})();