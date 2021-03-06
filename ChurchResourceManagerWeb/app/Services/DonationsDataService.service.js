﻿(function () {

    "use strict";
    angular.module("app")
        .factory("donationsDataService", donationsDataService);

    donationsDataService.$inject = ["$http", "$q", "utilityService", "operationFlowService"];

    function donationsDataService($http, $q, utilityService, operationFlowService) {
        return {
            addDonation: addDonation,
            updateDonation: updateDonation,
            deleteDonation: deleteDonation,
            getActivity: getActivity,
            getDonation: getDonation,
            getDonations: getDonations,
            getDonationsByDonationDate: getDonationsByDonationDate,
            getDonationsByMemberId: getDonationsByMemberId,
            getDonationsByMemberIdWithDateRange: getDonationsByMemberIdWithDateRange,
            getRunningTotalsByDateRange: getRunningTotalsByDateRange
        };

        function addDonation(donation) {
            return $http({
                method: "POST",
                url: "/Donations/AddDonationRecord/",
                data: { donation: donation }
            })
                .then(onAddDonationComplete)
                .catch(onAddDonationError);
        }

        function onAddDonationComplete(response) {
            return response;
        }

        function onAddDonationError(reason) {
            operationFlowService.displayErrorBanner("Error Adding Donation");
            return $q.reject(utilityService.httpError(reason, "Error Adding Donation"));
        }

        function updateDonation(donation) {
            return $http({
                method: "POST",
                url: "/Donations/UpdateDonationRecord/",
                data: { donation: donation }
            })
                .then(onUpdateDonationComplete)
                .catch(onUpdateDonationError);
        }

        function onUpdateDonationComplete(response) {
            return response;
        }

        function onUpdateDonationError(reason) {
            operationFlowService.displayErrorBanner("Error Updating Donation");
            return $q.reject(utilityService.httpError(reason, "Error Updating Donation"));
        }

        function deleteDonation(donationId) {
            return $http({
                method: "POST",
                url: "/Donations/DeleteDonationRecord/",
                data: { donationId: donationId }
            })
                .then(onDeleteDonationComplete)
                .catch(onDeleteDonationError);
        }

        function onDeleteDonationComplete(response) {
            return response;
        }

        function onDeleteDonationError(reason) {
            operationFlowService.displayErrorBanner("Error Delete Donation");
            return $q.reject(utilityService.httpError(reason, "Error Delete Donation"));
        }

        function getActivity() {
            return $http({
                method: "GET",
                url: "/Donations/GetDonationActivity/"
            })
                .then(onGetActivityComplete)
                .catch(onGetActivityError);
        }

        function onGetActivityComplete(response) {
            return response;
        }

        function onGetActivityError(reason) {
            operationFlowService.displayErrorBanner("Error Getting Activity");
            return $q.reject(utilityService.httpError(reason, "Error Getting Activity"));
        }

        function getDonation(donationId) {
            return $http({
                method: "GET",
                url: "/Donations/GetDonation/",
                params: {
                    donationId: donationId
                }
            })
                .then(onGetDonationComplete)
                .catch(onGetDonationError);
        }

        function onGetDonationComplete(response) {
            return response;
        }

        function onGetDonationError(reason) {
            operationFlowService.displayErrorBanner("Error Getting Donation");
            return $q.reject(utilityService.httpError(reason, "Error Getting Donation"));
        }

        function getDonations() {
            return $http({
                method: "GET",
                url: "/Donations/GetDonations/"
            })
                .then(onGetDonationsComplete)
                .catch(onGetDonationsError);
        }

        function onGetDonationsComplete(response) {
            return response;
        }

        function onGetDonationsError(reason) {
            operationFlowService.displayErrorBanner("Error Getting Donation");
            return $q.reject(utilityService.httpError(reason, "Error Getting Donation"));
        }

        function getDonationsByDonationDate(startDate, endDate) {
            return $http({
                method: "GET",
                url: "/Donations/GetDonationsByDonationDate/",
                params: {
                    startDate: startDate,
                    endDate: endDate
                }
            })
                .then(onGetDonationsByDonationDateComplete)
                .catch(onGetDonationsByDonationDateError);
        }

        function onGetDonationsByDonationDateComplete(response) {
            return response;
        }

        function onGetDonationsByDonationDateError(reason) {
            operationFlowService.displayErrorBanner("Error Getting Donation");
            return $q.reject(utilityService.httpError(reason, "Error Getting Donation"));
        }

        function getDonationsByMemberId(memberId) {
            return $http({
                method: "GET",
                url: "/Donations/GetDonationsByMemberId/",
                params: {
                    memberId: memberId
                }
            })
                .then(onGetDonationsByMemberIdComplete)
                .catch(onGetDonationsByMemberIdError);
        }

        function onGetDonationsByMemberIdComplete(response) {
            return response;
        }

        function onGetDonationsByMemberIdError(reason) {
            operationFlowService.displayErrorBanner("Error Getting Donation");
            return $q.reject(utilityService.httpError(reason, "Error Getting Donation"));
        }

        function getDonationsByMemberIdWithDateRange(memberId, startDate, endDate) {
            return $http({
                method: "GET",
                url: "/Donations/GetDonationsByMemberIdWithDateRange/",
                params: {
                    memberId: memberId,
                    startDate: startDate,
                    endDate: endDate
                }
            })
                .then(onGetDonationsByMemberIdComplete)
                .catch(onGetDonationsByMemberIdError);
        }

        function getRunningTotalsByDateRange(startDate, endDate, entity) {
            return $http({
                method: "GET",
                url: "/Shared/GetRunningTotalsByDateRange/",
                params: {
                    startDate: startDate,
                    endDate: endDate,
                    entity: entity
                }
            })
                .then(onGetRunningTotalsByDateRangeComplete)
                .catch(onRunningTotalsByDateRangeError);
        }

        function onGetRunningTotalsByDateRangeComplete(response) {
            return response;
        }

        function onRunningTotalsByDateRangeError(reason) {
            operationFlowService.displayErrorBanner("Error Getting Running Totals");
            return $q.reject(utilityService.httpError(reason, "Error Getting Running Totals"));
        }

    }

})();