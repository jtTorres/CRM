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
            allMembership: allMembership,
            editMembership: editMembership,
            getAllMembership: getAllMembership,
            getStateList: getStateList,
            getEmptyMemberInfo: getEmptyMemberInfo,
            getMemberSearch: getMemberSearch,
            updateFamily: updateFamily,
            updateAddress: updateAddress,
            updateMembership: updateMembership,
            updateContactInfo: updateContactInfo
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

        function getMemberSearch() {
            return $http({
                method: "GET",
                url: "/Membership/GetMemberSearch/"
            })
                .then(onGetMemberSearchSuccess)
                .catch(onGetMemberSearchError);
        }

        function onGetMemberSearchSuccess(response) {
            return response;
        }

        function onGetMemberSearchError(reason) {
            return $q.reject(utilityService.httpError(reason, "Error Getting Member Information"));
        }

        function editMembership(familyId) {
            return $http({
                method: "GET",
                url: "/Membership/EditMembershipInfo/",
                params: {
                    familyId: familyId
                }
            })
                .then(onEditMembershipSuccess)
                .catch(onEditMembershipError);
        }

        function onEditMembershipSuccess(response) {
            return response;
        }

        function onEditMembershipError(reason) {
            return $q.reject(utilityService.httpError(reason, "Error Getting Member Information"));
        }

        function updateFamily(family) {
            return $http({
                method: "POST",
                url: "/Membership/UpdateFamily/",
                data: {
                    family: family
                }
            })
                .then(onUpdateFamilySuccess)
                .catch(onUpdateFamilyError);
        }

        function onUpdateFamilySuccess(response) {
            return response;
        }

        function onUpdateFamilyError(reason) {
            return $q.reject(utilityService.httpError(reason, "Error Saving Family"));
        }

        function updateAddress(location) {
            return $http({
                method: "POST",
                url: "/Membership/UpdateAddress/",
                data: {
                    location: location
                }
            })
                .then(onUpdateAddressSuccess)
                .catch(onUpdateAddressError);
        }

        function onUpdateAddressSuccess(response) {
            return response;
        }

        function onUpdateAddressError(reason) {
            return $q.reject(utilityService.httpError(reason, "Error Saving Address"));
        }

        function updateMembership(membership) {
            return $http({
                    method: "POST",
                    url: "/Membership/UpdateMembership/",
                    data: {
                        membership: membership
                    }
                })
                .then(onUpdateMembershipSuccess)
                .catch(onUpdateMembershipError);
        }

        function onUpdateMembershipSuccess(response) {
            return response;
        }

        function onUpdateMembershipError(reason) {
            return $q.reject(utilityService.httpError(reason, "Error Saving Membership"));
        }

        function updateContactInfo(contactInfo) {
            return $http({
                    method: "POST",
                    url: "/Membership/UpdateContactInfo/",
                    data: {
                        contactInfo: contactInfo
                    }
                })
                .then(onUpdateContactInfoSuccess)
                .catch(onUpdateContactInfoError);
        }

        function onUpdateContactInfoSuccess(response) {
            return response;
        }

        function onUpdateContactInfoError(reason) {
            return $q.reject(utilityService.httpError(reason, "Error Saving Contact Information"));
        }
    }

})();