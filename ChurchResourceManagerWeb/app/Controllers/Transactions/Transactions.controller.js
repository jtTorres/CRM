(function () {

    "use strict";
    angular.module("app")
        .controller("transactionsController", transactionsController);

    transactionsController.$inject = ["utilityService", "transactionsDataService", "operationFlowService"];

    function transactionsController(utilityService, transactionsDataService, operationFlowService) {
        var vm = this;

        vm.doClearForm = doClearForm;
        vm.doSave = doSave;
        vm.transaction = {};
        /////////////////////////


        function onSaveSuccess(response) {
            vm.processFlow = operationFlowService.operationCompletion("Offering Saved Successfully!", true);
        }

        function onSaveError(reason) {
            vm.processFlow = operationFlowService.operationCompletion(reason.message, false);
        }

        function doSave(transaction) {
            getDropdownSelection(transaction);

            if (utilityService.isUndefinedOrNull(transaction.TransactionId)) {
                return transactionsDataService.submitTransaction(transaction)
                    .then(onSaveSuccess)
                    .catch(onSaveError);
            } else {
                return transactionsDataService.updateTransaction(transaction)
                    .then(onSaveSuccess)
                    .catch(onSaveError);
            }
        }

        function doClearForm(form) {
            vm.transaction = utilityService.clearObject(vm.transaction);
            form.$setPristine();
            form.$setUntouched();
        }

        function getDropdownSelection(transaction) {
            transaction.TransactionTypeId = transaction.SelectedTransactionType.Id;
        }

    }

})();