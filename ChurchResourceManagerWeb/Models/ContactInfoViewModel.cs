using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ChurchResourceManagerWeb.Models
{
    public class ContactInfoViewModel
    {
        public int MemberId { get; set; }
        public byte ContactMethodId { get; set; }
        public string ContactInfo { get; set; }
    }
}