using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ChurchResourceManagerWeb.Models
{
    public static class Utilities
    {
        public static DateTime ShortDateString(DateTime date)
        {
            return Convert.ToDateTime(date.ToShortDateString());
        }
    }
}