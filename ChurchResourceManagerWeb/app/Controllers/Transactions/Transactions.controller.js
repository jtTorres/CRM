(function () {

    "use strict";
    angular.module("app")
        .controller("transactionsController", transactionsController);

    transactionsController.$inject = ["utilityService", "transactionsDataService", "operationFlowService", "$uibModal", "enumsDataService"];

    function transactionsController(utilityService, transactionsDataService, operationFlowService, $uibModal, enumsDataService) {
        var vm = this;

        vm.doClearForm = doClearForm;
        vm.doSave = doSave;
        vm.enums = {};
        vm.getTransactions = getTransactions;
        vm.openDeleteTransactionModal = openDeleteTransactionModal;
        vm.openEditTransactionModal = openEditTransactionModal;
        vm.transaction = {};
        /////////////////////////

        activate();
        function activate() {
            getEnums();
        }

        function onSaveSuccess(response) {
            vm.processFlow = operationFlowService.operationCompletion("Offering Saved Successfully!", true);
        }

        function onSaveError(reason) {
            vm.processFlow = operationFlowService.operationCompletion(reason.message, false);
        }

        function doSave(transaction) {
            getDropdownSelection(transaction);

            if (utilityService.isUndefinedOrNull(transaction.TransactionId)) {
                return transactionsDataService.submitTransaction(transaction)
                    .then(onSaveSuccess)
                    .catch(onSaveError);
            } else {
                return transactionsDataService.updateTransaction(transaction)
                    .then(onSaveSuccess)
                    .catch(onSaveError);
            }
        }

        function doClearForm(form) {
            vm.transaction = utilityService.clearObject(vm.transaction);
            operationFlowService.resetForm(form);
        }

        function getDropdownSelection(transaction) {
            transaction.TransactionTypeId = transaction.SelectedTransactionType.Id;
            transaction.PaymentAccountId = transaction.SelectedPaymentAccount.PaymentAccountId;
        }

        // #region Transactions Search
        function getTransactions() {
            transactionsDataService.getTransactions()
                .then(function (response) {
                    vm.transactions = response.data;
                });
        }
        // #endregion

        // #region shared functions
        function getTransactionToEdit(transactionId) {
            return transactionsDataService.getTransaction(transactionId)
                .then(function (response) {
                    vm.transaction = response.data;
                })
                .catch(onSaveError);
        }

        function getEnums() {
            enumsDataService.getTransactionTypes()
                .then(function (response) {
                    vm.enums.TransactionTypes = response.data;
                });
            enumsDataService.getPaymentAccounts()
                .then(function (response) {
                    vm.enums.PaymentAccounts = response.data;
                });
        }
        // #endregion

        // #region Edit Transactions Modal
        function openEditTransactionModal(transaction) {

            getTransactionToEdit(transaction.TransactionId)
                .then(function () {

                    var modalInstance = $uibModal.open({
                        animation: true,
                        component: "editTransactionModal",
                        //windowClass: "edit-membership-modal",
                        resolve: {
                            transactionToEdit: function () {
                                return vm.transaction;
                            },
                            enums: function () {
                                return vm.enums;
                            },
                            doSave: {
                                save: function (transaction) {
                                    return doSave(transaction);
                                }
                            }
                        }
                    });

                    modalInstance.result
                        .then(function (stuff) {
                            getTransactions();
                        })
                        .catch(function (reason) { //this will run if the user clicks out of the modal without click x button
                            getTransactions();
                        });
                });
        }
        // #endregion

        // #region Delete Transaction Modal Component
        function openDeleteTransactionModal(transactionId) {
            var modalInstance = $uibModal.open({
                animation: true,
                component: "deleteTransactionModal",
                resolve: {
                    transactionToDelete: function () {
                        return transactionId;
                    },
                    doDelete: {
                        delete: function (transactionId) {
                            return deleteTransaction(transactionId);
                        }
                    }
                }
            });

            modalInstance.result
                .then(function () {
                    getTransactions();
                });
        }

        function deleteTransaction(transactionId) {
            //TODO: ADD RETURN TO THIS
            return transactionsDataService.deleteTransaction(transactionId)
                .then(function () {
                    vm.processFlow = operationFlowService.operationCompletion("Transaction Deleted Successfully", true);
                })
                .catch(function (reason) {
                    vm.processFlow = operationFlowService.operationCompletion(reason.message, false);
                });
        }

        // #endregion

        //$scope.$on("reloadSubmitTransactions", doClearForm);

    }

})();