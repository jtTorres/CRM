﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class ChurchResourceDbEntities : DbContext
    {
        public ChurchResourceDbEntities()
            : base("name=ChurchResourceDbEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<ACTIVITIES> ACTIVITIES { get; set; }
        public virtual DbSet<ACTIVITY_TYPES> ACTIVITY_TYPES { get; set; }
        public virtual DbSet<CONTACT_INFO> CONTACT_INFO { get; set; }
        public virtual DbSet<CONTACT_METHODS> CONTACT_METHODS { get; set; }
        public virtual DbSet<DONATION_TYPES> DONATION_TYPES { get; set; }
        public virtual DbSet<FAMILIES> FAMILIES { get; set; }
        public virtual DbSet<LOCATIONS> LOCATIONS { get; set; }
        public virtual DbSet<MARITAL_STATUS> MARITAL_STATUS { get; set; }
        public virtual DbSet<MEMBER_GROUPS> MEMBER_GROUPS { get; set; }
        public virtual DbSet<MEMBERSHIP> MEMBERSHIP { get; set; }
        public virtual DbSet<MEMBERSHIP_TYPES> MEMBERSHIP_TYPES { get; set; }
        public virtual DbSet<TITHES> TITHES { get; set; }
        public virtual DbSet<TRANSACTION_TYPES> TRANSACTION_TYPES { get; set; }
        public virtual DbSet<TRANSACTIONS> TRANSACTIONS { get; set; }
        public virtual DbSet<UTILITY_BILLS> UTILITY_BILLS { get; set; }
    }
}