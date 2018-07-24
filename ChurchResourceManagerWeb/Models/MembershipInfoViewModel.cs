using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ChurchResourceManagerWeb.Models
{
    public class MembershipInfoViewModel
    {
        //public List<MemberInfoViewModel> MemberInfo { get; set; }
        public MembershipInfoViewModel[] MemberInfo { get; set; }

        public int FamilyId { get; set; }
        public string FamilyName { get; set; }
        public int MemberId { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Dob { get; set; }
        public string Gender { get; set; }
        public short LocationId { get; set; }
        public byte MaritalStatusId { get; set; }
        public byte GroupId { get; set; }
        public byte PreferredContactMethod { get; set; }
        public string ExitDate { get; set; }
        public byte MembershipStatusId { get; set; }
        public string LastModifiedDate { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }
        public string HomePhoneNumber { get; set; }
        public string CellPhoneNumber { get; set; }
        public string Email { get; set; }
        public byte RelationshipTypeId { get; set; }


        public string MemberKey => $"{MemberId} - {FirstName} {LastName}";
        public string FullName => $"{FirstName} {LastName}";
    }
}