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
    
    public partial class ACTIVITIES
    {
        public int ACTIVITY_ID { get; set; }
        public byte ACTIVITY_TYPE_ID { get; set; }
        public int MEMBER_ID { get; set; }
        public Nullable<decimal> MONEY_SPENT { get; set; }
        public Nullable<decimal> MONEY_EARNED { get; set; }
        public Nullable<System.DateTime> ACTIVITY_START_DATE { get; set; }
        public Nullable<System.DateTime> ACTIVITY_END_DATE { get; set; }
    
        public virtual ACTIVITY_TYPES ACTIVITY_TYPES { get; set; }
        public virtual MEMBERSHIP MEMBERSHIP { get; set; }
    }
}
