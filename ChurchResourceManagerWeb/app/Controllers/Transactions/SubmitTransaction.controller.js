(function () {

    "use strict";
    angular.module("app")
        .controller("submitTransactionController", submitTransactionController);

    submitTransactionController.$inject = ["operationFlowService", "enumsDataService"];

    function submitTransactionController(operationFlowService, enumsDataService) {
        var vm = this;

        vm.clearForm = clearForm;
        vm.enums = {};
        vm.submit = submit;

        /////////////////////////

        activate();

        function activate() {
            console.log("Activated Submit Transaction Controller...");
            getEnums();
        }

        function submit(transaction, form) {
            if (!operationFlowService.isFormValid(form)) return;

            vm.onSubmit({ transaction: transaction })
                .then(clearForm(vm.transactionsForm));
        }

        function clearForm(form) {
            vm.onClearForm({ form: form });
        }

        function getEnums() {
            enumsDataService.getTransactionTypes()
                .then(function (response) {
                    vm.enums.TransactionTypes = response.data;
                });
        }
    }

})();