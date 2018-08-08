(function () {

    "use strict";

    angular.module("app")
        .controller("transactionsGridController", transactionsGridController);

    transactionsGridController.$inject = [];

    function transactionsGridController() {
        var vm = this;

        //vm.deleteTransaction = deleteTransaction;
        vm.edit = edit;
        /////////////////////////////

        activate();

        function activate() {
            vm.getTransactions();
        }

        function edit(transaction) {
            vm.openEditModal({ transaction: transaction });
        }

    }

})();