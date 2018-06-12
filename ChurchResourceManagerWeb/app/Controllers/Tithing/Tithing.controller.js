﻿(function () {

    "use strict";

    angular.module("app")
        .controller("tithingController", tithingController);

    tithingController.$inject = ["tithingDataService", "membershipDataService", "$uibModal", "titheVars", "utilityService", "operationFlowService"];

    function tithingController(tithingDataService, membershipDataService, $uibModal, titheVars, utilityService, operationFlowService) {

        var vm = this;

        // #region bindable members
        vm.doSaveTithe = doSaveTithe;
        vm.getMemberTithes = getMemberTithes;
        vm.openEditTitheModal = openEditTitheModal;
        // #endregion

        // init logic
        activate();

        function activate() {
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
                    titheToEdit: function () { return titheVars.titheToEdit; }
                }
            });

            modalInstance.result
                .then(function (titheToEdit) {
                    // some function will be called to splice the tithe record
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
            operationFlowService.setupDefaults();
            
            if (utilityService.isUndefinedOrNull(titheRecord.TitheId)) {
                return tithingDataService.addTithe(titheRecord)
                    .then(onAddTitheSuccess)
                    .catch(onAddTitheError);
            } else {
                return tithingDataService.updateTithe(titheRecord)
                    .then(function (response) {

                        //tithingDataService.updateTitheGrids(grid, 1, tithe);

                        //closeEditTitheModal();
                        //getTithesRunningTotal(new Date());
                        //vm.processFlow = utilityService.processCompletion(vm.processFlow, "Tithe Updated Successfully!", true);
                    })
                    .catch(function (reason) {
                        //vm.processFlow = utilityService.processCompletion(vm.processFlow, reason.message, false);
                    });
            }
            
        }

        function onAddTitheSuccess(response) {
            vm.processFlow = operationFlowService.operationCompletion(operationFlowService.operationFlow, "Tithe Added Successfully!", true);
            vm.activityByMemberPanelSettings.isOpen = false;
        }

        function onAddTitheError(reason) {
            vm.processFlow = operationFlowService.operationCompletion(operationFlowService.operationFlow, reason.message, false);
        }

        vm.activityByMemberPanelSettings = {
            panelHeading: "Member Recent Activity",
            isOpen: false
        };

    }

})();