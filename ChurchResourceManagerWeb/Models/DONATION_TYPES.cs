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
    
    public partial class DONATION_TYPES
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public DONATION_TYPES()
        {
            this.TITHES = new HashSet<TITHES>();
            this.DONATIONS = new HashSet<DONATIONS>();
        }
    
        public byte DONATION_TYPE_ID { get; set; }
        public string DESCRIPTION { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TITHES> TITHES { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DONATIONS> DONATIONS { get; set; }
    }
}
