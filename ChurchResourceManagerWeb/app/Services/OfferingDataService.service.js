(function () {

    "use strict";
    angular.module("app")
        .factory("offeringDataService", offeringDataService);

    offeringDataService.$inject = ["$http", "$q", "utilityService", "operationFlowService"];

    function offeringDataService($http, $q, utilityService, operationFlowService) {
        return {
            addOffering: addOffering,
            updateOffering: updateOffering,
            deleteOffering: deleteOffering,
            getOfferingActivityByDateRange: getOfferingActivityByDateRange,
            getRunningTotals: getRunningTotals,
            getRunningTotalsByDateRange: getRunningTotalsByDateRange,
            getActivity: getActivity
        };

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
            operationFlowService.displayErrorBanner("Error Adding Offering");
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
            operationFlowService.displayErrorBanner("Error Updating Offering");
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
            operationFlowService.displayErrorBanner("Error Deleting Offering");
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
            operationFlowService.displayErrorBanner("Error Getting Running Totals");
            return $q.reject(utilityService.httpError(reason, "Error Getting Running Totals"));
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

        function getActivity(activity) {
            return $http({
                method: "GET",
                url: "/Shared/GetEntityActivityReport/",
                params: {
                    activity: activity

                }
            })
                .then(onGetTodaysActivityComplete)
                .catch(onGetTodaysActivityError);
        }

        function onGetTodaysActivityComplete(response) {
            return response;
        }

        function onGetTodaysActivityError(reason) {
            operationFlowService.displayErrorBanner("Error Getting Activity");
            return $q.reject(utilityService.httpError(reason, "Error Getting Activity"));
        }

        function getOfferingActivityByDateRange(startDate, endDate) {
            return $http({
                method: "GET",
                url: "/Offerings/GetOfferingActivityByDateRange/",
                params: {
                    startDate: startDate,
                    endDate: endDate

                }
            })
                .then(onGetOfferingActivityByDateRangeComplete)
                .catch(onGetOfferingActivityByDateRangeError);
        }

        function onGetOfferingActivityByDateRangeComplete(response) {
            return response;
        }

        function onGetOfferingActivityByDateRangeError(reason) {
            operationFlowService.displayErrorBanner("Error Getting Activity");
            return $q.reject(utilityService.httpError(reason, "Error Getting Activity"));
        }
    }

})();