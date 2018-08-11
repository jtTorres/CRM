(function () {

    "use strict";
    angular.module("app")
        .controller("deleteTransactionController", deleteTransactionController);

    deleteTransactionController.$inject = [];

    function deleteTransactionController() {
        var vm = this;

        vm.deleteTransaction = deleteTransaction;
        vm.dismiss = dismiss;
        /////////////////////////////////////////////

        var transactionId;
        vm.$onInit = function () {
            transactionId = vm.resolve.transactionToDelete;
        }

        function deleteTransaction() {
            vm.resolve.doDelete.delete(transactionId).then(function () {
                dismiss();
            });
        }

        function dismiss() {
            vm.close();
        }

    }

})();