﻿using ChurchResourceManagerWeb.Models;
using System;
using System.Linq;
using System.Web.Mvc;

namespace ChurchResourceManagerWeb.Controllers
{
    [AllowAnonymous]
    public class TithingController : BaseController
    {
        // GET: Tithing

        public ActionResult Home()
        {
            return View();
        }

        [HttpGet]
        public ActionResult AddTithes()
        {
            return View();
        }

        #region PartialViews for Components
        public ActionResult AddTithe()
        {
            return PartialView("_addTithe");
        }

        public ActionResult TithesRunningTotals()
        {
            return PartialView("_tithesRunningTotals");
        }

        public ActionResult TithingActivityByMemberGrid()
        {
            return PartialView("_tithingActivityByMemberGrid");
        }

        public ActionResult EditTithe()
        {
            return PartialView("_editTitheModal");
        }

        public ActionResult TithingActivity()
        {
            return PartialView("_tithingActivity");
        }

        public ActionResult DeleteTitheModal()
        {
            return PartialView("_deleteTithesModal");
        }
        #endregion

        public ActionResult TithesSearch()
        {
            return View();
        }

        public ActionResult EditTithes()
        {
            return View();
        }

        [HttpPost]
        public JsonResult AddTitheRecord(TithesViewModel titheRecord)
        {
            try
            {
                // TODO: Take care of error handling so the user is aware when there's an error

                titheRecord.DonationType = 1; // Tithes

                return Json(Repo.AddTithe(titheRecord), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
                throw ex;
            }
        }

        [HttpGet]
        public JsonResult GetMemberTithes(int memberId, DateTime date)
        {
            try
            {
                return Json(Repo.GetMemberTithes(memberId, date).OrderByDescending(d => d.TitheDateDateTime).ThenByDescending(t => t.TitheId), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
                throw;
            }
        }

        [HttpGet]
        public JsonResult GetMemberTithesWithDateRange(int memberId, DateTime? startDate, DateTime? endDate)
        {
            try
            {
                return Json(Repo.GetMemberTithesWithDateRange(memberId, startDate, endDate).OrderByDescending(d => d.TitheDateDateTime).ThenByDescending(t => t.TitheId), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
                throw;
            }
        }

        [HttpGet]
        public JsonResult GetTithesRunningTotal(DateTime date)
        {
            try
            {
                return Json(Repo.GetTithesRunningTotal(Utilities.ShortDateString(date)), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
                throw;
            }
        }

        [HttpGet]
        public JsonResult GetTithesRunningTotalByDateRange(DateTime startDate, DateTime endDate)
        {
            try
            {
                return Json(Repo.GetTithesRunningTotalByDateRange(startDate, endDate), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
                throw;
            }
        }

        [HttpGet]
        public JsonResult GetTodaysTithingActivity()
        {
            try
            {
                return Json(Repo.GetMemberTithes(0, Utilities.ShortDateString(DateTime.Now)), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
                throw;
            }
        }

        [HttpGet]
        public JsonResult GetTithingActivityByDateRange(DateTime startDate, DateTime endDate)
        {
            try
            {
                return Json(Repo.GetTithingActivityByDateRange(startDate, endDate), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
                throw;
            }
        }

        [HttpGet]
        public JsonResult GetTithingActivityByFamilyId(int familyId)
        {
            try
            {
                return Json(Repo.GetTithingActivityByFamilyId(familyId), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
                throw;
            }
        }

        [HttpGet]
        public JsonResult GetTithingActivityByFamilyIdWithDateRange(int familyId, DateTime? startDate, DateTime? endDate)
        {
            try
            {
                return Json(Repo.GetTithingActivityByFamilyIdWithDateRange(familyId, startDate, endDate), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
                throw;
            }
        }

        [HttpGet]
        public JsonResult GetTithingActivity()
        {
            try
            {
                return Json(Repo.GetMemberTithes(0, null), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
                throw;
            }
        }

        [HttpPost]
        public JsonResult UpdateTithe(TithesViewModel tithe)
        {
            try
            {
                return Json(Repo.UpdateTithe(tithe), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
                throw;
            }
        }

        [HttpPost]
        public JsonResult DeleteTithe(int titheId)
        {
            try
            {
                return Json(Repo.DeleteTithe(titheId), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
                throw;
            }
        }

    }
}