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
        vm.enableDisableContactInfo = enableDisableContactInfo;
        vm.addRelative = addRelative;
        //////////////////

        var enums = enumsDataService.enums;
        var memberGrid = [];

        vm.$onInit = function () {
            vm.family = vm.resolve.membershipToEdit.Family;
            vm.address = vm.resolve.membershipToEdit.Location;
            vm.memberInfoArray = vm.resolve.membershipToEdit.Membership;
            vm.contactInfo = vm.resolve.membershipToEdit.ContactInfo;
            vm.stateList = vm.resolve.stateList;
            vm.address.SelectedState = vm.stateList[vm.stateList.findIndex(x => x.Abbreviation === vm.address.State)];
            vm.beingEdited = vm.resolve.beingEdited;
            memberGrid = vm.resolve.memberGrid;

            setMemberEnums();
            addMemberName(vm.memberInfoArray);
        };

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
            updateMemberData(formName, formData);
            dismiss(formData);
            return vm.resolve.doSave.save(formName, formData);
        }

        function findActiveIndex(currentIndex, arrayCount) {
            return vm.resolve.followIndex.followActiveIndex(currentIndex, arrayCount);
        }

        function enableDisableContactInfo(info) {
            return vm.resolve.addRemoveInfo.enableDisableContactInfo(info);
        }

        function dismiss(memberToEdit) {
            vm.close({ $value: memberToEdit });
            console.log("YO!");
        }

        function addMemberName(membership) {
            for (var i = 0; i < membership.length; i++) {
                vm.contactInfo[i].Name = `${membership[i].FirstName} ${membership[i].LastName}`;
            }
        }

        function addRelative() {
            vm.resolve.addMore.addRelative();
        }

        function updateMemberData(formName, formData) {
            switch (formName) {
                case "family":
                    angular.forEach(memberGrid, function (member, key, obj) {
                        if (member.FamilyId === formData.FamilyId)
                            member.FamilyName = formData.Name;
                    });
                    break;
                case "memberInfo":
                    angular.forEach(memberGrid, function (member, key, obj) {
                        var index = formData.findIndex(x => x.MemberId === member.MemberId);
                        if (index > -1) {
                            member.FirstName = formData[index].FirstName;
                            member.LastName = formData[index].LastName;
                            member.Dob = formData[index].Dob;
                            member.Gender = formData[index].Gender;
                            member.MembershipStatus = formData[index].SelectedMembershipStatus.Description;
                        }
                    });
                    break;
                case "contactInfo":
                    break;
            }
        }

    }

})();