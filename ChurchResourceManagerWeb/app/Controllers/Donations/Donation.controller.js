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


        var updateType = "";

        activate();
        function activate() {
            setDefaults();
            getEnums();
        }

        function onSaveSuccess(response) {
            updateDonationActivityGrid(updateType, response.data);
            vm.processFlow = operationFlowService.operationCompletion("Donation Saved Successfully!", true);
            usSpinnerService.stop();
        }

        function onSaveError(reason) {
            vm.processFlow = operationFlowService.operationCompletion(reason.message, false);
            usSpinnerService.stop();
        }

        function doSave(donation) {
            usSpinnerService.spin();
            getDropdownSelection(donation);

            if (utilityService.isUndefinedOrNull(donation.DonationId)) {
                updateType = "Insert";
                return donationsDataService.addDonation(donation)
                    .then(onSaveSuccess)
                    .catch(onSaveError);
            } else {
                updateType = "Update";
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
            usSpinnerService.spin("spinner-AD");
            donationsDataService.getActivity(vm.activityType)
                .then(function (response) {
                    vm.donationActivity = response.data;
                    setDonationActivityPanelDefaults(vm.activityType, response.data.length);
                    usSpinnerService.stop("spinner-AD");
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
            usSpinnerService.spin();
            return donationsDataService.getDonation(donationId)
                .then(function (response) {
                    vm.donationToEdit = response.data;
                    usSpinnerService.stop();
                })
                .catch(onSaveError);
        }

        function getEnums() {
            usSpinnerService.spin();
            enumsDataService.getDonationTypes()
                .then(function (response) {
                    vm.enums.DonationTypes = response.data;
                    const titheIndex = vm.enums.DonationTypes.findIndex(x => x.Description === "Tithes");
                    vm.enums.DonationTypes.splice(titheIndex, 1);
                    usSpinnerService.stop();
                });
        }
        // #endregion

        // #region Edit Donations Modal
        function openEditDonationModal(donation) {
            getDonationToEdit(donation.DonationId)
                .then(function () {
                    vm.donationToEdit.selectedMember = vm.donation.MemberKey;
                    var modalInstance = $uibModal.open({
                        animation: true,
                        component: "editDonationModal",
                        resolve: {
                            donationToEdit: function () {
                                return vm.donationToEdit;
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
                            //getDonationActivity();
                        })
                        .catch(function (reason) { //this will run if the user clicks out of the modal without click x button
                            //getDonationActivity();
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
                    //getDonationActivity();
                });
        }

        function deleteDonation(donationId) {
            //TODO: ADD RETURN TO THIS
            usSpinnerService.spin();
            updateType = "Delete";
            return donationsDataService.deleteDonation(donationId)
                .then(function (response) {
                    updateDonationActivityGrid(updateType, response.data);
                    vm.processFlow = operationFlowService.operationCompletion("Donation Deleted Successfully", true);
                    usSpinnerService.stop();
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
            setDonationActivityPanelDefaults();
        }

        function updateDonationActivityGrid(action, donationRecord) {
            utilityService.updateObjectArray(action, donationRecord, vm.donationActivity, "DonationId");
        }

        $scope.$on("reloadAddDonations", setDefaults);
    }

})();