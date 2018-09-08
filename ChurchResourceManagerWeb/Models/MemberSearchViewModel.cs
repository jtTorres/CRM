using System;

namespace ChurchResourceManagerWeb.Models
{
    public class MemberSearchViewModel
    {
        public int FamilyId { get; set; }
        public string FamilyName { get; set; }
        public int MemberId { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public DateTime DobDateTime { get; set; }
        public string Dob
        {
            get => DobDateTime.ToString("MM/dd/yyyy");
            set => DobDateTime = Convert.ToDateTime(value);
        }
        public string Gender { get; set; }
        public string MembershipStatus { get; set; }
        public byte MembershipStatusId { get; set; }
    }
}