(function () {

    "use strict";
    angular.module("app")
        .controller("membershipController", membershipController);

    membershipController.$inject = ["membershipDataService", "utilityService", "operationFlowService", "$scope", "enumsDataService"];

    function membershipController(membershipDataService, utilityService, operationFlowService, $scope, enumsDataService) {
        var vm = this;
        vm.addRelative = addRelative;
        vm.Address = {};
        vm.beingEdited = {
            familyForm: true,
            personalInfoForm: true,
            addressInfoForm: true,
            contactInfoForm: true
        }
        vm.doEdit = doEdit;
        vm.doSaveAddressInfo = doSaveAddressInfo;
        vm.doSaveContactInfo = doSaveContactInfo;
        vm.doSaveFamily = doSaveFamily;
        vm.emptyMemberInfo = {};
        vm.Family = {}
        vm.findActiveIndex = findActiveIndex;

        vm.getEmptyMemberInfo = getEmptyMemberInfo;
        vm.Membership = {};
        vm.memberInfoArray = [];
        vm.contactInfo = [];
        vm.doSaveMembership = doSaveMembership;
        vm.stateList = membershipDataService.getStateList();
        /////////////////////////////

        activate();

        function activate() {
            console.log("Activated Membership Controller");
            getEmptyMemberInfo();
            getAllEnums();
        }

        // #region Family Tab
        function doSaveFamily(family) {
            if (utilityService.isUndefinedOrNull(vm.Family.FamilyId)) {
                return membershipDataService.addFamily(family)
                    .then(function (response) {
                        if (response.data) {
                            if (response.data.Id) {
                                vm.Family.FamilyId = response.data.Id;
                                vm.beingEdited.familyForm = false;
                                vm.processFlow = operationFlowService.operationCompletion("Saved Successfully!", true);
                            }
                        }
                    })
                    .catch(onSaveError);
            } else {
                return membershipDataService.updateMembership(membershipRecord)
                    .then(onSaveSuccess)
                    .catch(onSaveError);
            }
        }

        function doEdit(formName) {
            vm.beingEdited[formName] = true;
        }
        // #endregion

        // #region Address Info Tab
        function doSaveAddressInfo(addressInfo) {
            setDdlSelections("addressInfo", addressInfo);

            if (utilityService.isUndefinedOrNull(addressInfo.LocationId)) {
                return membershipDataService.addLocation(addressInfo)
                    .then(function (response) {
                        if (response.data) {
                            if (response.data.LocationId) {
                                vm.Address.LocationId = response.data.LocationId;

                                vm.beingEdited.addressInfoForm = false;
                                vm.processFlow = operationFlowService.operationCompletion("Saved Successfully!", true);
                            }
                        }
                    })
                    .catch(onSaveError);
            } else {
                return membershipDataService.updateLocation(addressInfo)
                    .then(onSaveSuccess)
                    .catch(onSaveError);
            }
        }
        // #endregion

        // #region Member Info Tab
        function doSaveMembership(memberInfo) {
            setDdlSelections("personalInfo", memberInfo);
            addLocationId(memberInfo);
            addFamilyId(memberInfo);

            if (memberInfo[0].MemberId === 0) {
                return membershipDataService.addMembership(memberInfo)
                    .then(function (response) {
                        if (response.data) {
                            if (response.data.MemberIds) {
                                assignMemberIds(response.data.MemberIds);
                            }
                            vm.beingEdited.personalInfoForm = false;
                            vm.processFlow = operationFlowService.operationCompletion("Saved Successfully!", true);
                        }
                    })
                    .catch(onSaveError);
            } else {
                return membershipDataService.updateMembership(memberInfo)
                    .then(onSaveSuccess)
                    .catch(onSaveError);
            }
        }

        function onSaveSuccess(response) {
            vm.processFlow = operationFlowService.operationCompletion("Saved Successfully!", true);
        }

        function onSaveError(reason) {
            vm.processFlow = operationFlowService.operationCompletion(reason.message, false);
        }

        // #endregion

        // #region Contact Info Form
        function doSaveContactInfo(contactInfo) {
            setDdlSelections("contactInfo", contactInfo);

            if (utilityService.isUndefinedOrNull(contactInfo.ContactMethodId)) {
                return membershipDataService.addContactInfo(contactInfo)
                    .then(function (response) {
                        vm.beingEdited.contactInfoForm = false;
                        vm.processFlow = operationFlowService.operationCompletion("Saved Successfully!", true);
                    })
                    .catch(onSaveError);
            } else {
                return membershipDataService.updateContactInfo(contactInfo)
                    .then(onSaveSuccess)
                    .catch(onSaveError);
            }
        }


        // #endregion

        // #region Add Membership Controller
        function getEmptyMemberInfo() {
            membershipDataService.getEmptyMemberInfo()
                .then(function (response) {
                    vm.emptyMemberInfo = angular.copy(response.data);
                    vm.memberInfoArray.push(response.data);
                    vm.contactInfo.push({});
                })
                .catch(function (reason) {
                    vm.processFlow = operationFlowService.operationCompletion(reason.message, false);
                });
        }

        $scope.$on("memberInfoAddRelative", addRelative);
        $scope.$on("memberInfoRemoveRelative", removeRelative);
        $scope.$on("contactInfoRemoveContact", removeContactInfo);

        function addRelative() {
            var emptyMemberInfoCopy = angular.copy(vm.emptyMemberInfo);
            vm.memberInfoArray.push(emptyMemberInfoCopy);
            vm.contactInfo.push({});
        }

        function removeRelative(event, index) {
            vm.memberInfoArray.splice(index, 1);
        }

        function removeContactInfo(event, index) {
            vm.contactInfo.splice(index, 1);
        }


        // #endregion

        // #region Shared Functions
        function findActiveIndex(currentIndex, arrayCount) {
            return currentIndex === arrayCount - 1;
        }
        // #endregion


        // #region generic functions
        function addLocationId(record) {
            angular.forEach(record, function (member, key, obj) {
                member.LocationId = vm.Address.LocationId;
            });
        }

        function addFamilyId(record) {
            angular.forEach(record, function (member, key, obj) {
                member.FamilyId = vm.Family.FamilyId;
            });
        }

        function assignMemberIds(memberIds) {
            for (var i = 0; i < memberIds.length; i++) {
                vm.memberInfoArray[i].MemberId = memberIds[i];
                vm.contactInfo[i].MemberId = memberIds[i];
            }
        }

        function getAllEnums() {
            enumsDataService.getContactMethods().then(function (response) {
                enumsDataService.enums.contactMethods = response.data;
            });

            enumsDataService.getMembershipStatuses().then(function (response) {
                enumsDataService.enums.membershipStatuses = response.data;
            });

            enumsDataService.getRelationshipTypes().then(function (response) {
                enumsDataService.enums.relationshipTypes = response.data;
            });

            enumsDataService.getMaritalStatuses().then(function (response) {
                enumsDataService.enums.maritalStatuses = response.data;
            });

            enumsDataService.getMemberGroups().then(function (response) {
                enumsDataService.enums.memberGroups = response.data;
            });
        }

        function setDdlSelections(form, record) {

            switch (form) {
                case "personalInfo":
                    angular.forEach(record, function (info, key, obj) {
                        info.Gender = info.SelectedGender.Id;
                        info.MaritalStatusId = info.SelectedMaritalStatus.Id;
                        info.GroupId = info.SelectedMemberGroup.Id;
                        info.RelationshipTypeId = info.SelectedRelationshipType.Id;
                        info.MembershipStatusId = info.SelectedMembershipStatus.Id;
                    });
                    break;
                case "contactInfo":
                    angular.forEach(record, function (info, key, obj) {
                        info.PreferredContactMethod = info.SelectedPreferredContactMethod.Id;
                    });
                    break;
                case "addressInfo":
                    record.State = record.SelectedState.Abbreviation;
                    break;
                default:
                    break;
            }
        }
        // #endregion
    }

})();