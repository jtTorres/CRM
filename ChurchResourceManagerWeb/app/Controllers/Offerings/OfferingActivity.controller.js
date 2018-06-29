(function () {

    "use strict";
    angular.module("app")
        .controller("offeringActivityController", offeringActivityController);

    offeringActivityController.$inject = [];

    function offeringActivityController() {
        var vm = this;

        vm.deleteOffering = deleteOffering;
        vm.editOffering = editOffering;

        /////////////////////////////


        vm.$onInit = function() {
            vm.getOfferingActivity({ offeringActivityType: vm.offeringActivityType });
        }

        function editOffering(offering, index) {

        }

        function deleteOffering(offeringId) {

        }
    }

})();