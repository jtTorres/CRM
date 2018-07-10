using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ChurchResourceManagerWeb.Models
{
    public class MembershipViewModel
    {
        public IEnumerable<MembershipViewModel> Membership { get; set; }



        public int? FamilyId { get; set; }
        public int MemberId { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Dob { get; set; }
        public short? LocationId { get; set; }
        public byte? MaritalStatusId { get; set; }
        public short? GroupId { get; set; }
        public byte? PreferredContactMethod { get; set; }
        public string ExitDate { get; set; }
        public byte? MembershipTypeId { get; set; }
        public DateTime LastModifiedDate { get; set; }
        public string MemberKey => $"{MemberId} - {FirstName} {LastName}";
        public string FullName => $"{FirstName} {LastName}";
    }
}