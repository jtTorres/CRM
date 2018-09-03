(function () {
    "use strict";
    angular.module("app")
        .controller("homeController", homeController);

    homeController.$inject = ["operationFlowService", "$cookies"];

    function homeController(operationFlowService, $cookies) {

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
                ManageMembership: { active: false, AddMembership: { active: false }, ViewMembership: { active: false } },
                ManageTithes: { active: false, AddTithes: { active: false }, ViewTithes: { active: false } },
                ManageOfferings: { active: false, AddOfferings: { active: false }, ViewOfferings: { active: false } },
                ManageTransactions: { active: false, SubmitTransactions: { active: false }, ViewTransactions: { active: false } }
            };

            var url = $cookies.get("url");
            var stuff = document.cookie;

            //if (location.pathname === "/" || location.pathname !== url)
            //var stuff = $cookies.get("activePath");
            //$cookies.remove("activePath");
            setNavBarAfterReload();
        }

        function activateDeactivateParent(name) {
            vm.parentSideBar[name].active = !vm.parentSideBar[name].active;
        }

        function activateDeactivateChild(name, childName) {
            vm.parentSideBar[name][childName].active = !vm.parentSideBar[name][childName].active;
        }

        function addMembershipLocationCheck() {
            setActivePathCookies("AddMembership");
            operationFlowService.locationCheck("/Membership/AddMembership", "reloadAddMembership");
        }

        function addTithesLocationCheck() {
            setActivePathCookies("AddTithes");
            operationFlowService.locationCheck("/Tithing/AddTithes", "reloadAddTithes");
        }

        function addOfferingsLocationCheck() {
            setActivePathCookies("AddOfferings");
            operationFlowService.locationCheck("/Offerings/AddOfferings", "reloadAddOfferings");
        }

        function submitTransactionLocationCheck() {
            setActivePathCookies("SubmitTransactions");
            operationFlowService.locationCheck("/Transactions/SubmitTransactions", "reloadSubmitTransactions");
        }

        function setActivePathCookies(path) {
            //$cookies.put("activePath", path);
            //$cookies.put("url", location.pathname);
            document.cookie = "";
            document.cookie = path;
        }

        function setNavBarAfterReload() {
            //var cookie = $cookies.get("activePath");
            var cookie = document.cookie;

            var name, childName;
            switch (cookie) {
                case "AddMembership":
                    name = "ManageMembership";
                    childName = "AddMembership";
                    break;
                case "AddTithes":
                    name = "ManageTithes";
                    childName = "AddTithes";
                    break;
                case "AddOfferings":
                    name = "ManageOfferings";
                    childName = "AddOfferings";
                    break;
                case "SubmitTransactions":
                    name = "ManageTransactions";
                    childName = "SubmitTransactions";
                    break;
                default:
                    break;
            }
            if (name !== undefined) {
                activateDeactivateParent(name);
                activateDeactivateChild(name, childName);
            }
        }
    }

})();