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
    public class MembershipController : BaseController
    {
        // GET: Membership
        public ActionResult Home()
        {
            return View();
        }

        public ActionResult AddMembership()
        {
            return View();
        }

        #region PartialViews for Components

        public ActionResult AddMember()
        {
            return PartialView("_addMembership");
        }

        public ActionResult MemberInformation()
        {
            return PartialView("_memberInformation");
        }
        #endregion


        [HttpPost]
        public JsonResult AddMembershipRecord(MembershipInfoViewModel membershipRecord)
        {
            try
            {
                if (Repo.AddMembership(membershipRecord) && Repo.SaveAll())
                    return Json(new { Success = true });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
            return Json(new { Success = false });
        }

        [HttpGet]
        public JsonResult GetEmptyMemberInfo()
        {
            try
            {
                return Json(Repo.GetEmptyMemberInfo(), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }
    }
}