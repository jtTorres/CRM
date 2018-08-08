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

        #region PartialViews for Components

        public ActionResult SubmitTransaction()
        {
            return PartialView("_submitTransaction");
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
    }
}