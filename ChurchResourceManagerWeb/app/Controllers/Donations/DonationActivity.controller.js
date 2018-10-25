(function () {

    "use strict";
    angular.module("app")
        .controller("donationActivityController", donationActivityController);

    donationActivityController.$inject = [];

    function donationActivityController() {
        var vm = this;

        vm.deleteDonation = deleteDonation;
        vm.editDonation = editDonation;

        /////////////////////////////


        vm.$onInit = function () {
            vm.getDonationActivity({ donationActivityType: vm.donationActivityType });
        };

        function editDonation(donation, index) {
            vm.openEditModal({ donation: donation, index: index });
        }

        function deleteDonation(donationId) {
            vm.openDeleteModal({ donationId: donationId });
        }
    }

})();