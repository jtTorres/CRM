(function () {
    "use strict";
    angular.module("app")
        .controller("homeController", homeController);

    homeController.$inject = ["operationFlowService"];

    function homeController(operationFlowService) {

        var vm = this;

        vm.addMembershipLocationCheck = addMembershipLocationCheck;
        vm.addOfferingsLocationCheck = addOfferingsLocationCheck;
        vm.addTithesLocationCheck = addTithesLocationCheck;
        vm.submitTransactionLocationCheck = submitTransactionLocationCheck;
        ///////////////////////

        activate();

        function activate() {
        }

        function addMembershipLocationCheck() {
            operationFlowService.locationCheck("/Membership/AddMembership", "reloadAddMembership");
        }

        function addTithesLocationCheck() {
            operationFlowService.locationCheck("/Tithing/AddTithes", "reloadAddTithes");
        }

        function addOfferingsLocationCheck() {
            operationFlowService.locationCheck("/Offerings/AddOfferings", "reloadAddOfferings");
        }

        function submitTransactionLocationCheck() {
            operationFlowService.locationCheck("/Transactions/SubmitTransactions", "reloadSubmitTransactions");
        }
    }

})();