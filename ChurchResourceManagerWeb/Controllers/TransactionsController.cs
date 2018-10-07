using ChurchResourceManagerWeb.Models;
using System;
using System.Web.Mvc;
using System.Web.UI;

namespace ChurchResourceManagerWeb.Controllers
{
    [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
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
                return Json(new { success = Repo.SubmitTransaction(transaction) });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
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
                Console.WriteLine(ex);
                throw;
            }
        }

        [HttpGet]
        public JsonResult GetTransaction(int transactionId)
        {
            try
            {
                return Json(Repo.GetTransactionViewModelById(transactionId), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }

        [HttpPost]
        public JsonResult UpdateTransaction(TransactionsViewModel transaction)
        {
            try
            {
                return Json(new { success = Repo.UpdateTransaction(transaction) });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }

        [HttpPost]
        public JsonResult DeleteTransaction(int transactionId)
        {
            try
            {
                return Json(new { Success = Repo.DeleteTransaction(transactionId) });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
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
                Console.WriteLine(ex);
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
                Console.WriteLine(ex);
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
                Console.WriteLine(ex);
                throw;
            }
        }
    }
}