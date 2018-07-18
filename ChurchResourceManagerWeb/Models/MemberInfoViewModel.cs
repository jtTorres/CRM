using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ChurchResourceManagerWeb.Models
{
    public class MemberInfoViewModel
    {
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Dob { get; set; }
        public string Gender { get; set; }
        public string HomePhoneNumber { get; set; }
        public string CellPhoneNumber { get; set; }
        public string Email { get; set; }
        public byte RelationshipTypeId { get; set; }
        public int MembershipStatusId { get; set; }
        public byte MaritalStatusId { get; set; }
        public byte GroupId { get; set; }
        public int PreferredContactMethod { get; set; }
    }
}