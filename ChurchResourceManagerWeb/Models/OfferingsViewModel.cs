using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

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

        public byte DonationType => 1;

        public decimal OfferingAmount { get; set; }

        public string OfferingAmountString => OfferingAmount.ToString("C");

        public string Comments { get; set; }
    }
}