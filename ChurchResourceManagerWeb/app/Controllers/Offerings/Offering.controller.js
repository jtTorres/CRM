(function () {

    "use strict";

    angular.module("app")
        .controller("offeringController", offeringController);

    offeringController.$inject = ["utilityService", "offeringDataService", "operationFlowService", "entitySelectorService"];

    function offeringController(utilityService, offeringDataService, operationFlowService, entitySelectorService) {
        var vm = this;

        vm.runningTotal = { data: "0" };

        vm.doSaveOffering = doSaveOffering;
        vm.getOfferingActivity = getOfferingActivity;
        vm.getOfferingRunningTotal = getOfferingRunningTotal;
        /////////////////////////////

        activate();
        function activate() {
            setOfferingActivityPanelDefaults();
            getOfferingRunningTotal();
            console.log("Activated Offerings Controller");
        }

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
            //getOfferingActivity(vm.activityType);
        }

        function onSaveError(reason) {
            vm.processFlow = operationFlowService.operationCompletion(reason.message, false);
        }

        function getOfferingActivity(offeringActivityType) {

        }

        function getOfferingRunningTotal() {
            offeringDataService.getRunningTotals(null, entitySelectorService.entityType.Offering)
                .then(function (response) {
                    vm.runningTotal.data = response.data;
                });
        }

        function setOfferingActivityPanelDefaults() {
            vm.offeringActivityPanelSettings = {
                panelHeading: "Today's Offering Activity",
                isOpen: false
            }
        }
    }

})();