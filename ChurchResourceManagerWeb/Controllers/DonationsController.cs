﻿using ChurchResourceManagerWeb.Models;
using System;
using System.Web.Mvc;

namespace ChurchResourceManagerWeb.Controllers
{
    public class DonationsController : BaseController
    {
        // GET: Donation
        public ActionResult AddDonations()
        {
            return View();
        }

        public ActionResult DonationsSearch()
        {
            return View();
        }

        #region Partial Views for Components

        public ActionResult AddDonation()
        {
            return PartialView("_addDonation");
        }

        public ActionResult DonationActivity()
        {
            return PartialView("_donationActivity");
        }

        public ActionResult EditDonation()
        {
            return PartialView("_editDonationModal");
        }

        public ActionResult DeleteDonationModal()
        {
            return PartialView("_deleteDonationModal");
        }
        #endregion

        [HttpPost]
        public JsonResult AddDonationRecord(DonationsViewModel donation)
        {
            try
            {
                return Json(Repo.AddDonation(donation), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
                throw;
            }
        }

        [HttpPost]
        public JsonResult UpdateDonationRecord(DonationsViewModel donation)
        {
            try
            {
                return Json(Repo.UpdateDonation(donation), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
                throw;
            }
        }

        [HttpPost]
        public JsonResult DeleteDonationRecord(int donationId)
        {
            try
            {
                return Json(Repo.DeleteDonation(donationId), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
                throw;
            }
        }

        [HttpGet]
        public JsonResult GetDonationActivity()
        {
            try
            {
                return Json(Repo.GetDonations(null), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
                throw;
            }
        }

        [HttpGet]
        public JsonResult GetDonations()
        {
            try
            {
                return Json(Repo.GetDonations(null), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
                throw;
            }
        }

        [HttpGet]
        public JsonResult GetDonation(int donationId)
        {
            try
            {
                return Json(Repo.GetDonationsByIdViewModel(donationId), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
                throw;
            }
        }

        [HttpGet]
        public JsonResult GetDonationsByDonationDate(DateTime startDate, DateTime endDate)
        {
            try
            {
                return Json(Repo.GetDonationsByDateRange(startDate, endDate), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
                throw;
            }
        }

        [HttpGet]
        public JsonResult GetDonationsByMemberId(int memberId)
        {
            try
            {
                return Json(Repo.GetDonationsByMemberId(memberId), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
                throw;
            }
        }

        [HttpGet]
        public JsonResult GetDonationsByMemberIdWithDateRange(int memberId, DateTime? startDate, DateTime? endDate)
        {
            try
            {
                return Json(Repo.GetDonationsByMemberIdWithDateRange(memberId, startDate, endDate), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
                throw;
            }
        }
    }
}