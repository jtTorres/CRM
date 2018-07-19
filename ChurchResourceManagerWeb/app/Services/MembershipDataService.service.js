(function () {
    "use strict";
    angular.module("app")
        .factory("membershipDataService", membershipDataService);

    membershipDataService.$inject = ["$http", "$q", "utilityService", "stateList"];

    function membershipDataService($http, $q, utilityService, stateList) {

        var allMembership = {
            data: {}
        };

        return {
            addFamily: addFamily,
            addMembership: addMembership,
            getAllMembership: getAllMembership,
            allMembership: allMembership,
            getStateList: getStateList,
            getEmptyMemberInfo: getEmptyMemberInfo
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

        function getStateList() {
            return stateList;
        }

        function addMembership(membershipRecord) {
            return $http({
                method: "POST",
                url: "/Membership/AddMembershipRecord/",
                data: {
                    membershipRecord: membershipRecord
                }
            })
                .then(onAddMembershipComplete)
                .catch(onAddMembershipError);
        }

        function onAddMembershipComplete(response) {
            return response;
        }

        function onAddMembershipError(reason) {
            return $q.reject(utilityService.httpError(reason, "Error Getting Membership"));
        }

        function getEmptyMemberInfo() {
            return $http({
                method: "GET",
                url: "/Membership/GetEmptyMemberInfo/"
            })
                .then(onGetEmptyMemberInfoSuccess)
                .catch(onGetEmptyMemberInfoError);
        }

        function onGetEmptyMemberInfoSuccess(response) {
            return response;
        }

        function onGetEmptyMemberInfoError(reason) {
            return $q.reject(utilityService.httpError(reason, "Error Getting Member Info"));
        }

        function addFamily(family) {
            return $http({
                method: "POST",
                url: "/Membership/AddFamily/",
                data: {
                    family: family
                }
            })
                .then(onAddFamilySuccess)
                .catch(onAddFamilyError);
        }

        function onAddFamilySuccess(response) {
            return response;
        }

        function onAddFamilyError(reason) {
            return $q.reject(utilityService.httpError(reason, "Error Adding Family"));
        }
    }

})();