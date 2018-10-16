(function () {

    "use strict";

    angular.module("app")
        .controller("editTransactionController", editTransactionController);

    editTransactionController.$inject = [];

    function editTransactionController() {
        var vm = this;

        vm.dismiss = dismiss;
        vm.doSave = doSave;
        //////////////////


        vm.$onInit = function () {
            vm.transaction = vm.resolve.transactionToEdit;
            vm.enums = vm.resolve.enums;
            setTransactionTypeDdl();
            setPaymentAccountsDdl();
        };

        function doSave(transaction) {
            return vm.resolve.doSave.save(transaction)
                .then(function () {
                    dismiss();
                });
        }

        function dismiss() {
            vm.close({ $value: "stuff" });
        }

        function setTransactionTypeDdl() {
            vm.transaction.SelectedTransactionType = vm.enums.TransactionTypes[vm.enums.TransactionTypes.findIndex(x => x.Id === vm.transaction.TransactionTypeId)];
        }

        function setPaymentAccountsDdl() {
            vm.transaction.SelectedPaymentAccount = vm.enums.PaymentAccounts[vm.enums.PaymentAccounts.findIndex(x => x.PaymentAccountId === vm.transaction.PaymentAccountId)];
        }

    }

})();