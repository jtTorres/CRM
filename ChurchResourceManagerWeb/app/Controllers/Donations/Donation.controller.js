(function () {

    "use strict";
    angular.module("app")
        .controller("donationController", donationController);

    donationController.$inject = ["utilityService", "donationsDataService", "operationFlowService", "$uibModal", "enumsDataService", "membershipDataService", "$scope", "activitySelectorService", "usSpinnerService"];

    function donationController(utilityService, donationsDataService, operationFlowService, $uibModal, enumsDataService, membershipDataService, $scope, activitySelectorService, usSpinnerService) {
        var vm = this;

        vm.activityType = activitySelectorService.activityReportType;
        vm.doClearForm = doClearForm;
        vm.doSave = doSave;
        vm.enums = {};
        vm.getDonations = getDonations;
        vm.getDonationActivity = getDonationActivity;
        vm.openDeleteDonationModal = openDeleteDonationModal;
        vm.openEditDonationModal = openEditDonationModal;
        vm.donation = {};
        /////////////////////////

        activate();
        function activate() {
            getEnums();
            getAllMembership();
        }

        function getAllMembership() {
            return membershipDataService.getAllMembership()
                .then(function (response) {
                    membershipDataService.allMembership.data = response.data;
                    vm.allMembership = membershipDataService.allMembership;
                    return vm.allMembership;
                });
        }

        function onSaveSuccess(response) {
            vm.processFlow = operationFlowService.operationCompletion("Donation Saved Successfully!", true);
        }

        function onSaveError(reason) {
            vm.processFlow = operationFlowService.operationCompletion(reason.message, false);
        }

        function doSave(donation) {
            getDropdownSelection(donation);

            if (utilityService.isUndefinedOrNull(donation.DonationId)) {
                return donationsDataService.addDonation(donation)
                    .then(onSaveSuccess)
                    .catch(onSaveError);
            } else {
                return donationsDataService.updateDonation(donation)
                    .then(onSaveSuccess)
                    .catch(onSaveError);
            }
        }

        function doClearForm(form) {
            vm.donation = utilityService.clearObject(vm.donation);
            operationFlowService.resetForm(form);
        }

        function getDropdownSelection(donation) {
            donation.DonationTypeId = donation.SelectedDonationType.Id;
        }

        // #region Donation Activity Component

        function getDonationActivity(activityType) {
            usSpinnerService.spin("spinner-3");
            donationsDataService.getActivity(vm.activityType)
                .then(function (response) {
                    usSpinnerService.stop("spinner-3");
                    vm.donationActivity = response.data;
                    setDonationActivityPanelDefaults(vm.activityType, response.data.length);
                });
        }

        // #region Donations Search
        function getDonations() {
            donationsDataService.getDonations()
                .then(function (response) {
                    vm.donation = response.data;
                });
        }
        // #endregion

        // #region shared functions
        function getDonationToEdit(donationId) {
            return donationsDataService.getDonation(donationId)
                .then(function (response) {
                    vm.donation = response.data;
                })
                .catch(onSaveError);
        }

        function getEnums() {
            enumsDataService.getDonationTypes()
                .then(function (response) {
                    vm.enums.DonationTypes = response.data;
                    const titheIndex = vm.enums.DonationTypes.findIndex(x => x.Description === "Tithes");
                    vm.enums.DonationTypes.splice(titheIndex, 1);
                });
        }
        // #endregion

        // #region Edit Donations Modal
        function openEditDonationModal(donation) {
            getDonationToEdit(donation.DonationId)
                .then(function () {
                    vm.donation.selectedMember = vm.donation.MemberKey;
                    var modalInstance = $uibModal.open({
                        animation: true,
                        component: "editDonationModal",
                        resolve: {
                            donationToEdit: function () {
                                return vm.donation;
                            },
                            enums: function () {
                                return vm.enums;
                            },
                            doSave: {
                                save: function (donation) {
                                    return doSave(donation);
                                }
                            }
                        }
                    });

                    modalInstance.result
                        .then(function (stuff) {
                            getDonationActivity();
                        })
                        .catch(function (reason) { //this will run if the user clicks out of the modal without click x button
                            getDonationActivity();
                        });
                });
        }
        // #endregion

        // #region Delete Donation Modal Component
        function openDeleteDonationModal(donationId) {
            var modalInstance = $uibModal.open({
                animation: true,
                component: "deleteDonationModal",
                resolve: {
                    donationToDelete: function () {
                        return donationId;
                    },
                    doDelete: {
                        delete: function (donationId) {
                            return deleteDonation(donationId);
                        }
                    }
                }
            });

            modalInstance.result
                .then(function () {
                    getDonationActivity();
                });
        }

        function deleteDonation(donationId) {
            //TODO: ADD RETURN TO THIS
            return donationsDataService.deleteDonation(donationId)
                .then(function () {
                    vm.processFlow = operationFlowService.operationCompletion("Donation Deleted Successfully", true);
                })
                .catch(function (reason) {
                    vm.processFlow = operationFlowService.operationCompletion(reason.message, false);
                });
        }

        // #endregion

        // #region Panel Settings

        function setDonationActivityPanelDefaults(activityType, recordCount) {
            vm.donationActivityPanelSettings = {
                panelHeading: "Today's Donation Activity",
                isOpen: false
            };

            switch (activityType) {
                case "1":
                    vm.donationActivityPanelSettings.panelHeading = "Today's Donation Activity";
                    break;
                case "2":
                    vm.donationActivityPanelSettings.panelHeading = "Donation Activity";
                    break;
                default:
                    break;
            }
            vm.donationActivityPanelSettings.isOpen = recordCount > 0 ? true : false;

        }

        // #endregion


        function setDefaults() {

        }

        $scope.$on("reloadAddDonations", setDefaults);
    }

})();