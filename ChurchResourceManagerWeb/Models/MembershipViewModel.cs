using System;
using System.Collections.Generic;
using System.Globalization;

namespace ChurchResourceManagerWeb.Models
{
    public class MembershipViewModel
    {
        public IEnumerable<MembershipViewModel> Membership { get; set; }



        public int? FamilyId { get; set; }
        public string FamilyName { get; set; }
        public int MemberId { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public DateTime DobDateTime { get; set; }

        public string Dob
        {
            get => DobDateTime.ToString("MM/dd/yyyy");
            set => DobDateTime = Convert.ToDateTime(string.IsNullOrEmpty(value) ? new DateTime().ToString(CultureInfo.InvariantCulture) : value);
        }

        public string Gender { get; set; }
        public short? LocationId { get; set; }
        public byte? MaritalStatusId { get; set; }
        public byte? GroupId { get; set; }
        public byte? PreferredContactMethod { get; set; }
        public DateTime? ExitDateTime { get; set; }

        public string ExitDate
        {
            get
            {
                if (ExitDateTime == null)
                    return null;
                var exitDate = Convert.ToDateTime(ExitDateTime);
                return exitDate.ToString("MM/dd/yyyy");
            }
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
        public string FamilyKey => $"{FamilyId} - {FamilyName}";
        public string FullName => $"{FirstName} {LastName}";
        public bool IsMemberInfoPanelOpen => true;
        public bool IsPersonalInfoPanelOpen { get; set; }
    }
}