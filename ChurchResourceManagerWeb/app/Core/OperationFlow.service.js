(function () {

    "use strict";

    angular.module("app")
        .factory("operationFlowService", operationFlowService);

    operationFlowService.$inject = [];

    function operationFlowService() {

        var operationFlow = {};

        return {
            operationFlow: operationFlow,
            operationCompletion: operationCompletion,
            setupDefaults: setupDefaults
        };

        function setupDefaults() {
            operationFlow = {
                error: undefined,
                success: undefined,
                errorMessage: {},
                successMessage: {},
                infoMessage: {}
            }
        }

        function operationCompletion(processVar, message, isSuccess) {
            if (isSuccess) {
                processVar.success = true;
                processVar.successMessage = message;
            } else {
                processVar.error = true;
                processVar.errorMessage = message;
            }
            return processVar;
        }
    }

})();