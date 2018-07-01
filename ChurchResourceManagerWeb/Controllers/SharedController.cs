using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;
using ChurchResourceManagerWeb.Models;

namespace ChurchResourceManagerWeb.Controllers
{
    [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
    public class SharedController : BaseController
    {
        // GET: Shared
        public ActionResult RunningTotals()
        {
            return PartialView("_runningTotals");
        }

        public JsonResult GetRunningTotals(DateTime date, EntitySelector.Entity entity)
        {
            try
            {
                return Json(Repo.GetRunningTotals(Utilities.ShortDateString(date), entity), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }
    }
}