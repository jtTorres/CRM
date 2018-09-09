(function () {

    "use strict";

    angular.module("app")
        .controller("transactionsReportingController", transactionsReportingController);

    transactionsReportingController.$inject = ["transactionsDataService"];

    function transactionsReportingController(transactionsDataService) {
        var vm = this;

        vm.getTransactions = getTransactions;
        vm.runningTotal = { data: "0" };
        /////////////////////


        function getTransactions(searchType, startDate, endDate, familyId, memberId) {
            switch (searchType) {
                case "TransactionDate":
                    transactionsDataService.getTransactionsByTransactionDate(startDate, endDate)
                        .then(searchComplete);
                    break;
                case "BankPostedDate":
                    transactionsDataService.getTransactionsByBankPostedDate(startDate, endDate)
                        .then(searchComplete);
                    break;
                default:
                    break;
            }
        }

        function searchComplete(response) {
            vm.noResults = false;
            vm.transactions = response.data;
            if (response.data.length === 0) {
                vm.noResults = true;
            }
            calculateTransactionStats(vm.transactions);
        }

        function calculateTransactionStats(transactions) {
            vm.totalCount = transactions.length;
            vm.activeCount = 0;
            vm.terminatedCount = 0;
            var totals = 0;
            angular.forEach(transactions, function (record, key, obj) {
                totals = record.TransactionAmount + totals;
            });
            vm.runningTotal.data = totals;
        }

    }

})();