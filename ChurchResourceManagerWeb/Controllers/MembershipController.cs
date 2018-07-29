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

        public ActionResult MembersSearch()
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

        public ActionResult MemberInformationReadOnly()
        {
            return PartialView("_memberInformationReadOnly");
        }

        public ActionResult Family()
        {
            return PartialView("_family");
        }

        public ActionResult FamilyReadOnly()
        {
            return PartialView("_familyReadOnly");
        }

        public ActionResult Address()
        {
            return PartialView("_address");
        }

        public ActionResult AddressReadOnly()
        {
            return PartialView("_addressReadOnly");
        }

        public ActionResult ContactInformation()
        {
            return PartialView("_contactInformation");
        }

        public ActionResult ContactInformationReadOnly()
        {
            return PartialView("_contactInformationReadOnly");
        }

        public ActionResult Members()
        {
            return PartialView("_membersGrid");
        }
        #endregion


        [HttpPost]
        public JsonResult AddMembershipRecord(MembershipViewModel[] membershipRecord)
        {
            try
            {
                return Json(new { MemberIds = Repo.AddMembership(membershipRecord) });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
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

        [HttpPost]
        public JsonResult AddLocation(LocationsViewModel location)
        {
            try
            {
                return Json(new { LocationId = Repo.AddLocationInfo(location) });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }

        [HttpPost]
        public JsonResult AddContactInfo(ContactInfoViewModel[] contactInfo)
        {
            try
            {
                return Json(new { success = Repo.AddContactInfo(contactInfo) });
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

        [HttpGet]
        public JsonResult GetMemberSearch()
        {
            try
            {
                return Json(Repo.GetMemberSearch(), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }


    }
}