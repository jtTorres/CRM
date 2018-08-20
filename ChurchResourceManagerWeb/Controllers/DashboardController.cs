using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;

namespace ChurchResourceManagerWeb.Controllers
{

    [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
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