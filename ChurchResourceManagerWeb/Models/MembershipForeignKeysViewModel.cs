using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ChurchResourceManagerWeb.Models
{
    public class MembershipForeignKeysViewModel
    {
        public int FamilyId { get; set; }
        public int MemberId { get; set; }
        public short LocationId { get; set; }
    }
}