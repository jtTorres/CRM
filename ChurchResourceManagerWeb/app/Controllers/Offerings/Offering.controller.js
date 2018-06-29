(function () {

    "use strict";

    angular.module("app")
        .controller("offeringController", offeringController);

    offeringController.$inject = ["utilityService", "offeringDataService", "operationFlowService"];

    function offeringController(utilityService, offeringDataService, operationFlowService) {
        var vm = this;

        vm.runningTotal = { data: "0" };

        vm.doSaveOffering = doSaveOffering;
        vm.getOfferingActivity = getOfferingActivity;
        /////////////////////////////

        activate();
        function activate() {
            setOfferingActivityPanelDefaults();
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
            //getOfferingRunningTotal();
            //getOfferingActivity(vm.activityType);
        }

        function onSaveError(reason) {
            vm.processFlow = operationFlowService.operationCompletion(reason.message, false);
        }

        function getOfferingActivity(offeringActivityType) {

        }

        function setOfferingActivityPanelDefaults() {
            vm.offeringActivityPanelSettings = {
                panelHeading: "Today's Offering Activity",
                isOpen: false
            }
        }
    }

})();