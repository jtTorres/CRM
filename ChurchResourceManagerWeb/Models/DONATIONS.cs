//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ChurchResourceManagerWeb.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class DONATIONS
    {
        public int DONATION_ID { get; set; }
        public System.DateTime DONATION_DATE { get; set; }
        public byte DONATION_TYPE_ID { get; set; }
        public Nullable<int> MEMBER_ID { get; set; }
        public decimal DONATION_AMOUNT { get; set; }
        public string COMMENTS { get; set; }
    
        public virtual DONATION_TYPES DONATION_TYPES { get; set; }
        public virtual MEMBERSHIP MEMBERSHIP { get; set; }
    }
}
