using ChurchResourceManagerWeb.Models;
using System;
using System.Web.Mvc;
using System.Web.UI;

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

        public ActionResult PageHeader()
        {
            return PartialView("_pageHeader");
        }

        public ActionResult MembershipStatCards()
        {
            return PartialView("_membershipStatCards");
        }

        [HttpGet]
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

        [HttpGet]
        public JsonResult GetEntityActivityReport(ActivitySelector.ActivityReportType activity)
        {
            try
            {

                // TODO: figure out how to abstract this out by doing like an IEnumerable<T> or something like that
                switch (activity)
                {
                    case ActivitySelector.ActivityReportType.Today:
                        return Json(Repo.GetOfferings(Utilities.ShortDateString(DateTime.Now)), JsonRequestBehavior.AllowGet);
                    case ActivitySelector.ActivityReportType.All:
                        return Json(Repo.GetOfferings(null), JsonRequestBehavior.AllowGet);
                    default:
                        break;
                }

                return null;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }
    }
}