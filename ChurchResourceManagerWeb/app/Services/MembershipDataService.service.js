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
            addContactInfo: addContactInfo,
            addMembership: addMembership,
            addLocation: addLocation,
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

        function addLocation(location) {
            return $http({
                method: "POST",
                url: "/Membership/AddLocation/",
                data: {
                    location: location
                }
            })
                .then(onAddLocationSuccess)
                .catch(onAddLocationError);
        }

        function onAddLocationSuccess(response) {
            return response;
        }

        function onAddLocationError(reason) {
            return $q.reject(utilityService.httpError(reason, "Error Adding Address Information"));
        }

        function addContactInfo(contactInfo) {
            return $http({
                method: "POST",
                url: "/Membership/AddContactInfo/",
                data: {
                    contactInfo: contactInfo
                }
            })
                .then(onAddContactInfoSuccess)
                .catch(onAddContactInfoError);
        }

        function onAddContactInfoSuccess(response) {
            return response;
        }

        function onAddContactInfoError(reason) {
            return $q.reject(utilityService.httpError(reason, "Error Adding Contact Information"));
        }
    }

})();