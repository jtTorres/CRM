using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ChurchResourceManagerWeb.Models
{
    /// <summary>
    /// Instantiates ChurchResourceDbEntities so it can be used across all classes
    /// </summary>
    public abstract class DatabaseContext
    {
        protected ChurchResourceDbEntities db;

        protected DatabaseContext()
        {
            db = new ChurchResourceDbEntities();
        }
    }
}