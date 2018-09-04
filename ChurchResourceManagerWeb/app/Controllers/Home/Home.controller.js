(function () {
    "use strict";
    angular.module("app")
        .controller("homeController", homeController);

    homeController.$inject = ["operationFlowService"];

    function homeController(operationFlowService) {

        var vm = this;

        vm.activateDeactivateParent = activateDeactivateParent;
        vm.addMembershipLocationCheck = addMembershipLocationCheck;
        vm.addOfferingsLocationCheck = addOfferingsLocationCheck;
        vm.addTithesLocationCheck = addTithesLocationCheck;
        vm.checkActive = checkActive;
        vm.isActiveParentNav = isActiveParentNav;
        vm.openCloseNav = openCloseNav;
        vm.submitTransactionLocationCheck = submitTransactionLocationCheck;
        ///////////////////////

        activate();

        function activate() {
            setDefaults();
        }

        function activateDeactivateParent(name) {
            setDefaults();
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

        function checkActive(path) {
            return isActivePath(path);
        }

        function openCloseNav(path) {
            return isActivePath(path);
        }

        function isActivePath(path) {
            return location.pathname.indexOf(path) > 0;
        }

        function isActiveParentNav(name) {
            return vm.parentSideBar[name].active;
        }

        function setDefaults() {
            vm.parentSideBar = {
                ManageMembership: { active: false },
                ManageTithes: { active: false },
                ManageOfferings: { active: false },
                ManageTransactions: { active: false },
                Reporting: { active: false }
            };
        }
    }

})();