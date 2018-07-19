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
            return PartialView("_membership");
        }

        public ActionResult MemberInformation()
        {
            return PartialView("_memberInformation");
        }

        public ActionResult Family()
        {
            return PartialView("_family");
        }

        public ActionResult Address()
        {
            return PartialView("_address");
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

        [HttpPost]
        public JsonResult AddFamily(FamiliesViewModel family)
        {
            try
            {
                return Json(new { Id = Repo.AddFamily(family) });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
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