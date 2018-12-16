using ChurchResourceManagerWeb.Models;
using System;
using System.Web.Mvc;

namespace ChurchResourceManagerWeb.Controllers
{
    [AllowAnonymous]
    public class OfferingsController : BaseController
    {
        // GET: Offerings
        public ActionResult Home()
        {
            return View();
        }

        public ActionResult AddOfferings()
        {
            return View();
        }

        public ActionResult OfferingsSearch()
        {
            return View();
        }

        #region PartialViews for Components

        public ActionResult AddOffering()
        {
            return PartialView("_addOffering");
        }

        public ActionResult OfferingActivity()
        {
            return PartialView("_offeringActivity");
        }

        public ActionResult EditOffering()
        {
            return PartialView("_editOfferingModal");
        }

        public ActionResult DeleteOfferingModal()
        {
            return PartialView("_deleteOfferingModal");
        }
        #endregion

        [HttpPost]
        public JsonResult AddOfferingRecord(OfferingsViewModel offeringRecord)
        {
            try
            {
                return Json(Repo.AddOffering(offeringRecord), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
                throw;
            }
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
                Log.Error(ex.Message);
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
                Log.Error(ex.Message);
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
                Log.Error(ex.Message);
                throw;
            }
        }

        [HttpGet]
        public JsonResult GetOfferingActivityByDateRange(DateTime startDate, DateTime endDate)
        {
            try
            {
                return Json(Repo.GetOfferingsByDateRange(startDate, endDate), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
                throw;
            }
        }

        [HttpPost]
        public JsonResult UpdateOffering(OfferingsViewModel offering)
        {
            try
            {
                return Json(Repo.UpdateOffering(offering), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
                throw;
            }
        }

        [HttpPost]
        public JsonResult DeleteOffering(int offeringId)
        {
            try
            {
                return Json(Repo.DeleteOffering(offeringId), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
                throw;
            }
        }
    }
}