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
    public class OfferingsController : BaseController
    {
        // GET: Offerings
        public ActionResult Home()
        {
            return View();
        }

        [HttpPost]
        public JsonResult AddOfferingRecord(OfferingsViewModel offeringRecord)
        {
            try
            {
                if (Repo.AddOffering(offeringRecord) && Repo.SaveAll())
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
        public JsonResult GetOfferingsRunningTotal()
        {
            try
            {
                return Json(Repo.GetOfferingsRunningTotal(Utilities.ShortDateString(DateTime.Now)), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }

        [HttpGet]
        public JsonResult GetTodaysOfferingActivity()
        {
            try
            {
                return Json(Repo.GetOfferings(Utilities.ShortDateString(DateTime.Now)), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }

        [HttpGet]
        public JsonResult GetOfferingActivity()
        {
            try
            {
                return Json(Repo.GetOfferings(null), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }

        [HttpPost]
        public JsonResult UpdateOffering(OfferingsViewModel offering)
        {
            try
            {
                return Json(new { success = Repo.UpdateOffering(offering) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }

        [HttpPost]
        public JsonResult DeleteOffering(int offeringId)
        {
            try
            {
                return Json(new { success = Repo.DeleteOffering(offeringId) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }
    }
}