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
        public string HomePhoneNumber { get; set; }
        public string CellPhoneNumber { get; set; }
        public string Email { get; set; }
        public byte PreferredContactMethod { get; set; }
        public bool IsContactInfoPanelOpen => true;
    }
}