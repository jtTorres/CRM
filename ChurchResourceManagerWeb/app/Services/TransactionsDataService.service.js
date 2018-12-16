(function () {

    "use strict";
    angular.module("app")
        .factory("transactionsDataService", transactionsDataService);

    transactionsDataService.$inject = ["$http", "$q", "utilityService", "operationFlowService"];

    function transactionsDataService($http, $q, utilityService, operationFlowService) {
        return {
            submitTransaction: submitTransaction,
            getTransactions: getTransactions,
            getTransaction: getTransaction,
            updateTransaction: updateTransaction,
            deleteTransaction: deleteTransaction,
            getExpensesRunningTotal: getExpensesRunningTotal,
            getTransactionsByBankPostedDate: getTransactionsByBankPostedDate,
            getTransactionsByTransactionDate: getTransactionsByTransactionDate
        };

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

        function deleteTransaction(transactionId) {
            return $http({
                method: "POST",
                url: "/Transactions/DeleteTransaction/",
                data: {
                    transactionId: transactionId
                }
            })
                .then(onDeleteTransactionSuccess)
                .catch(onDeleteTransactionError);
        }

        function onDeleteTransactionSuccess(response) {
            return response;
        }

        function onDeleteTransactionError(reason) {
            return $q.reject(utilityService.httpError(reason, "Error Deleting Transaction"));
        }

        function getExpensesRunningTotal(date, inquiryType) {
            date = utilityService.isUndefinedOrNull(date) ? new Date() : date;
            return $http({
                method: "GET",
                url: "/Transactions/GetRunningTotals/",
                params: {
                    date: date,
                    inquiryType: inquiryType
                }
            })
                .then(onGetExpensesRunningTotalSuccess)
                .catch(onGetExpensesRunningTotalError);
        }

        function onGetExpensesRunningTotalSuccess(response) {
            return response;
        }

        function onGetExpensesRunningTotalError(reason) {
            operationFlowService.operationCompletion("Error Getting Expenses", false);
            return $q.reject(utilityService.httpError(reason, "Error Getting Expenses"));
        }

        function getTransactionsByTransactionDate(startDate, endDate) {
            return $http({
                method: "GET",
                url: "/Transactions/GetTransactionsByTransactionDate/",
                params: {
                    startDate: startDate,
                    endDate: endDate
                }
            })
                .then(onGetTransactionsByTransactionDateSuccess)
                .catch(onGetTransactionsByTransactionDateError);
        }

        function onGetTransactionsByTransactionDateSuccess(response) {
            return response;
        }

        function onGetTransactionsByTransactionDateError(reason) {
            return $q.reject(utilityService.httpError(reason, "Error Getting Transactions"));
        }

        function getTransactionsByBankPostedDate(startDate, endDate) {
            return $http({
                method: "GET",
                url: "/Transactions/GetTransactionsByBankPostedDate/",
                params: {
                    startDate: startDate,
                    endDate: endDate
                }
            })
                .then(onGetTransactionsByBankPostedDateSuccess)
                .catch(onGetTransactionsByBankPostedDateError);
        }

        function onGetTransactionsByBankPostedDateSuccess(response) {
            return response;
        }

        function onGetTransactionsByBankPostedDateError(reason) {
            return $q.reject(utilityService.httpError(reason, "Error Getting Transactions"));
        }

    }

})();