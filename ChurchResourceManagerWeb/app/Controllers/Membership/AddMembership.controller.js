(function () {

    "use strict";
    angular.module("app")
        .controller("addMembershipController", addMembershipController);

    addMembershipController.$inject = ["operationFlowService", "utilityService", "$scope"];

    function addMembershipController(operationFlowService, utilityService, $scope) {
        var vm = this;


        vm.addMembership = addMembership;
        vm.clearForm = clearForm;
        vm.Membership = {};

        /////////////////////////////////

        activate();

        function activate() {
            setAccordionDefaults();
            setMembershipFromBinding();
            console.log("Activated Add Membership Controller");
        }

        function addMembership(membershipRecord, form) {
            if (!operationFlowService.isFormValid(form)) return;
            setDdlSelections(membershipRecord);
            vm.onSave({ membershipRecord: membershipRecord })
                .then(onSaveSuccess);
        }

        function onSaveSuccess(response) {
            clearForm();
            utilityService.scrollTop("mainContainer");
        }

        function setDdlSelections(membershipRecord) {
            membershipRecord.Gender = vm.Membership.SelectedGender.Abbreviation;
            membershipRecord.MaritalStatusId = vm.Membership.SelectedMaritalStatus.ID;
            membershipRecord.GroupId = vm.Membership.SelectedMemberGroup.ID;
            membershipRecord.PreferredContactMethod = vm.Membership.SelectedPreferredContactMethod.ID;
            membershipRecord.State = vm.Membership.SelectedState.Abbreviation;
        }

        function setMembershipFromBinding() {
            if (!utilityService.isUndefinedOrNull(vm.membership))
                vm.Membership = vm.membership;
        }

        // #region Accordion Configuration
        function setAccordionDefaults() {
            vm.accordionSettings = {
                isFamilyOpen: true,
                isMemberInfoOpen: false,
                isPersonalInfoOpen: false,
                isContactInfoOpen: false,
                isAddressInfoOpen: false,
                closeOthers: false
            };
        }

        //$scope.$on("memberInfoAddRelative", openMemberInfoPanel);
        //function openMemberInfoPanel() {
        //    vm.accordionSettings.isMemberInfoOpen = true;
        //}

        // #endregion

        function clearForm() {
            vm.Membership = utilityService.clearObject(vm.Membership);
            vm.addMembershipForm.$setPristine();
            vm.addMembershipForm.$setUntouched();
        }
    }

})();