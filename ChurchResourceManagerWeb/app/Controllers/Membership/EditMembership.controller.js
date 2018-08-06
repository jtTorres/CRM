(function () {

    "use strict";

    angular.module("app")
        .controller("editMembershipController", editMembershipController);

    editMembershipController.$inject = ["enumsDataService"];

    function editMembershipController(enumsDataService) {
        var vm = this;

        vm.dismiss = dismiss;
        vm.doSave = doSave;
        vm.findActiveIndex = findActiveIndex;
        //////////////////

        var enums = enumsDataService.enums;

        vm.$onInit = function () {
            vm.family = vm.resolve.membershipToEdit.Family;
            vm.address = vm.resolve.membershipToEdit.Location;
            vm.memberInfoArray = vm.resolve.membershipToEdit.Membership;
            vm.contactInfo = vm.resolve.membershipToEdit.ContactInfo;
            vm.stateList = vm.resolve.stateList;
            vm.address.SelectedState = vm.stateList[vm.stateList.findIndex(x => x.Abbreviation === vm.address.State)];
            vm.beingEdited = vm.resolve.beingEdited;

            setMemberEnums();
        }

        function setMemberEnums() {
            angular.forEach(vm.memberInfoArray, function (member, key, obj) {
                member.SelectedMembershipStatus = enums.membershipStatuses[enums.membershipStatuses.findIndex(x => x.Id === member.MembershipStatusId)];
                member.SelectedRelationshipType = enums.relationshipTypes[enums.relationshipTypes.findIndex(x => x.Id === member.RelationshipTypeId)];
                member.SelectedGender = enums.genders[enums.genders.findIndex(x => x.Id === member.Gender)];
                member.SelectedMaritalStatus = enums.maritalStatuses[enums.maritalStatuses.findIndex(x => x.Id === member.MaritalStatusId)];
                member.SelectedMemberGroup = enums.memberGroups[enums.memberGroups.findIndex(x => x.Id === member.GroupId)];
            });

            angular.forEach(vm.contactInfo, function (contact, key, obj) {
                contact.SelectedPreferredContactMethod = enums.contactMethods[enums.contactMethods.findIndex(x => x.Id === contact.PreferredContactMethod)];
            });
        }

        function doSave(formName, formData) {
            return vm.resolve.doSave.save(formName, formData);
        }

        function findActiveIndex(currentIndex, arrayCount) {
            return vm.resolve.followIndex.followActiveIndex(currentIndex, arrayCount);
        }

        function dismiss() {
            vm.close({ $value: "stuff" });
            console.log("YO!");
        }

    }

})();