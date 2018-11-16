using System.Web.Mvc;

namespace ChurchResourceManagerWeb.Controllers
{
    [AllowAnonymous]
    public class TreasuryController : Controller
    {
        // GET: Treasury
        public ActionResult Home()
        {
            return View();
        }
    }
}