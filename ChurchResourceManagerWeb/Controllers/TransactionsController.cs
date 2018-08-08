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
    }
}