(function () {

    "use strict";

    angular.module("app")
        //register the service with angular
        .factory("utilityService", utilityService);

    utilityService.$inject = ["$anchorScroll", "$location", "$window"];

    function utilityService($anchorScroll, $location, $window) {


        return {
            httpError: httpError,
            processCompletion: processCompletion,
            clearObject: clearObject,
            isUndefinedOrNull: isUndefinedOrNull,
            openModal: openModal,
            closeModal: closeModal,
            updateArray: updateArray, // I think this is old
            deleteArray: deleteArray, // I think this is old
            getArrayIndexOf: getArrayIndexOf,
            scrollTop: scrollTop,
            setFocus: setFocus,
            updateObjectArray: updateObjectArray
        };

        function httpError(reason, errorMessage) {
            var error = {
                message: errorMessage,
                reason: reason
            };

            return error;
        }

        function processCompletion(processVar, message, isSuccess) {
            if (isSuccess) {
                processVar.success = true;
                processVar.successMessage = message;
            } else {
                processVar.error = true;
                processVar.errorMessage = message;
            }
            return processVar;
        }

        function clearObject(objectPassed) {

            objectPassed = {};
            return objectPassed;
        }

        function isUndefinedOrNull(value) {
            return angular.isUndefined(value) || value === null;
        }

        function openModal(id) {
            $(`#${id}`).modal("show");
        }

        function closeModal(id) {
            $(`#${id}`).modal("hide");
        }

        function getArrayIndexOf(array, objectToFind, objProperty) {
            var index = -1;

            if (Array.isArray(array))
                index = array.map(t => t[objProperty]).indexOf(objectToFind[objProperty]);

            return index;
        }

        function updateArray(array, objectToFind, objProperty, deleteCount) {
            deleteCount = getArrayDeleteCount(deleteCount);

            var index = getArrayIndexOf(array, objectToFind, objProperty);
            if (index > -1)
                array.splice(index, deleteCount, objectToFind);
        }

        function deleteArray(array, objectToFind, objProperty, deleteCount) {
            deleteCount = getArrayDeleteCount(deleteCount);

            var index = getArrayIndexOf(array, objectToFind, objProperty);
            if (index > -1)
                array.splice(index, deleteCount);
        }

        function getArrayDeleteCount(deleteCount) {
            return isUndefinedOrNull(deleteCount) ? 1 : deleteCount;
        }

        function scrollTop(location) {
            $location.hash(location);
            $anchorScroll();
        }

        function setFocus(elementId) {
            $window.document.getElementById(elementId).focus();
        }

        function updateObjectArray(action, objectRecord, objectToUpdate, objectProperty) {
            var index = -1;
            switch (action) {
            case "Insert":
                    objectToUpdate.splice(0, 0, objectRecord);
                break;
            case "Update":
                    index = objectToUpdate.findIndex(x => x[objectProperty] === objectRecord[objectProperty]);
                    objectToUpdate.splice(index, 1, objectRecord);
                break;
            case "Delete":
                    index = objectToUpdate.findIndex(x => x[objectProperty] === objectRecord);
                objectToUpdate.splice(index, 1);
                break;
            default:
                break;
            }
        }
    }

})();