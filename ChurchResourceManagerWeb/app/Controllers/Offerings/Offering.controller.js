(function () {

    "use strict";

    angular.module("app")
        .controller("offeringController", offeringController);

    offeringController.$inject = ["utilityService", "offeringDataService", "operationFlowService", "entitySelectorService", "activitySelectorService", "$uibModal", "$scope", "usSpinnerService", "enumsDataService"];

    function offeringController(utilityService, offeringDataService, operationFlowService, entitySelectorService, activitySelectorService, $uibModal, $scope, usSpinnerService, enumsDataService) {
        var vm = this;

        vm.activityType = activitySelectorService.activityReportType;
        vm.runningTotal = { data: "0" };
        vm.offeringId = {};

        vm.doSaveOffering = doSaveOffering;
        vm.enums = {};
        vm.getOfferingActivity = getOfferingActivity;
        vm.getOfferingActivitySearch = getOfferingActivitySearch;
        vm.getOfferingRunningTotal = getOfferingRunningTotal;
        vm.openDeleteOfferingModal = openDeleteOfferingModal;
        vm.openEditOfferingModal = openEditOfferingModal;
        vm.resetSearch = resetSearch;
        /////////////////////////////

        var updateType = "";

        activate();
        function activate() {
            setDefaults();
            getEnums();
            console.log("Activated Offerings Controller");
        }

        function getEnums() {
            usSpinnerService.spin("spinner-AO");
            enumsDataService.getDonationTypes()
                .then(function (response) {
                    vm.enums.DonationTypes = response.data;
                    const titheIndex = vm.enums.DonationTypes.findIndex(x => x.Description === "Tithes");
                    vm.enums.DonationTypes.splice(titheIndex, 1);
                });
        }

        // #region Add Tithes Component

        function doSaveOffering(offeringRecord) {
            usSpinnerService.spin("spinner-AO");
            getDropdownSelection(offeringRecord);
            if (utilityService.isUndefinedOrNull(offeringRecord.OfferingId)) {
                updateType = "Insert";
                return offeringDataService.addOffering(offeringRecord)
                    .then(onSaveSuccess)
                    .catch(onSaveError);
            } else {
                updateType = "Update";
                return offeringDataService.updateOffering(offeringRecord)
                    .then(onSaveSuccess)
                    .catch(onSaveError);
            }
        }

        function onSaveSuccess(response) {
            usSpinnerService.stop("spinner-AO");
            vm.processFlow = operationFlowService.operationCompletion("Offering Saved Successfully!", true);
            getOfferingRunningTotal();
            updateOfferingActivityGrid(updateType, response.data);
            clearActivity();
        }

        function onSaveError(reason) {
            usSpinnerService.stop("spinner-AO");
            vm.processFlow = operationFlowService.operationCompletion(reason.message, false);
        }

        function getDropdownSelection(offering) {
            offering.DonationTypeId = offering.SelectedDonationType.Id;
        }

        function clearActivity() {
            if (vm.offeringActivity)
                vm.offeringActivity.data = utilityService.clearObject(vm.offeringActivity.data);
        }

        // #endregion

        // #region Offering Activity Component

        function getOfferingActivity(activityType) {
            usSpinnerService.spin("spinner-AO");
            vm.activityType = activityType;

            offeringDataService.getActivity(activityType)
                .then(function (response) {
                    usSpinnerService.stop("spinner-AO");
                    vm.offeringActivity = response.data;
                    setOfferingActivityPanelDefaults(activityType, response.data.length);
                });
        }

        // #endregion

        // #region Offering Running Totals Component

        function getOfferingRunningTotal() {
            offeringDataService.getRunningTotals(null, entitySelectorService.entityType.Offering)
                .then(function (response) {
                    vm.runningTotal.data = response.data;
                });
        }

        // #endregion



        // #region Panel Settings

        function setOfferingActivityPanelDefaults(activityType, recordCount) {
            vm.offeringActivityPanelSettings = {
                panelHeading: "Today's Offering Activity",
                isOpen: false
            };

            switch (activityType) {
                case "1":
                    vm.offeringActivityPanelSettings.panelHeading = "Today's Offering Activity";
                    break;
                case "2":
                    vm.offeringActivityPanelSettings.panelHeading = "Offering Activity";
                    break;
                default:
                    break;
            }
            vm.offeringActivityPanelSettings.isOpen = recordCount > 0 ? true : false;

        }

        // #endregion

        // #region Edit Offering Modal Component
        function openEditOfferingModal(offering, index) {

            var offeringToEdit = angular.copy(offering);

            var modalInstance = $uibModal.open({
                animation: true,
                component: "editOfferingModal",
                resolve: {
                    offeringToEdit: function () {
                        return offeringToEdit;
                    },
                    enums: function () {
                        return vm.enums;
                    },
                    save: {
                        saveOffering: function (offeringRecord) {
                            return doSaveOffering(offeringRecord);
                        }
                    },
                    addToTotal: {
                        updateTotals: function (offeringAmount, offeringDate) {
                            return addToTotal(offeringAmount, offeringDate);
                        }
                    }
                }
            });

            modalInstance.result
                .then(function (offeringToEdit) {
                    // some function
                });
        }
        // #endregion

        // #region Delete Offering Modal Component
        function openDeleteOfferingModal(offeringId) {
            updateType = "Delete";
            vm.offeringId = offeringId;
            var modalInstance = $uibModal.open({
                animation: true,
                component: "deleteOfferingModal",
                resolve: {

                }
            });

            modalInstance.result
                .then(function () {
                    deleteOffering(vm.offeringId);
                });
        }

        function deleteOffering(offeringId) {
            usSpinnerService.spin("spinner-AO");
            offeringDataService.deleteOffering(offeringId)
                .then(function (response) {
                    getOfferingRunningTotal();
                    vm.processFlow = operationFlowService.operationCompletion("Offering Deleted Successfully", true);
                    updateOfferingActivityGrid(updateType, response.data);
                    usSpinnerService.stop("spinner-AO");
                })
                .catch(function (reason) {
                    vm.processFlow = operationFlowService.operationCompletion(reason.message, false);
                });
        }

        // #endregion

        function setDefaults() {
            clearActivity();
            setOfferingActivityPanelDefaults();
            getOfferingRunningTotal();
        }

        function updateOfferingActivityGrid(action, offeringRecord) {
            utilityService.updateObjectArray(action, offeringRecord, vm.offeringActivity, "OfferingId");
            vm.offeringActivityPanelSettings.isOpen = vm.offeringActivity.length > 0 ? true : false;
        }

        // #region Offerings Search
        function getOfferingActivitySearch(searchType, startDate, endDate, familyId, memberId) {
            usSpinnerService.spin("spinner-AO");
            switch (searchType) {
                case "DateRange":
                    offeringDataService.getOfferingActivityByDateRange(startDate, endDate)
                        .then(searchComplete);
                    break;
                default:
                    break;
            }
        }

        function searchComplete(response) {
            vm.noResults = false;
            vm.offeringActivity = response.data;
            usSpinnerService.stop("spinner-AO");
            setOfferingActivityPanelDefaults("2", response.data.length);
            if (response.data.length === 0) {
                vm.noResults = true;
            }
        }

        function resetSearch() {
            vm.noResults = false;
            vm.offeringActivity = [];
        }
        // #endregion

        $scope.$on("reloadAddOfferings", setDefaults);
    }

})();