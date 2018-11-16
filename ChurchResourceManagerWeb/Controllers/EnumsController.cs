using System;
using System.Web.Mvc;

namespace ChurchResourceManagerWeb.Controllers
{
    public class EnumsController : BaseController
    {
        [HttpGet]
        public JsonResult GetContactMethods()
        {
            try
            {
                return Json(Repo.GetContactMethods(), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }

        [HttpGet]
        public JsonResult GetMembershipStatuses()
        {
            try
            {
                return Json(Repo.GetMembershipStatuses(), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }

        [HttpGet]
        public JsonResult GetRelationshipTypes()
        {
            try
            {
                return Json(Repo.GetRelationshipTypes(), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }

        [HttpGet]
        public JsonResult GetMaritalStatuses()
        {
            try
            {
                return Json(Repo.GetMaritalStatuses(), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }

        [HttpGet]
        public JsonResult GetMemberGroups()
        {
            try
            {
                return Json(Repo.GetMemberGroups(), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }

        [HttpGet]
        public JsonResult GetTransactionTypes()
        {
            try
            {
                return Json(Repo.GetTransactionTypes(), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }

        [HttpGet]
        public JsonResult GetPaymentAccounts()
        {
            try
            {
                return Json(Repo.GetPaymentAccounts(), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }

        [HttpGet]
        public JsonResult GetDonationTypes()
        {
            try
            {
                return Json(Repo.GetDonationTypes(), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }

    }
}