(function () {

    "use strict";
    angular.module("app")
        .factory("transactionsDataService", transactionsDataService);

    transactionsDataService.$inject = ["$http", "$q", "utilityService"];

    function transactionsDataService($http, $q, utilityService) {
        return {
            submitTransaction: submitTransaction,
            getTransactions: getTransactions
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

        function getTransactions() {
            return $http({
                method: "GET",
                url: "/Transactions/GetTransactions/"
            })
                .then(onGetTransactionsSuccess)
                .catch(onGetTransactionsError);
        }

        function onGetTransactionsSuccess(response) {
            return response;
        }

        function onGetTransactionsError(reason) {
            return $q.reject(utilityService.httpError(reason, "Error Getting Transactions"));
        }

    }

})();