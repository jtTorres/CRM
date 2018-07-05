(function () {

    "use strict";
    angular.module("app")
        .controller("addMembershipController", addMembershipController);

    addMembershipController.$inject = [];

    function addMembershipController() {
        var vm = this;

        vm.preferredContactMethods = [
            { Name: "Do Not Contact", ID: 0 },
            { Name: "Home Phone", ID: 1 },
            { Name: "Cell Phone", ID: 2 },
            { Name: "Email", ID: 3 }
        ];

        /////////////////////////////////
        activate();

        function activate() {
            setAccordionDefaults();
            console.log("Activated Add Membership Controller");
        }

        /////////////////////////////

        // #region Accordion Configuration
        function setAccordionDefaults() {
            vm.accordionSettings = {
                isOpen: true,
                closeOthers: false
            };
        }
        // #endregion
    }

})();