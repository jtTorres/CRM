(function () {

    "use strict";
    angular.module("app")
        .controller("membershipController", membershipController);

    membershipController.$inject = ["membershipDataService", "utilityService", "operationFlowService", "$scope", "enumsDataService", "$uibModal"];

    function membershipController(membershipDataService, utilityService, operationFlowService, $scope, enumsDataService, $uibModal) {
        var vm = this;
        vm.addRelative = addRelative;
        vm.Address = {};
        vm.activeTab = 0;
        vm.beingEdited = {
            familyForm: true,
            personalInfoForm: true,
            addressInfoForm: true,
            contactInfoForm: true
        }
        vm.contactInfo = [];
        vm.disableTabs = true;
        vm.doEdit = doEdit;
        vm.doSave = doSave;
        vm.doSaveAddressInfo = doSaveAddressInfo;
        vm.doSaveContactInfo = doSaveContactInfo;
        vm.doSaveFamily = doSaveFamily;
        vm.doSaveMembership = doSaveMembership;
        vm.emptyContactInfo = {};
        vm.emptyMemberInfo = {};
        vm.enableDisableTab = enableDisableTab;
        vm.Family = {}
        vm.getMemberSearch = getMemberSearch;
        vm.findActiveIndex = findActiveIndex;
        vm.getEmptyMemberInfo = getEmptyMemberInfo;
        vm.Membership = {};
        vm.memberInfoArray = [];
        vm.openEditMembershipModal = openEditMembershipModal;
        vm.stateList = membershipDataService.getStateList();
        /////////////////////////////
        var memberIds = [];

        const tabs = {
            Family: 0,
            Address: 1,
            Personal: 2,
            Contact: 3
        }

        activate();

        function activate() {
            console.log("Activated Membership Controller");

            getEmptyMemberInfo();
            getAllEnums();
            setAccordionDefaults();
        }

        // #region Family Tab
        function doSaveFamily(family) {
            if (utilityService.isUndefinedOrNull(family.FamilyId)) {//vm.Family.FamilyId
                return membershipDataService.addFamily(family)
                    .then(function (response) {
                        if (response.data) {
                            if (response.data.Id) {
                                vm.Family.FamilyId = response.data.Id;
                                vm.beingEdited.familyForm = false;
                                setActiveTab(tabs.Address);
                                vm.processFlow = operationFlowService.operationCompletion("Saved Successfully!", true);
                            }
                        }
                    })
                    .catch(onSaveError);
            } else {
                return membershipDataService.updateFamily(family)
                    .then(function () {
                        vm.beingEdited.familyForm = false;
                        onSaveSuccess();
                    })
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
                                setActiveTab(tabs.Personal);
                                vm.beingEdited.addressInfoForm = false;
                                vm.processFlow = operationFlowService.operationCompletion("Saved Successfully!", true);
                            }
                        }
                    })
                    .catch(onSaveError);
            } else {
                return membershipDataService.updateAddress(addressInfo)
                    .then(function () {
                        vm.beingEdited.addressInfoForm = false;
                        onSaveSuccess();
                    })
                    .catch(onSaveError);
            }
        }
        // #endregion

        // #region Member Info Tab
        function doSaveMembership(memberInfo) {
            setDdlSelections("personalInfo", memberInfo);

            if (memberInfo[0].MemberId === 0) {
                addLocationId(memberInfo);
                addFamilyId(memberInfo);

                return membershipDataService.addMembership(memberInfo)
                    .then(function (response) {
                        if (response.data) {
                            if (response.data.MemberIds) {
                                memberIds = response.data.MemberIds;
                                assignMemberIds("memberInfoArray");
                                addMemberName(memberInfo);
                                setActiveTab(tabs.Contact);
                                vm.beingEdited.personalInfoForm = false;
                                vm.processFlow = operationFlowService.operationCompletion("Saved Successfully!", true);
                            }
                        }
                    })
                    .catch(onSaveError);
            } else {
                return membershipDataService.updateMembership(memberInfo)
                    .then(function () {
                        vm.beingEdited.personalInfoForm = false;
                        onSaveSuccess();
                    })
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

            if (contactInfo[0].MemberId === 0) {
                assignMemberIds("contactInfo");
                return membershipDataService.addContactInfo(contactInfo)
                    .then(function (response) {
                        vm.beingEdited.contactInfoForm = false;
                        vm.processFlow = operationFlowService.operationCompletion("Saved Successfully!", true);
                        vm.disableTabs = false;
                    })
                    .catch(onSaveError);
            } else {
                return membershipDataService.updateContactInfo(contactInfo)
                    .then(function () {
                        vm.beingEdited.contactInfoForm = false;
                        onSaveSuccess();
                    })
                    .catch(onSaveError);
            }
        }


        // #endregion

        // #region Add Membership Controller
        function getEmptyMemberInfo() {
            membershipDataService.getEmptyMemberInfo()
                .then(function (response) {
                    vm.emptyMemberInfo = angular.copy(response.data.memberInfo);
                    vm.emptyContactInfo = angular.copy(response.data.contactInfo);
                    vm.memberInfoArray.push(response.data.memberInfo);
                    vm.contactInfo.push(response.data.contactInfo);
                })
                .catch(function (reason) {
                    vm.processFlow = operationFlowService.operationCompletion(reason.message, false);
                });
        }

        $scope.$on("memberInfoAddRelative", addRelative);
        $scope.$on("memberInfoRemoveRelative", removeRelative);
        $scope.$on("contactInfoRemoveContact", enableDisableContactInfo);
        $scope.$on("enableContactInfo", enableDisableContactInfo);

        function addRelative() {
            var emptyMemberInfoCopy = angular.copy(vm.emptyMemberInfo);
            var emptyContactInfoCopy = angular.copy(vm.emptyContactInfo);

            vm.memberInfoArray.push(emptyMemberInfoCopy);
            vm.contactInfo.push(emptyContactInfoCopy);
        }

        function removeRelative(event, index) {
            vm.memberInfoArray.splice(index, 1);
            vm.contactInfo.splice(index, 1);
        }

        function enableDisableContactInfo(event, index) {
            vm.contactInfo[index].IsContactInfoPanelDisabled = !vm.contactInfo[index].IsContactInfoPanelDisabled;
            vm.contactInfo[index].IsContactInfoPanelOpen = !vm.contactInfo[index].IsContactInfoPanelOpen;
        }


        // #endregion

        // #region Shared Functions
        function doSave(formName, formData) {
            switch (formName) {
                case "family":
                    doSaveFamily(formData);
                    break;
                case "address":
                    doSaveAddressInfo(formData);
                    break;
                case "memberInfo":
                    doSaveMembership(formData);
                    break;
                case "contactInfo":
                    doSaveContactInfo(formData);
                    break;
                default:
                    break;
            }
        }

        function findActiveIndex(currentIndex, arrayCount) {
            return currentIndex === arrayCount - 1;
        }

        function setActiveTab(tab) {
            vm.activeTab = tab;
        }

        function enableDisableTab(index) {
            return (vm.activeTab !== index && vm.disableTabs) || vm.disableTabs;
        }

        function getMemberToEdit(familyId) {
            return membershipDataService.editMembership(familyId)
                .then(function (response) {
                    vm.membershipToEdit = response.data;
                })
                .catch(onSaveError);
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

        function assignMemberIds(objectName) {
            for (var i = 0; i < memberIds.length; i++) {
                vm[objectName][i].MemberId = memberIds[i];

            }
        }

        function addMemberName(membership) {
            for (var i = 0; i < membership.length; i++) {
                vm.contactInfo[i].Name = `${membership[i].FirstName} ${membership[i].LastName}`;
            }
        }

        function setAccordionDefaults() {
            vm.accordionSettings = {
                isFamilyOpen: true,
                isMemberInfoOpen: false,
                isPersonalInfoOpen: false,
                isContactInfoOpen: true,
                isAddressInfoOpen: false,
                closeOthers: false
            };
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
                        if (!info.IsContactInfoPanelDisabled)
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



        // #region Edit Membership Modal Component

        function openEditMembershipModal(member) {

            getMemberToEdit(member.FamilyId)
                .then(function () {
                    var memberToEdit = angular.copy(member);

                    var modalInstance = $uibModal.open({
                        animation: true,
                        component: "editMembershipModal",
                        windowClass: "edit-membership-modal",
                        resolve: {
                            membershipToEdit: function () {
                                return vm.membershipToEdit;
                            },
                            stateList: function () {
                                return vm.stateList;
                            },
                            beingEdited: function () {
                                return vm.beingEdited;
                            },
                            activeTab: function () {
                                return vm.activeTab;
                            },
                            doSave: {
                                save: function (formName, formData) {
                                    return doSave(formName, formData);
                                }
                            },
                            followIndex: {
                                followActiveIndex: function (currentIndex, arrayCount) {
                                    return findActiveIndex(currentIndex, arrayCount);
                                }
                            },
                            addInfo: {
                                enableDisableContactInfo: function (index) {
                                    return enableDisableContactInfo(index);
                                }
                            }
                        }
                    });

                    modalInstance.result
                        .then(function (stuff) {
                            getMemberSearch();
                        })
                        .catch(function (reason) { //this will run if the user clicks out of the modal without click x button
                            getMemberSearch();
                        });
                });
        }
        // #endregion

        // #region MemberSearch
        function getMemberSearch() {
            membershipDataService.getMemberSearch()
                .then(function (response) {
                    vm.members = response.data;
                });
        }
        // #endregion

    }

})();