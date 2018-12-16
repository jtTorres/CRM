using ChurchResourceManagerWeb.Models;
using log4net;
using log4net.Config;
using System.Reflection;
using System.Web.Mvc;

namespace ChurchResourceManagerWeb.Controllers
{
    public abstract class BaseController : Controller
    {
        protected ChurchResourceDbEntities Db;
        protected Repository Repo;
        protected ILog Log = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);

        protected BaseController()
        {
            Db = new ChurchResourceDbEntities();
            Repo = new Repository();
            XmlConfigurator.Configure();
        }
    }
}