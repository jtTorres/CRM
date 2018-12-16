using ChurchResourceManagerWeb.Models;
using System;
using System.Web.Mvc;

namespace ChurchResourceManagerWeb.Controllers
{
    [AllowAnonymous]
    public class TransactionsController : BaseController
    {

        public ActionResult SubmitTransactions()
        {
            return View();
        }

        public ActionResult TransactionsSearch()
        {
            return View();
        }

        #region PartialViews for Components

        public ActionResult SubmitTransaction()
        {
            return PartialView("_submitTransaction");
        }

        public ActionResult TransactionsGrid()
        {
            return PartialView("_transactionsGrid");
        }

        public ActionResult EditTransaction()
        {
            return PartialView("_editTransactionModal");
        }

        public ActionResult DeleteTransactionModal()
        {
            return PartialView("_deleteTransactionModal");
        }
        #endregion

        [HttpPost]
        public JsonResult SubmitATransaction(TransactionsViewModel transaction)
        {
            try
            {
                return Json(Repo.SubmitTransaction(transaction), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
                throw;
            }
        }

        [HttpGet]
        public JsonResult GetTransactions()
        {
            try
            {
                return Json(Repo.GetTransactions(), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
                throw;
            }
        }

        [HttpGet]
        public JsonResult GetTransaction(int transactionId)
        {
            try
            {
                return Json(Repo.GetTransactionByIdViewModel(transactionId), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
                throw;
            }
        }

        [HttpPost]
        public JsonResult UpdateTransaction(TransactionsViewModel transaction)
        {
            try
            {
                return Json(Repo.UpdateTransaction(transaction), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
                throw;
            }
        }

        [HttpPost]
        public JsonResult DeleteTransaction(int transactionId)
        {
            try
            {
                return Json(Repo.DeleteTransaction(transactionId), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
                throw;
            }
        }

        [HttpGet]
        public JsonResult GetRunningTotals(DateTime date, TransactionInquiryTypes.InquiryType inquiryType)
        {
            try
            {
                return Json(Repo.GetTransactionRunningTotal(Utilities.ShortDateString(date), inquiryType), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
                throw;
            }
        }

        [HttpGet]
        public JsonResult GetTransactionsByTransactionDate(DateTime startDate, DateTime endDate)
        {
            try
            {
                return Json(Repo.GetTransactionsByTransactionDate(startDate, endDate), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
                throw;
            }
        }

        [HttpGet]
        public JsonResult GetTransactionsByBankPostedDate(DateTime startDate, DateTime endDate)
        {
            try
            {
                return Json(Repo.GetTransactionsByBankPostedDate(startDate, endDate), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
                throw;
            }
        }
    }
}