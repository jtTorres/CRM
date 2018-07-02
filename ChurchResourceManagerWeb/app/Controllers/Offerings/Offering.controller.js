(function () {

    "use strict";

    angular.module("app")
        .controller("offeringController", offeringController);

    offeringController.$inject = ["utilityService", "offeringDataService", "operationFlowService", "entitySelectorService", "activitySelectorService", "$uibModal"];

    function offeringController(utilityService, offeringDataService, operationFlowService, entitySelectorService, activitySelectorService, $uibModal) {
        var vm = this;

        vm.activityType = activitySelectorService.activityReportType;
        vm.runningTotal = { data: "0" };
        vm.offeringId = {};

        vm.doSaveOffering = doSaveOffering;
        vm.getOfferingActivity = getOfferingActivity;
        vm.getOfferingRunningTotal = getOfferingRunningTotal;
        vm.openDeleteOfferingModal = openDeleteOfferingModal;
        vm.openEditOfferingModal = openEditOfferingModal;
        /////////////////////////////

        activate();
        function activate() {
            setOfferingActivityPanelDefaults();
            getOfferingRunningTotal();
            console.log("Activated Offerings Controller");
        }

        // #region Add Tithes Component

        function doSaveOffering(offeringRecord) {
            if (utilityService.isUndefinedOrNull(offeringRecord.OfferingId)) {
                return offeringDataService.addOffering(offeringRecord)
                    .then(onSaveSuccess)
                    .catch(onSaveError);
            } else {
                return offeringDataService.updateOffering(offeringRecord)
                    .then(onSaveSuccess)
                    .catch(onSaveError);
            }
        }

        function onSaveSuccess(response) {
            vm.processFlow = operationFlowService.operationCompletion("Offering Saved Successfully!", true);
            getOfferingRunningTotal();
            getOfferingActivity(vm.activityType);
            clearActivity();
        }

        function onSaveError(reason) {
            vm.processFlow = operationFlowService.operationCompletion(reason.message, false);
        }

        function clearActivity() {
            vm.offeringActivity.data = utilityService.clearObject(vm.offeringActivity.data);
        }

        // #endregion

        // #region Offering Activity Component

        function getOfferingActivity(activityType) {

            vm.activityType = activityType;

            offeringDataService.getActivity(activityType)
                .then(function (response) {
                    vm.offeringActivity = response.data;
                    if (response.data.length > 0)
                        vm.offeringActivityPanelSettings.isOpen = true;
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

        function setOfferingActivityPanelDefaults() {
            vm.offeringActivityPanelSettings = {
                panelHeading: "Today's Offering Activity",
                isOpen: false
            }
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
            offeringDataService.deleteOffering(offeringId)
                .then(function () {
                    getOfferingRunningTotal();
                    getOfferingActivity(vm.activityType);
                    vm.processFlow = operationFlowService.operationCompletion("Offering Deleted Successfully", true);
                })
                .catch(function (reason) {
                    vm.processFlow = operationFlowService.operationCompletion(reason.message, false);
                });
        }

        // #endregion
    }

})();