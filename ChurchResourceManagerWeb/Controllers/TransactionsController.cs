using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ChurchResourceManagerWeb.Models;

namespace ChurchResourceManagerWeb.Controllers
{
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
    }
}