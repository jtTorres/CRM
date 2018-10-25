(function () {

    "use strict";
    angular.module("app")
        .factory("donationsDataService", donationsDataService);

    donationsDataService.$inject = ["$http", "$q", "utilityService"];

    function donationsDataService($http, $q, utilityService) {
        return {
            addDonation: addDonation,
            updateDonation: updateDonation,
            deleteDonation: deleteDonation,
            getActivity: getActivity,
            getDonation: getDonation,
            getDonations: getDonations
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
            return $q.reject(utilityService.httpError(reason, "Error Getting Donation"));
        }

    }

})();