(function () {
    "use strict";

    angular.module("app")
        .factory("taxLetterDataService", taxLetterDataService);

    taxLetterDataService.$inject = ["$q", "$http", "operationFlowService"];

    function taxLetterDataService($q, $http, operationFlowService) {

        return {
            generateTaxLetters: generateTaxLetters,
            getMemberGiving: getMemberGiving
        };

        function getMemberGiving(memberId, startDate, endDate) {
            return $http({
                method: "GET",
                url: "/Reporting/GetMemberGiving/",
                params: {
                    memberId: memberId,
                    startDate: startDate,
                    endDate: endDate
                }
            })
                .then(onGetMemberGivingSuccess)
                .catch(onGetMemberGivingError);
        }

        function onGetMemberGivingSuccess(response) {
            return response;
        }

        function onGetMemberGivingError(reason) {
            operationFlowService.displayErrorBanner("Error Getting Member Tithes");
            return $q.reject();
        }

        function generateTaxLetters(html) {
            return $http({
                method: "POST",
                url: "/Reporting/ExportTaxLetterPdf/",
                data: {
                    html: html
                },
                responseType: "arraybuffer"
            })
                .then(onGenerateTaxLettersSuccess)
                .catch(onGenerateTaxLettersError);
        }

        function onGenerateTaxLettersSuccess(response) {
            return response;
        }

        function onGenerateTaxLettersError(reason) {
            operationFlowService.displayErrorBanner("Error Generating Tax Letters");
            return $q.reject();
        }
    }


})();