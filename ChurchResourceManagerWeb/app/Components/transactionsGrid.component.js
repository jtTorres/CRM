(function () {

    "use strict";

    angular.module("app")
        .component("transactionsGrid",
            {
                templateUrl: "/Transactions/TransactionsGrid",
                controller: "transactionsGridController",
                controllerAs: "tgc",
                bindings: {
                    transactions: "<",
                    openEditModal: "&",
                    openDeleteModal: "&",
                    getTransactions: "&",
                    showEditDelete: "@"
                }
            });

})();