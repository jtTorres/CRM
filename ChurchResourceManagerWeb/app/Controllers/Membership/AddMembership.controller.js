(function () {

    "use strict";
    angular.module("app")
        .controller("addMembershipController", addMembershipController);

    addMembershipController.$inject = ["operationFlowService", "utilityService"];

    function addMembershipController(operationFlowService, utilityService) {
        var vm = this;


        vm.addMembership = addMembership;
        vm.clearForm = clearForm;
        vm.preferredContactMethods = [
            { Name: "Do Not Contact", ID: 0 },
            { Name: "Home Phone", ID: 1 },
            { Name: "Cell Phone", ID: 2 },
            { Name: "Email", ID: 3 }
        ];
        vm.membershipStatus = [
            { Type: "Unknown", ID: 0 },
            { Type: "Active", ID: 1 },
            { Type: "Passive", ID: 2 }
        ];

        /////////////////////////////////

        activate();

        function activate() {
            setAccordionDefaults();
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
        // #endregion

        function clearForm() {
            vm.Membership = utilityService.clearObject(vm.Membership);
            vm.addMembershipForm.$setPristine();
            vm.addMembershipForm.$setUntouched();
        }
    }

})();