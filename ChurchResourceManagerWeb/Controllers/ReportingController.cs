using System.Web.Mvc;
using System.Web.UI;

namespace ChurchResourceManagerWeb.Controllers
{
    [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
    [AllowAnonymous]
    public class ReportingController : BaseController
    {
        // GET: Reporting
        public ActionResult TithingReport()
        {
            return View();
        }

        public ActionResult MembershipReport()
        {
            return View();
        }

        public ActionResult OfferingReport()
        {
            return View();
        }

        public ActionResult TransactionsReport()
        {
            return View();
        }

        public ActionResult DonationReport()
        {
            return View();
        }

        public ActionResult FinancialSummary()
        {
            return View();
        }

        #region PartialViews for Components

        public ActionResult ReportingTabs()
        {
            return PartialView("_reportingTabs");
        }
        #endregion
    }
}