using System.Web.Mvc;

namespace ChurchResourceManagerWeb.Controllers
{
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

        public ActionResult MemberTaxLetter()
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