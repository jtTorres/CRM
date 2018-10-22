(function () {

    "use strict";
    angular.module("app")
        .controller("submitTransactionController", submitTransactionController);

    submitTransactionController.$inject = ["operationFlowService", "$scope"];

    function submitTransactionController(operationFlowService, $scope) {
        var vm = this;

        vm.clearForm = clearForm;
        vm.dateFormat = "MM/dd/yyyy";
        vm.openTransactionDate = openTransactionDate;
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

        function clearForm() {
            vm.onClearForm({ form: vm.transactionsForm });
        }

        function openTransactionDate() {
            vm.isOpenTransactionDate = true;
        }

        $scope.$on("reloadSubmitTransactions", clearForm);
    }

})();