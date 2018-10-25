(function () {

    "use strict";

    angular.module("app")
        .controller("editDonationController", editDonationController);

    editDonationController.$inject = [];

    function editDonationController() {
        var vm = this;

        vm.dismiss = dismiss;
        vm.doSave = doSave;
        //////////////////


        vm.$onInit = function () {
            vm.donation = vm.resolve.donationToEdit;
            vm.donation.DonationDate = new Date(vm.donation.DonationDate);
            vm.enums = vm.resolve.enums;
            setDonationTypeDdl();
        };

        function doSave(donation) {
            return vm.resolve.doSave.save(donation)
                .then(function () {
                    dismiss();
                });
        }

        function dismiss() {
            vm.close({ $value: "stuff" });
        }

        function setDonationTypeDdl() {
            vm.donation.SelectedDonationType = vm.enums.DonationTypes[vm.enums.DonationTypes.findIndex(x => x.Id === vm.donation.DonationTypeId)];
        }

    }

})();