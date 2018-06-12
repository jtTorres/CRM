using System.Collections.Generic;
using System.Web.Mvc;
using ChurchResourceManagerWeb.Models;
using Newtonsoft.Json;

namespace ChurchResourceManagerWeb.Controllers
{
    public abstract class BaseController : Controller
    {
        protected ChurchResourceDbEntities Db;
        protected Repository Repo;

        protected BaseController()
        {
            Db = new ChurchResourceDbEntities();
            Repo = new Repository();
        }
    }
}