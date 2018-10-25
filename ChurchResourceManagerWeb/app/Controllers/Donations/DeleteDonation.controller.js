(function () {

    "use strict";
    angular.module("app")
        .controller("deleteDonationController", deleteDonationController);

    deleteDonationController.$inject = [];

    function deleteDonationController() {
        var vm = this;

        vm.deleteDonation = deleteDonation;
        vm.dismiss = dismiss;
        /////////////////////////////////////////////

        var donationId;
        vm.$onInit = function () {
            donationId = vm.resolve.donationToDelete;
        };

        function deleteDonation() {
            vm.resolve.doDelete.delete(donationId).then(function () {
                dismiss();
            });
        }

        function dismiss() {
            vm.close();
        }

    }

})();