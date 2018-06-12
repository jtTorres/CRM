using System;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Web.Mvc;
using System.Web.UI;
using ChurchResourceManagerWeb.Models;

namespace ChurchResourceManagerWeb.Controllers
{
    [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
    public class TithingController : BaseController
    {
        // GET: Tithing

        public ActionResult Home()
        {
            return View();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult AddTithes()
        {
            return View();
        }

        #region PartialViews for Components
        public ActionResult Addtithe()
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
        #endregion

        public ActionResult ViewTithes()
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

                // set default for DONATION_TYPE
                //titheRecord.DONATION_TYPE_ID = 1; // Tithes
                titheRecord.DonationType = 1; // Tithes

                if (Repo.AddTithe(titheRecord) && Repo.SaveAll())
                    return Json(new { Success = true });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw ex;
            }
            return Json(new { Success = false });
        }

        [HttpGet]
        public JsonResult GetMemberTithes(int memberId, DateTime date)
        {
            try
            {
                return Json(Repo.GetMemberTithes(memberId, date).OrderByDescending(d => d.TitheDateDateTime).ThenByDescending(t => t.TitheId).Take(10), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
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
                Console.WriteLine(ex);
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
                Console.WriteLine(ex);
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
                Console.WriteLine(ex);
                throw;
            }
        }

        [HttpPost]
        public JsonResult UpdateTithe(TithesViewModel tithe)
        {
            try
            {
                return Json(new { success = Repo.UpdateTithe(tithe) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }

        [HttpPost]
        public JsonResult DeleteTithe(int titheId)
        {
            try
            {
                return Json(new { success = Repo.DeleteTithe(titheId) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }

    }
}