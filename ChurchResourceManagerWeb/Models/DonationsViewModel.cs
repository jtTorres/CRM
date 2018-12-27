using System;

namespace ChurchResourceManagerWeb.Models
{
    public class DonationsViewModel
    {
        public int DonationId { get; set; }
        public DateTime DonationDateTime { get; set; }
        public string DonationDate
        {
            get => DonationDateTime.ToString("MM/dd/yyyy");
            set => DonationDateTime = Convert.ToDateTime(value);
        }
        public byte DonationTypeId { get; set; }
        public string DonationType { get; set; }
        public bool IsCheck { get; set; }
        public short CheckNumber { get; set; }
        public int? MemberId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MemberName => $"{FirstName} {LastName}";
        public string MemberKey => $"{MemberId} - {FirstName} {LastName}";
        public decimal DonationAmount { get; set; }
        public string DonationAmountString => DonationAmount.ToString("C");
        public string Comments { get; set; }
    }
}