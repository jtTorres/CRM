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
    
    public partial class MEMBERSHIP_TYPES
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public MEMBERSHIP_TYPES()
        {
            this.MEMBERSHIP = new HashSet<MEMBERSHIP>();
        }
    
        public byte MEMBERSHIP_TYPE_ID { get; set; }
        public string DESCRIPTION { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<MEMBERSHIP> MEMBERSHIP { get; set; }
    }
}
