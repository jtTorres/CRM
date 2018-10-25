(function () {

    "use strict";
    angular.module("app")
        .controller("addDonationController", addDonationController);

    addDonationController.$inject = ["operationFlowService", "$scope", "membershipDataService", "utilityService"];

    function addDonationController(operationFlowService, $scope, membershipDataService, utilityService) {
        var vm = this;

        vm.addDonation = addDonation;
        vm.clearForm = clearForm;
        vm.dateFormat = "MM/dd/yyyy";
        vm.openCalendar = openCalendar;
        vm.onMemberSelected = onMemberSelected;

        /////////////////////////

        activate();

        function activate() {
            console.log("Activated Donation Controller...");
            getAllMembership();
        }

        function getAllMembership() {
            vm.allMembership = membershipDataService.allMembership;
        }

        function onMemberSelected(item, model, label) {
            if (utilityService.isUndefinedOrNull(vm.donation.MemberId) ||
                !utilityService.isUndefinedOrNull(item.MemberId) && vm.donation.MemberId !== item.MemberId)
                vm.donation.MemberId = item.MemberId;
        }

        function addDonation(donation, form) {
            if (!operationFlowService.isFormValid(form)) return;

            vm.onSave({ donation: donation })
                .then(clearForm(vm.addDonationForm));
        }

        function clearForm() {
            vm.onClearForm({ form: vm.addDonationForm });
        }

        function openCalendar() {
            vm.isOpenDonationDate = true;
        }

        $scope.$on("reloadAddOffering", clearForm);
    }

})();