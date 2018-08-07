using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

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
    }
}