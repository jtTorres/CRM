(function () {
    "use strict";
    angular.module("app")
        .controller("homeController", homeController);

    homeController.$inject = ["operationFlowService", "enumsDataService"];

    function homeController(operationFlowService, enumsDataService) {

        var vm = this;

        vm.activateDeactivateParent = activateDeactivateParent;
        vm.addMembershipLocationCheck = addMembershipLocationCheck;
        vm.addOfferingsLocationCheck = addOfferingsLocationCheck;
        vm.addTithesLocationCheck = addTithesLocationCheck;
        vm.submitTransactionLocationCheck = submitTransactionLocationCheck;
        ///////////////////////

        activate();

        function activate() {

            vm.parentSideBar = {
                ManageMembership: { active: false },
                ManageTithes: { active: false },
                ManageOfferings: { active: false },
                ManageTransactions: { active: false }
            };
        }

        function activateDeactivateParent(name) {
            vm.parentSideBar[name].active = !vm.parentSideBar[name].active;
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