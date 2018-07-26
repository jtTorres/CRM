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
        public DateTime? DobDateTime { get; set; }

        public string Dob
        {
            get => DobDateTime.ToString();
            set => DobDateTime = Convert.ToDateTime(value);
        }

        public string Gender { get; set; }
        public short? LocationId { get; set; }
        public byte? MaritalStatusId { get; set; }
        public byte? GroupId { get; set; }
        public byte? PreferredContactMethod { get; set; }
        public DateTime? ExitDateTime { get; set; }

        public string ExitDate
        {
            //get => string.IsNullOrEmpty(ExitDateTime.ToString()) ? null : ExitDateTime.ToString();
            //set => ExitDateTime = Convert.ToDateTime(value);
            get => ExitDateTime.ToString();
            set
            {
                if (!string.IsNullOrEmpty(value))
                    ExitDateTime = Convert.ToDateTime(value);
            }
        }
        public byte? MembershipStatusId { get; set; }
        public DateTime LastModifiedDateTime { get; set; }

        public string LastModifiedDate
        {
            get => LastModifiedDateTime.ToString("MM/dd/yyyy");
            set => LastModifiedDateTime = Convert.ToDateTime(value);
        }
        public byte? RelationshipTypeId { get; set; }
        public string MemberKey => $"{MemberId} - {FirstName} {LastName}";
        public string FullName => $"{FirstName} {LastName}";
    }
}