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
            //vm.allMembership = membershipDataService.allMembership;
            membershipDataService.getAllMembership()
                .then(function (response) {
                    vm.allMembership = response.data;
                });
        }

        function onMemberSelected(item, model, label) {
            if (utilityService.isUndefinedOrNull(vm.donation.MemberId) ||
                !utilityService.isUndefinedOrNull(item.MemberId) && vm.donation.MemberId !== item.MemberId)
                vm.donation.MemberId = item.MemberId;
        }

        function addDonation(donation, form) {
            if (!operationFlowService.isFormValid(form)) return;
            checkMemberSelection(donation);

            vm.onSave({ donation: donation })
                .then(clearForm(vm.addDonationForm));
        }

        function clearForm() {
            vm.onClearForm({ form: vm.addDonationForm });
        }

        function openCalendar() {
            vm.isOpenDonationDate = true;
        }

        function checkMemberSelection(donation) {
            if (donation.selectedMember === "")
                donation.MemberId = null;
            donation.FirstName = null;
            donation.LastName = null;
        }

        $scope.$on("reloadAddOffering", clearForm);
    }

})();