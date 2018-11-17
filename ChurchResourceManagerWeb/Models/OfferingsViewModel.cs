using System;

namespace ChurchResourceManagerWeb.Models
{
    public class OfferingsViewModel
    {
        public int OfferingId { get; set; }
        public DateTime OfferingDateTime { get; set; }
        public string OfferingDate
        {
            get => OfferingDateTime.ToString("MM/dd/yyyy");
            set => OfferingDateTime = Convert.ToDateTime(value);
        }
        public byte DonationTypeId { get; set; }
        public string DonationType { get; set; }
        public decimal OfferingAmount { get; set; }
        public string OfferingAmountString => OfferingAmount.ToString("C");
        public string Comments { get; set; }
    }
}