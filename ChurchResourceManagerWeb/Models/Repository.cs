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

        #region Add Methods
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

        public bool AddOffering(OfferingsViewModel offering)
        {
            try
            {
                db.OFFERINGS.Add(ModelFactory.CreateOffering(offering));
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                //throw;
                return false;
            }
        }


        #endregion

        #region Update Methods
        public bool UpdateTithe(TithesViewModel tithe)
        {
            db.Entry(GetTitheById(tithe.TitheId)).CurrentValues.SetValues(ModelFactory.CreateTithe(tithe));

            return SaveAll();
        }

        public bool UpdateOffering(OfferingsViewModel offering)
        {
            db.Entry(GetOfferingById(offering.OfferingId)).CurrentValues.SetValues(ModelFactory.CreateOffering(offering));
            return SaveAll();
        }
        #endregion

        #region Delete Methods
        public bool DeleteTithe(int titheId)
        {
            //var titheRecord = db.TITHES.FirstOrDefault(t => t.TITHE_ID == titheId);
            var titheRecord = GetTitheById(titheId);

            db.Entry(titheRecord).State = EntityState.Deleted;
            return SaveAll();
        }

        public bool DeleteOffering(int offeringId)
        {
            var offeringRecord = GetOfferingById(offeringId);

            db.Entry(offeringRecord).State = EntityState.Deleted;
            return SaveAll();
        }


        #endregion

        #region GetMethods
        public TITHES GetTitheById(int titheId)
        {
            return db.TITHES.FirstOrDefault(t => t.TITHE_ID == titheId);
        }

        public OFFERINGS GetOfferingById(int offeringId)
        {
            return db.OFFERINGS.FirstOrDefault(o => o.OFFERING_ID == offeringId);
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

            var tithe = db.TITHES.Where(t => (t.TITHE_DATE == date && memberId == 0) || (t.MEMBER_ID == memberId && memberId > 0) || (memberId == 0 && date == null));
            return ModelFactory.CreateTithesViewModelList(tithe, db.MEMBERSHIP);
        }

        public IEnumerable<OfferingsViewModel> GetOfferings(DateTime? date)
        {
            var offering = db.OFFERINGS.Where(o => date != null ? o.OFFERING_DATE == date : date == null);
            return ModelFactory.CreateOfferingsViewModelList(offering);
        }

        public string GetTithesRunningTotal(DateTime date)
        {
            var amount = db.TITHES.Where(t => t.TITHE_DATE == date);
            return amount.Any() ? amount.Sum(a => a.TITHE_AMOUNT).ToString(CultureInfo.CurrentCulture) : "0";
        }

        public string GetOfferingsRunningTotal(DateTime date)
        {
            var amount = db.OFFERINGS.Where(o => o.OFFERING_DATE == date);
            return amount.Any() ? amount.Sum(a => a.OFFERING_AMOUNT).ToString(CultureInfo.CurrentCulture) : "0";
        }

        #endregion

        public bool SaveAll()
        {
            return db.SaveChanges() > 0;
        }


    }
}