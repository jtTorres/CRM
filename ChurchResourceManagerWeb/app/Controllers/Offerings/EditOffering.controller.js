﻿(function () {

    "use strict";

    angular.module("app")
        .controller("editOfferingController", editOfferingController);

    editOfferingController.$inject = [];

    function editOfferingController() {

        var vm = this;


        vm.updateOffering = updateOffering;
        ///////////////////////////////////

        vm.$onInit = function () {
            vm.Offering = vm.resolve.offeringToEdit;
            vm.Offering.OfferingDate = new Date(vm.Offering.OfferingDate);
            vm.updateTotals = vm.resolve.addToTotal.updateTotals;
            vm.enums = vm.resolve.enums;
            setDonationTypeDdl();
        };

        function updateOffering(offering) {
            return vm.resolve.save.saveOffering(offering)
                .then(function () {
                    vm.close({ $value: offering });
                });
        }

        function setDonationTypeDdl() {
            vm.Offering.SelectedDonationType = vm.enums.DonationTypes[vm.enums.DonationTypes.findIndex(x => x.Id === vm.Offering.DonationTypeId)];
        }
    }

})();