using System;
using System.Web.Mvc;

namespace ChurchResourceManagerWeb.Controllers
{

    [AllowAnonymous]
    public class DashboardController : BaseController
    {
        // GET: Dashboard
        #region PartialViews for Components

        public ActionResult Dashboard()
        {
            return PartialView("_dashboard");
        }
        #endregion

        [HttpGet]
        public ActionResult GetMemberCount()
        {
            try
            {
                return Json(new { MemberCount = Repo.GetMemberCounts() }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }
    }
}