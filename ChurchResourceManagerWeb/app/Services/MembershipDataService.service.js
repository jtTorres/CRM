(function () {
    "use strict";
    angular.module("app")
        .factory("membershipDataService", membershipDataService);

    membershipDataService.$inject = ["$http", "$q", "utilityService"];

    function membershipDataService($http, $q, utilityService) {

        var allMembership = {
            data: {}
        };

        return {
            getAllMembership: getAllMembership,
            allMembership: allMembership
        };


        function getAllMembership() {
            return $http({
                method: "GET",
                url: "/Home/GetAllMembership/"
            })
                .then(onGetMembershipComplete)
                .catch(onGetMembershipError);
        }

        function onGetMembershipComplete(response) {
            return response;
        }

        function onGetMembershipError(reason) {
            return $q.reject(utilityService.httpError(reason, "Error Getting Membership"));
        }
    }

})();