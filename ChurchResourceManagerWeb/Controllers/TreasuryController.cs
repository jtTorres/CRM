using System.Web.Mvc;
using System.Web.UI;

namespace ChurchResourceManagerWeb.Controllers
{
    [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
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