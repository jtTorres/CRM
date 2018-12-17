(function () {

    "use strict";
    angular.module("app")
        .factory("enumsDataService", enumsDataService);

    enumsDataService.$inject = ["$http", "$q", "utilityService", "operationFlowService"];

    function enumsDataService($http, $q, utilityService, operationFlowService) {

        var enums = {
            contactMethods: {},
            membershipStatuses: {},
            relationshipTypes: {},
            maritalStatuses: {},
            memberGroups: {},
            transactionTypes: {},
            paymentAccounts: {},
            donationTypes: {},
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
            getPaymentAccounts: getPaymentAccounts,
            getDonationTypes: getDonationTypes,

            enums: enums,
            transactionInquiryTypes: transactionInquiryTypes
        };

        function onSuccess(response) {
            return response;
        }

        function onFailure(reason) {
            operationFlowService.displayErrorBanner("Error Getting Enum");
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

        function getPaymentAccounts() {
            return $http({
                method: "GET",
                url: "/Enums/GetPaymentAccounts/"
            })
                .then(onSuccess)
                .catch(onFailure);
        }

        function getDonationTypes() {
            return $http({
                method: "GET",
                url: "/Enums/GetDonationTypes/"
            })
                .then(onSuccess)
                .catch(onFailure);
        }
    }

})();