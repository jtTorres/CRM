using System.Web.Mvc;
using System.Web.UI;

namespace ChurchResourceManagerWeb.Controllers
{
    [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
    [Authorize]
    public class ReportingController : BaseController
    {
        // GET: Reporting
        public ActionResult TithingReport()
        {
            return View();
        }

        #region PartialViews for Components

        public ActionResult ReportingTabs()
        {
            return PartialView("_reportingTabs");
        }
        public ActionResult TithesReport()
        {
            return PartialView("_tithesReport");
        }
        #endregion
    }
}