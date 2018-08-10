(function () {

    "use strict";
    angular.module("app")
        .factory("transactionsDataService", transactionsDataService);

    transactionsDataService.$inject = ["$http", "$q", "utilityService"];

    function transactionsDataService($http, $q, utilityService) {
        return {
            submitTransaction: submitTransaction,
            getTransactions: getTransactions,
            getTransaction: getTransaction,
            updateTransaction: updateTransaction
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

        function getTransaction(transactionId) {
            return $http({
                method: "GET",
                url: "/Transactions/GetTransaction/",
                params: {
                    transactionId: transactionId
                }
            })
                .then(onGetTransactionSuccess)
                .catch(onGetTransactionError);
        }

        function onGetTransactionSuccess(response) {
            return response;
        }

        function onGetTransactionError(reason) {
            return $q.reject(utilityService.httpError(reason, "Error Getting Transaction"));
        }

        function updateTransaction(transaction) {
            return $http({
                method: "POST",
                url: "/Transactions/UpdateTransaction/",
                data: {
                    transaction: transaction
                }
            })
                .then(onUpdateTransactionSuccess)
                .catch(onUpdateTransactionError);
        }

        function onUpdateTransactionSuccess(response) {
            return response;
        }

        function onUpdateTransactionError(reason) {
            return $q.reject(utilityService.httpError(reason, "Error Updating Transaction"));
        }

    }

})();