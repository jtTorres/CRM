﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;

namespace ChurchResourceManagerWeb.Controllers
{
    [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
    public class EnumsController : BaseController
    {
        public JsonResult GetContactMethods()
        {
            try
            {
                return Json(Repo.GetContactMethods(), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }

        public JsonResult GetMembershipStatuses()
        {
            try
            {
                return Json(Repo.GetMembershipStatuses(), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }

        public JsonResult GetRelationshipTypes()
        {
            try
            {
                return Json(Repo.GetRelationshipTypes(), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }

        public JsonResult GetMaritalStatuses()
        {
            try
            {
                return Json(Repo.GetMaritalStatuses(), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }

        public JsonResult GetMemberGroups()
        {
            try
            {
                return Json(Repo.GetMemberGroups(), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }

    }
}