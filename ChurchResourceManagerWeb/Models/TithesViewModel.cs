using System;

namespace ChurchResourceManagerWeb.Models
{
    public class TithesViewModel
    {
        public int TitheId { get; set; }
        public int MemberId { get; set; }
        public byte DonationType { get; set; }
        public DateTime TitheDateDateTime { get; set; }
        public string TitheDate
        {
            get => TitheDateDateTime.ToString("MM/dd/yyyy");

            set => TitheDateDateTime = Convert.ToDateTime(value);
        }
        public bool IsCheck { get; set; }
        public short CheckNumber { get; set; }
        public decimal TitheAmount { get; set; }
        public string TitheAmountString => TitheAmount.ToString("C");
        public string Comments { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MemberName => $"{FirstName} {LastName}";
        public string MemberKey => $"{MemberId} - {FirstName} {LastName}";
    }
}