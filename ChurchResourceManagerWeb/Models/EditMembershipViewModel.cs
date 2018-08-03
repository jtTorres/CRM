using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ChurchResourceManagerWeb.Models
{
    public class EditMembershipViewModel
    {
        public FamiliesViewModel Family { get; set; }
        public LocationsViewModel Location { get; set; }
        public IEnumerable<MembershipViewModel> Membership { get; set; }
        public IEnumerable<ContactInfoViewModel> ContactInfo { get; set; }
    }
}