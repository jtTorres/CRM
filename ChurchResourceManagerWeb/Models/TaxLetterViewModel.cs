using System.Collections.Generic;

namespace ChurchResourceManagerWeb.Models
{
    public class TaxLetterViewModel
    {
        public IEnumerable<DonationsViewModel> MemberGiving { get; set; }
        public string MemberName { get; set; }
        public decimal TotalAmount { get; set; }

    }
}