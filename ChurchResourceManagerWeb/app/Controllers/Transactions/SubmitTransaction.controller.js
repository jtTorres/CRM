(function () {

    "use strict";
    angular.module("app")
        .controller("submitTransactionController", submitTransactionController);

    submitTransactionController.$inject = ["operationFlowService", "$scope"];

    function submitTransactionController(operationFlowService, $scope) {
        var vm = this;

        vm.clearForm = clearForm;
        vm.dateFormat = "MM/dd/yyyy";
        vm.openCalendar = openCalendar;
        vm.submit = submit;

        /////////////////////////

        activate();

        function activate() {
            console.log("Activated Submit Transaction Controller...");
        }

        function submit(transaction, form) {
            if (!operationFlowService.isFormValid(form)) return;

            vm.onSubmit({ transaction: transaction })
                .then(clearForm);
        }

        function clearForm() {
            vm.onClearForm({ form: vm.transactionsForm });
            operationFlowService.resetForm(vm.transactionsForm);
        }

        function openCalendar(type) {
            switch (type) {
                case "TransactionDate":
                    vm.isOpenTransactionDate = true;
                    break;
                case "BankPostedDate":
                    vm.isOpenBankPostedDate = true;
                    break;
            }

        }

        $scope.$on("reloadSubmitTransactions", clearForm);
    }

})();