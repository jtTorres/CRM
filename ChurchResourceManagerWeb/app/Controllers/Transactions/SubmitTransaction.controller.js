(function () {

    "use strict";
    angular.module("app")
        .controller("submitTransactionController", submitTransactionController);

    submitTransactionController.$inject = ["operationFlowService"];

    function submitTransactionController(operationFlowService) {
        var vm = this;

        vm.clearForm = clearForm;
        vm.submit = submit;

        /////////////////////////

        activate();

        function activate() {
            console.log("Activated Submit Transaction Controller...");
        }

        function submit(transaction, form) {
            if (!operationFlowService.isFormValid(form)) return;

            vm.onSubmit({ transaction: transaction })
                .then(clearForm(vm.transactionsForm));
        }

        function clearForm(form) {
            vm.onClearForm({ form: form });
        }
    }

})();