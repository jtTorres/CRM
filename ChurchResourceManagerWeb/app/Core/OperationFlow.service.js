﻿(function () {

    "use strict";

    angular.module("app")
        .factory("operationFlowService", operationFlowService);

    operationFlowService.$inject = ["$rootScope"];

    function operationFlowService($rootScope) {

        setupDefaults();

        return {
            operationCompletion: operationCompletion,
            setupDefaults: setupDefaults,
            isFormValid: isFormValid,
            resetForm: resetForm,
            locationCheck: locationCheck,
            displayErrorBanner: displayErrorBanner
        };

        function setupDefaults() {
            // TODO: Try to find a way to make the banner have a padding so it doesn't show all the way at the top
            toastr.options = { "positionClass": "toast-top-full-width" };
        }

        function operationCompletion(message, isSuccess) {
            if (isSuccess) {
                toastr.success(message);

            } else {
                toastr.error(message);
            }
        }

        function isFormValid(form) {
            if (form.$invalid) {
                operationCompletion("Please correct the errors highlighted below", false);
                return false;
            }
            return true;

        }

        function resetForm(form) {
            if (form) {
                form.$setPristine();
                form.$setUntouched();
            }
        }

        function locationCheck(path, broadcast) {
            if (location.pathname === path)
                $rootScope.$broadcast(broadcast);
        }

        function displayErrorBanner(message) {
            operationCompletion(message, false);
        }
    }

})();