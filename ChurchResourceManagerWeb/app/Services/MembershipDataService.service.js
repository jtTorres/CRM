(function () {
    "use strict";
    angular.module("app")
        .factory("membershipDataService", membershipDataService);

    membershipDataService.$inject = ["$http", "$q", "utilityService", "stateList", "operationFlowService"];

    function membershipDataService($http, $q, utilityService, stateList, operationFlowService) {

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
            getMembershipByDateOfBirth: getMembershipByDateOfBirth,
            getMembershipByExitDate: getMembershipByExitDate,
            getMembershipByFamilyId: getMembershipByFamilyId,
            getMembershipByMembershipDate: getMembershipByMembershipDate,
            getMembershipByMemberId: getMembershipByMemberId,
            getMemberCount: getMemberCount,
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
            operationFlowService.displayErrorBanner("Error Getting Membership");
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
            operationFlowService.displayErrorBanner("Error Getting Membership");
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
            operationFlowService.displayErrorBanner("Error Getting Member Info");
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
            operationFlowService.displayErrorBanner("Error Adding Family");
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
            operationFlowService.displayErrorBanner("Error Adding Address Information");
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
            operationFlowService.displayErrorBanner("Error Adding Contact Information");
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
            operationFlowService.displayErrorBanner("Error Getting Member Information");
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
            operationFlowService.displayErrorBanner("Error Getting Member Information");
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
            operationFlowService.displayErrorBanner("Error Saving Family");
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
            operationFlowService.displayErrorBanner("Error Saving Address");
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
            operationFlowService.displayErrorBanner("Error Saving Membership");
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
            operationFlowService.displayErrorBanner("Error Saving Contact Information");
            return $q.reject(utilityService.httpError(reason, "Error Saving Contact Information"));
        }

        function getMemberCount() {
            return $http({
                method: "GET",
                url: "/Dashboard/GetMemberCount/"
            })
                .then(onGetMemberCountSuccess)
                .catch(onGetMemberError);
        }

        function onGetMemberCountSuccess(response) {
            return response;
        }

        function onGetMemberError(reason) {
            operationFlowService.operationCompletion("Error Getting Member Counts", false);
            return $q.reject(utilityService.httpError(reason, "Error Getting Member Counts"));
        }

        function getMembershipByFamilyId(familyId) {
            return $http({
                method: "GET",
                url: "/Membership/GetMembershipByFamilyId/",
                params: {
                    familyId: familyId
                }
            })
                .then(onGetMembershipByFamilyIdSuccess)
                .catch(onGetMembershipByFamilyIdError);
        }

        function onGetMembershipByFamilyIdSuccess(response) {
            return response;
        }

        function onGetMembershipByFamilyIdError(reason) {
            operationFlowService.displayErrorBanner("Error Getting Membership");
            return $q.reject(utilityService.httpError(reason, "Error Getting Membership"));
        }

        function getMembershipByMemberId(memberId) {
            return $http({
                method: "GET",
                url: "/Membership/GetMembershipByMemberId/",
                params: {
                    memberId: memberId
                }
            })
                .then(onGetMembershipByMemberIdSuccess)
                .catch(onGetMembershipByMemberIdError);
        }

        function onGetMembershipByMemberIdSuccess(response) {
            return response;
        }

        function onGetMembershipByMemberIdError(reason) {
            operationFlowService.displayErrorBanner("Error Getting Membership");
            return $q.reject(utilityService.httpError(reason, "Error Getting Membership"));
        }

        function getMembershipByExitDate(startDate, endDate) {
            return $http({
                method: "GET",
                url: "/Membership/GetMembershipByExitDate/",
                params: {
                    startDate: startDate,
                    endDate: endDate
                }
            })
                .then(onGetMembershipByExitDateSuccess)
                .catch(onGetMembershipByExitDateError);
        }

        function onGetMembershipByExitDateSuccess(response) {
            return response;
        }

        function onGetMembershipByExitDateError(reason) {
            operationFlowService.displayErrorBanner("Error Getting Membership");
            return $q.reject(utilityService.httpError(reason, "Error Getting Membership"));
        }

        function getMembershipByDateOfBirth(startDate, endDate) {
            return $http({
                method: "GET",
                url: "/Membership/GetMembershipByDateOfBirth/",
                params: {
                    startDate: startDate,
                    endDate: endDate
                }
            })
                .then(onGetMembershipByDateOfBirthSuccess)
                .catch(onGetMembershipByDateOfBirthError);
        }

        function onGetMembershipByDateOfBirthSuccess(response) {
            return response;
        }

        function onGetMembershipByDateOfBirthError(reason) {
            operationFlowService.displayErrorBanner("Error Getting Membership");
            return $q.reject(utilityService.httpError(reason, "Error Getting Membership"));
        }

        function getMembershipByMembershipDate(startDate, endDate) {
            return $http({
                method: "GET",
                url: "/Membership/GetMembershipByMembershipDate/",
                params: {
                    startDate: startDate,
                    endDate: endDate
                }
            })
                .then(onGetMembershipByMembershipDateSuccess)
                .catch(onGetMembershipByMembershipDateError);
        }

        function onGetMembershipByMembershipDateSuccess(response) {
            return response;
        }

        function onGetMembershipByMembershipDateError(reason) {
            operationFlowService.displayErrorBanner("Error Getting Membership");
            return $q.reject(utilityService.httpError(reason, "Error Getting Membership"));
        }
    }

})();