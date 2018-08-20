using System;
using System.Security.Principal;
using System.Web.Mvc;
using System.Web.UI;
using ChurchResourceManagerWeb.Models;
using Newtonsoft.Json;

namespace ChurchResourceManagerWeb.Controllers
{
    [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
    public class HomeController : BaseController
    {
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult GetAllMembership()
        {
            try
            {
                return Json(Repo.GetAllMembership(), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}