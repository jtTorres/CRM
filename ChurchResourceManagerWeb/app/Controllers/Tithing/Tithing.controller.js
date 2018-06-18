(function () {

    "use strict";

    angular.module("app")
        .controller("tithingController", tithingController);

    tithingController.$inject = ["tithingDataService", "membershipDataService", "$uibModal", "titheVars", "utilityService", "operationFlowService"];

    function tithingController(tithingDataService, membershipDataService, $uibModal, titheVars, utilityService, operationFlowService) {

        var vm = this;

        // #region bindable members
        vm.clearActivity = clearActivity;
        vm.doSaveTithe = doSaveTithe;
        vm.getMemberTithes = getMemberTithes;
        vm.getTithesRunningTotal = getTithesRunningTotal;
        vm.openEditTitheModal = openEditTitheModal;
        vm.openDeleteTitheModal = openDeleteTitheModal;
        vm.setActivityByMemberPanelDefaults = setActivityByMemberPanelDefaults;
        // #endregion

        // init logic
        activate();

        function activate() {
            return getAllMembership()
                .then(function () {
                    setActivityByMemberPanelDefaults();
                    getTithesRunningTotal();
                    getTithingActivity();
                    console.log("Activated Tithing Controller");
                });
        }


        function getAllMembership() {
            return membershipDataService.getAllMembership()
                .then(function (response) {
                    membershipDataService.allMembership.data = response.data;
                    vm.allMembership = membershipDataService.allMembership;
                    return vm.allMembership;
                });
        }

        function openEditTitheModal(tithe, index, grid) {

            titheVars.titheToEdit = angular.copy(tithe);
            titheVars.titheToEdit.editIndex = index;
            titheVars.titheToEdit.selectedMember = tithe.MemberKey;

            var modalInstance = $uibModal.open({
                animation: true,
                component: "editTitheModal",
                resolve: {
                    titheToEdit: function () {
                        return titheVars.titheToEdit;
                    },
                    save: {
                        saveTithe: function (titheRecord) {
                            return doSaveTithe(titheRecord);
                        }
                    },
                    addToTotal: {
                        updateTotals: function (titheAmount, titheDate) {
                            return addToTotal(titheAmount, titheDate);
                        }
                    }
                }
            });

            modalInstance.result
                .then(function (titheToEdit) {
                    getMemberTithes(titheToEdit.MemberId);
                    getTithingActivity();
                });
        }

        function getMemberTithes(memberId) {

            tithingDataService.getMemberTithes(memberId, new Date())
                .then(function (response) {
                    titheVars.tithingActivity.data = response.data;
                    vm.activityByMemberPanelSettings.isOpen = true;
                })
                .catch(function (reason) {
                    console.log("Error retrieving Member Tithes");
                });
        }

        function doSaveTithe(titheRecord) {
            if (utilityService.isUndefinedOrNull(titheRecord.TitheId)) {
                return tithingDataService.addTithe(titheRecord)
                    .then(onAddTitheSuccess)
                    .catch(onAddTitheError);
            } else {
                return tithingDataService.updateTithe(titheRecord)
                    .then(onAddTitheSuccess)
                    .catch(onAddTitheError);
            }

        }

        function onAddTitheSuccess(response) {
            vm.processFlow = operationFlowService.operationCompletion("Tithe Added Successfully!", true);
            getTithesRunningTotal();
            getTithingActivity();
        }

        function onAddTitheError(reason) {
            vm.processFlow = operationFlowService.operationCompletion(reason.message, false);
        }

        function clearActivity() {
            titheVars.tithingActivity.data = utilityService.clearObject(titheVars.tithingActivity.data);
        }

        function setActivityByMemberPanelDefaults() {
            vm.activityByMemberPanelSettings = {
                panelHeading: "Member Recent Activity",
                isOpen: false
            };
        }



        // #region Tithes Running Total Component Functions

        function getTithesRunningTotal(date) {
            tithingDataService.getTithesRunningTotal(date)
                .then(function (response) {
                    titheVars.tithesRunningTotal.data = response.data;
                    vm.tithesRunningTotal = titheVars.tithesRunningTotal;
                })
                .catch(function (reason) {
                    console.log("Error getting Tithes Running Total");
                });
        }

        // #endregion

        // #region Delete Tithe Modal Component
        function openDeleteTitheModal(titheId, memberId) {

            titheVars.titheToDelete = {
                TitheId: titheId,
                MemberId: memberId
            };

            var modalInstance = $uibModal.open({
                animation: true,
                component: "deleteTitheModal",
                resolve: {
                }
            });

            modalInstance.result
                .then(function () {
                    deleteTithe();
                });
        }

        function deleteTithe() {
            tithingDataService.deleteTithe(titheVars.titheToDelete.TitheId)
                .then(function (response) {
                    getTithesRunningTotal(new Date());
                    getMemberTithes(titheVars.titheToDelete.MemberId);
                    getTithingActivity();
                    vm.processFlow = operationFlowService.operationCompletion("Tithe Deleted Successfully", true);
                })
                .catch(function (reason) {
                    vm.processFlow = operationFlowService.operationCompletion(reason.message, false);
                });
        }

        // #endregion


        // #region TithingActivityController
        function getTithingActivity() {
            tithingDataService.getTithingActivity()
                .then(function (response) {
                    vm.todaysTithingActivity = response.data;
                })
                .catch(function (reason) {
                    vm.processFlow = utilityService.processCompletion(vm.processFlow, reason.message, false);
                });
        }
        // #endregion
    }

})();