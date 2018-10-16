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
    
    public partial class TRANSACTIONS
    {
        public int TRANSACTION_ID { get; set; }
        public byte TRANSACTION_TYPE_ID { get; set; }
        public System.DateTime TRANSACTION_DATE { get; set; }
        public Nullable<short> CHECK_NUMBER { get; set; }
        public Nullable<System.DateTime> BANK_POSTED_DATE { get; set; }
        public bool IS_DEBIT { get; set; }
        public string COMMENTS { get; set; }
        public decimal TRANSACTION_AMOUNT { get; set; }
        public byte PAYMENT_ACCOUNT_ID { get; set; }
    
        public virtual TRANSACTION_TYPES TRANSACTION_TYPES { get; set; }
        public virtual PAYMENT_ACCOUNTS PAYMENT_ACCOUNTS { get; set; }
    }
}
