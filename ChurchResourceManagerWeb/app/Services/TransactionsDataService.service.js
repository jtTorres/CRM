(function () {

    "use strict";
    angular.module("app")
        .factory("transactionsDataService", transactionsDataService);

    transactionsDataService.$inject = ["$http", "$q", "utilityService"];

    function transactionsDataService($http, $q, utilityService) {
        return {
            submitTransaction: submitTransaction
        }

        function submitTransaction(transaction) {
            return $http({
                method: "POST",
                url: "/Transactions/SubmitATransaction/",
                data: {
                    transaction: transaction
                }
            })
                .then(onSubmitTransactionSuccess)
                .catch(onSubmitTransactionError);
        }

        function onSubmitTransactionSuccess(response) {
            return response;
        }

        function onSubmitTransactionError(reason) {
            return $q.reject(utilityService.httpError(reason, "Error Submitting Transaction"));
        }
    }

})();