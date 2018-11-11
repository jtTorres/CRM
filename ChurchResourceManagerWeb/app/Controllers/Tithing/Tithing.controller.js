(function () {

    "use strict";

    angular.module("app")
        .controller("tithingController", tithingController);

    tithingController.$inject = ["tithingDataService", "membershipDataService", "$uibModal", "titheVars", "utilityService", "operationFlowService", "$scope", "usSpinnerService"];

    function tithingController(tithingDataService, membershipDataService, $uibModal, titheVars, utilityService, operationFlowService, $scope, usSpinnerService) {

        var vm = this;

        // #region bindable members
        vm.clearActivity = clearActivity;
        vm.doSaveTithe = doSaveTithe;
        vm.deleteTithe = deleteTithe;
        vm.getMemberTithes = getMemberTithes;
        vm.getTithingActivity = getTithingActivity;
        vm.getTithesRunningTotal = getTithesRunningTotal;
        vm.openEditTitheModal = openEditTitheModal;
        vm.openDeleteTitheModal = openDeleteTitheModal;
        vm.setActivityByMemberPanelDefaults = setActivityByMemberPanelDefaults;
        vm.setTithingActivityPanelDefaults = setTithingActivityPanelDefaults;
        // #endregion

        // init logic
        activate();

        function activate() {
            setDefaults();
            return getAllMembership()
                .then(function () {
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
            usSpinnerService.spin("spinner-1");
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
            usSpinnerService.stop("spinner-1");
            vm.processFlow = operationFlowService.operationCompletion("Tithe Saved Successfully!", true);
            getTithesRunningTotal();
            getTithingActivity(vm.tithingActivityType);
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

        function setTithingActivityPanelDefaults() {
            vm.tithingActivityPanelSettings = {
                panelHeading: "Tithing Activity",
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
                    getTithingActivity(vm.tithingActivityType);
                    vm.processFlow = operationFlowService.operationCompletion("Tithe Deleted Successfully", true);
                })
                .catch(function (reason) {
                    vm.processFlow = operationFlowService.operationCompletion(reason.message, false);
                });
        }

        // #endregion


        // #region TithingActivity
        function getTithingActivity(tithingActivityType) {
            usSpinnerService.spin("spinner-1");
            vm.tithingActivityType = tithingActivityType;

            getTithingActivityByType(tithingActivityType)
                .then(function (response) {
                    usSpinnerService.stop("spinner-1");
                    vm.tithingActivity = response.data;
                    updateTithingActivityPanelHeader(tithingActivityType, response.data.length);
                })
                .catch(function (reason) {
                    vm.processFlow = utilityService.processCompletion(vm.processFlow, reason.message, false);
                });
        }

        function getTithingActivityByType() {
            switch (vm.tithingActivityType) {
                case "today":
                    return tithingDataService.getTodaysTithingActivity();
                case "all":
                    return tithingDataService.getTithingActivity();
                default:
                    return null;
            }
        }

        function updateTithingActivityPanelHeader(tithingActivityType, recordCount) {
            switch (tithingActivityType) {
                case "today":
                    vm.tithingActivityPanelSettings.panelHeading = "Today's Tithing Activity";
                    break;
                case "all":
                    vm.tithingActivityPanelSettings.panelHeading = "Tithing Activity";
                    break;
                default:
                    break;
            }
            vm.tithingActivityPanelSettings.isOpen = recordCount > 0 ? true : false;
        }

        // #endregion

        function setDefaults() {
            clearActivity();
            setActivityByMemberPanelDefaults();
            setTithingActivityPanelDefaults();
            getTithesRunningTotal();
        }

        $scope.$on("reloadAddTithes", setDefaults);
    }

})();