(function () {

    "use strict";
    angular.module("app")
        .controller("transactionsController", transactionsController);

    transactionsController.$inject = ["utilityService", "transactionsDataService", "operationFlowService", "$uibModal", "enumsDataService", "usSpinnerService"];

    function transactionsController(utilityService, transactionsDataService, operationFlowService, $uibModal, enumsDataService, usSpinnerService) {
        var vm = this;

        vm.doClearForm = doClearForm;
        vm.doSave = doSave;
        vm.enums = {};
        vm.getTransactions = getTransactions;
        vm.getTransactionsSearch = getTransactionsSearch;
        vm.openDeleteTransactionModal = openDeleteTransactionModal;
        vm.openEditTransactionModal = openEditTransactionModal;
        vm.resetSearch = resetSearch;
        vm.transaction = {};
        /////////////////////////

        var updateType = "";

        activate();
        function activate() {
            getEnums();
        }

        function onSaveSuccess(response) {
            updateTransactionsGrid(updateType, response.data);
            vm.processFlow = operationFlowService.operationCompletion("Transaction Saved Successfully!", true);
            doClearForm();
            usSpinnerService.stop();
        }

        function onSaveError(reason) {
            usSpinnerService.stop();
            return;
        }

        function doSave(transaction) {
            usSpinnerService.spin();
            getDropdownSelection(transaction);

            if (utilityService.isUndefinedOrNull(transaction.TransactionId)) {
                updateType = "Insert";
                return transactionsDataService.submitTransaction(transaction)
                    .then(onSaveSuccess)
                    .catch(onSaveError);
            } else {
                updateType = "Update";
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
            usSpinnerService.spin("spinner-4");
            transactionsDataService.getTransactions()
                .then(function (response) {
                    usSpinnerService.stop("spinner-4");
                    vm.transactions = response.data;
                });
        }
        // #endregion

        // #region shared functions
        function getTransactionToEdit(transactionId) {
            usSpinnerService.spin();
            return transactionsDataService.getTransaction(transactionId)
                .then(function (response) {
                    vm.transaction = response.data;
                    usSpinnerService.stop();
                })
                .catch(onSaveError);
        }

        function getEnums() {
            usSpinnerService.spin();
            enumsDataService.getTransactionTypes()
                .then(function (response) {
                    vm.enums.TransactionTypes = response.data;
                    usSpinnerService.stop();
                });
            enumsDataService.getPaymentAccounts()
                .then(function (response) {
                    vm.enums.PaymentAccounts = response.data;
                    usSpinnerService.stop();
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
                            //getTransactions();
                        })
                        .catch(function (reason) { //this will run if the user clicks out of the modal without click x button
                            //getTransactions();
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
                    //getTransactions();
                });
        }

        function deleteTransaction(transactionId) {
            //TODO: ADD RETURN TO THIS
            updateType = "Delete";
            usSpinnerService.spin();
            return transactionsDataService.deleteTransaction(transactionId)
                .then(function (response) {
                    updateTransactionsGrid(updateType, response.data);
                    usSpinnerService.stop();
                    vm.processFlow = operationFlowService.operationCompletion("Transaction Deleted Successfully", true);
                })
                .catch(function (reason) {
                    usSpinnerService.stop();
                });
        }

        // #endregion

        function updateTransactionsGrid(action, transactionRecord) {
            if (utilityService.isUndefinedOrNull(vm.transactions)) return;
            utilityService.updateObjectArray(action, transactionRecord, vm.transactions, "TransactionId");
        }

        // #region Transactions Search
        function getTransactionsSearch(searchType, startDate, endDate, familyId, memberId) {
            usSpinnerService.spin("spinner-ST");
            switch (searchType) {
                case "TransactionDate":
                    transactionsDataService.getTransactionsByTransactionDate(startDate, endDate)
                        .then(searchComplete);
                    break;
                case "BankPostedDate":
                    transactionsDataService.getTransactionsByBankPostedDate(startDate, endDate)
                        .then(searchComplete);
                    break;
                default:
                    break;
            }
        }

        function searchComplete(response) {
            usSpinnerService.stop("spinner-ST");
            vm.noResults = false;
            vm.transactions = response.data;
            if (response.data.length === 0) {
                vm.noResults = true;
            }
        }

        function resetSearch() {
            vm.transactions = [];
            vm.noResults = false;
        }
        // #endregion

        //$scope.$on("reloadSubmitTransactions", doClearForm);

    }

})();