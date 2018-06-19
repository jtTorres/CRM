using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.Entity;
using System.Globalization;
using System.Linq;
using System.Web;
using Microsoft.Ajax.Utilities;

namespace ChurchResourceManagerWeb.Models
{
    public class Repository : DatabaseContext
    {
        protected ModelFactory ModelFactory;

        public Repository()
        {
            ModelFactory = new ModelFactory();
        }

        //public bool AddTithe(TITHES tithe)
        public bool AddTithe(TithesViewModel tithe)
        {
            try
            {
                db.TITHES.Add(ModelFactory.CreateTithe(tithe));
                //db.TITHES.Add(tithe);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                //throw;
                return false;
            }

        }

        public IEnumerable<MembershipViewModel> GetAllMembership()
        {
            var membership = (from m in db.MEMBERSHIP
                              select new MembershipViewModel()
                              {
                                  FamilyId = m.FAMILY_ID,
                                  MemberId = m.MEMBER_ID,
                                  FirstName = m.FIRST_NAME,
                                  MiddleName = m.MIDDLE_NAME,
                                  LastName = m.LAST_NAME,
                                  Dob = m.DOB.ToString(),
                                  LocationId = m.LOCATION_ID,
                                  MaritalStatusId = m.MARITAL_STATUS_ID,
                                  GroupId = m.GROUP_ID,
                                  PreferredContactMethod = m.PREFERRERD_CONTACT_METHOD,
                                  ExitDate = m.EXIT_DATE.ToString(),
                                  MembershipTypeId = m.MEMBERSHIP_TYPE_ID,
                                  LastModifiedDate = m.LAST_MODIFIED_DATE
                              }).ToList();

            return membership;
        }

        public IEnumerable<TithesViewModel> GetMemberTithes(int memberId, DateTime? date)
        {
            //var today = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day);
            var memberTithes = (from mt in db.TITHES
                                join m in db.MEMBERSHIP on mt.MEMBER_ID equals m.MEMBER_ID
                                where (memberId > 0 && mt.MEMBER_ID == memberId) || (memberId == 0 && mt.TITHE_DATE == date) || (memberId == 0 && date == null /*&& mt.TITHE_DATE == today*/)
                                select new TithesViewModel()
                                {
                                    TitheId = mt.TITHE_ID,
                                    MemberId = mt.MEMBER_ID,
                                    FirstName = m.FIRST_NAME,
                                    LastName = m.LAST_NAME,
                                    DonationType = mt.DONATION_TYPE_ID,
                                    TitheDateDateTime = mt.TITHE_DATE,
                                    IsCheck = mt.IS_CHECK,
                                    CheckNumber = mt.CHECK_NUMBER ?? 0,
                                    TitheAmount = mt.TITHE_AMOUNT,
                                    Comments = mt.COMMENTS
                                }).ToList();

            return memberTithes;
        }

        public TITHES GetTitheById(int titheId)
        {
            return db.TITHES.FirstOrDefault(t => t.TITHE_ID == titheId);
        }

        public bool UpdateTithe(TithesViewModel tithe)
        {
            db.Entry(GetTitheById(tithe.TitheId)).CurrentValues.SetValues(ModelFactory.CreateTithe(tithe));

            return SaveAll();
        }

        public bool DeleteTithe(int titheId)
        {
            var titheRecord = db.TITHES.FirstOrDefault(t => t.TITHE_ID == titheId);

            db.Entry(titheRecord).State = EntityState.Deleted;
            return SaveAll();
        }

        public bool SaveAll()
        {
            return db.SaveChanges() > 0;
        }

        public string GetTithesRunningTotal(DateTime date)
        {
            var amount = db.TITHES.Where(t => t.TITHE_DATE == date);
            return amount.Any() ? amount.Sum(a => a.TITHE_AMOUNT).ToString(CultureInfo.CurrentCulture) : "0";
        }
    }
}