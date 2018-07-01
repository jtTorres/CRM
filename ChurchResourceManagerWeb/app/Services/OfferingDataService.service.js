(function () {

    "use strict";
    angular.module("app")
        .factory("offeringDataService", offeringDataService);

    offeringDataService.$inject = ["$http", "$q", "utilityService"];

    function offeringDataService($http, $q, utilityService) {
        return {
            addOffering: addOffering,
            updateOffering: updateOffering,
            deleteOffering: deleteOffering,
            getRunningTotals: getRunningTotals,
            getTodaysActivity: getTodaysActivity
        }

        function addOffering(offeringRecord) {
            return $http({
                method: "POST",
                url: "/Offerings/AddOfferingRecord/",
                data: { offeringRecord: offeringRecord }
            })
                .then(onAddOfferingComplete)
                .catch(onAddTitheError);
        }

        function onAddOfferingComplete(response) {
            return response;
        }

        function onAddTitheError(reason) {
            return $q.reject(utilityService.httpError(reason, "Error Adding Offering"));
        }

        function updateOffering(offering) {
            return $http({
                method: "POST",
                url: "/Offerings/UpdateOffering/",
                data: { offering: offering }
            })
                .then(onUpdateOfferingComplete)
                .catch(onUpdateOfferingError);
        }

        function onUpdateOfferingComplete(response) {
            return response;
        }

        function onUpdateOfferingError(reason) {
            return $q.reject(utilityService.httpError(reason, "Error Updating Offering"));
        }

        function deleteOffering(offeringId) {
            return $http({
                method: "POST",
                url: "/Offerings/DeleteOffering/",
                data: { offeringId: offeringId }
            })
                .then(onDeleteOfferingComplete)
                .catch(onDeleteOfferingError);
        }

        function onDeleteOfferingComplete(response) {
            return response;
        }

        function onDeleteOfferingError(reason) {
            return $q.reject(utilityService.httpError(reason, "Error Deleting Offering"));
        }

        function getRunningTotals(date, entity) {
            date = utilityService.isUndefinedOrNull(date) ? new Date() : date;
            return $http({
                method: "GET",
                url: "/Shared/GetRunningTotals/",
                params: {
                    date: date,
                    entity: entity
                }
            })
                .then(onGetRunningTotalsComplete)
                .catch(onRunningTotalsError);
        }

        function onGetRunningTotalsComplete(response) {
            return response;
        }

        function onRunningTotalsError(reason) {
            return $q.reject(utilityService.httpError(reason, "Error Getting Running Totals"));
        }

        function getTodaysActivity() {
            return $http({
                method: "GET",
                url: "/Shared/GetTodaysActivity/"
            })
                .then(onGetTodaysActivityComplete)
                .catch(onGetTodaysActivityError);
        }

        function onGetTodaysActivityComplete(response) {
            return response;
        }

        function onGetTodaysActivityError(reason) {
            return $q.reject(utilityService.httpError(reason, "Error Getting Activity"));
        }
    }

})();