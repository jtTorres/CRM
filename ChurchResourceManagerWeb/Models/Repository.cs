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
                throw;
                //return false;
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
                throw;
                //return false;
            }
        }

        public int AddFamily(FamiliesViewModel family)
        {
            try
            {
                var fam = ModelFactory.CreateFamily(family.Name);
                db.FAMILIES.Add(fam);
                SaveAll();
                return fam.FAMILY_ID;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }

        public int AddLocationInfo(LocationsViewModel location)
        {
            try
            {
                var loc = ModelFactory.CreateLocation(location);
                db.LOCATIONS.Add(loc);
                SaveAll();
                return loc.LOCATION_ID;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }

        public List<int> AddMembership(MembershipViewModel[] membershipRecord)
        {
            try
            {
                var memberIds = new List<int>();
                foreach (var memberInfo in membershipRecord)
                {
                    var member = ModelFactory.CreateMembership(memberInfo);
                    db.MEMBERSHIP.Add(member);

                    SaveAll();

                    memberInfo.MemberId = member.MEMBER_ID;
                    memberIds.Add(memberInfo.MemberId);
                }

                return memberIds;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
                //return false;
            }
        }

        public bool AddContactInfo(ContactInfoViewModel[] contactInfo)
        {
            try
            {
                foreach (var contact in contactInfo)
                {
                    var contactInfoListVm = ModelFactory.CreateContactInfoViewModelList(contact.MemberId, contact.HomePhoneNumber, contact.CellPhoneNumber, contact.Email);
                    var info = ModelFactory.CreateContactInfo(contactInfoListVm);
                    AddContactInfo(info);
                    SaveAll();
                }

                //return SaveAll();
                return UpdateMembershipPreferredContactMethod(contactInfo);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }

        public bool AddContactInfo(IEnumerable<CONTACT_INFO> contactInfo)
        {
            foreach (var info in contactInfo)
            {
                db.CONTACT_INFO.Add(info);
            }

            return true;
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

        public bool UpdateMembershipPreferredContactMethod(ContactInfoViewModel[] contactInfo)
        {
            try
            {
                var membership = new List<MembershipViewModel>();
                foreach (var info in contactInfo)
                {
                    var member = GetMembershipById(info.MemberId);
                    member.PREFERRERD_CONTACT_METHOD = info.PreferredContactMethod;
                    membership.Add(ModelFactory.CreateMembershipViewModel(member));
                }

                return UpdateMembership(membership);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }

        public bool UpdateMembership(List<MembershipViewModel> membership)
        {
            try
            {
                foreach (var memberInfo in membership)
                {
                    db.Entry(GetMembershipById(memberInfo.MemberId)).CurrentValues.SetValues(ModelFactory.CreateMembership(memberInfo));
                    SaveAll();
                }

                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
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
                                  MembershipStatusId = m.MEMBERSHIP_STATUS_ID,
                                  LastModifiedDateTime = m.LAST_MODIFIED_DATE,
                                  RelationshipTypeId = m.RELATIONSHIP_TYPE_ID
                              }).ToList();

            return membership;
        }

        public IEnumerable<MemberSearchViewModel> GetMemberSearch()
        {
            return ModelFactory.CreateMemberSearchViewModelList(db.MEMBERSHIP, db.FAMILIES, db.MEMBERSHIP_STATUS);
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

        public object GetEmptyMemberInfo()
        {
            return new { memberInfo = new MembershipInfoViewModel(), contactInfo = new ContactInfoViewModel() };
        }

        public IEnumerable<ContactMethodsViewModel> GetContactMethods()
        {
            return ModelFactory.CreateContactMethodsList(db.CONTACT_METHODS);
        }

        public IEnumerable<MembershipStatusViewModel> GetMembershipStatuses()
        {
            return ModelFactory.CreateMembershipStatusList(db.MEMBERSHIP_STATUS);
        }

        public IEnumerable<RelationshipTypesViewModel> GetRelationshipTypes()
        {
            return ModelFactory.CreateRelationshipTypesList(db.RELATIONSHIP_TYPES);
        }

        public IEnumerable<MaritalStatusesViewModel> GetMaritalStatuses()
        {
            return ModelFactory.CreateMaritalStatusList(db.MARITAL_STATUS);
        }

        public IEnumerable<MemberGroupsViewModel> GetMemberGroups()
        {
            return ModelFactory.CreateMemberGroupsViewModel(db.MEMBER_GROUPS);
        }

        public MEMBERSHIP GetMembershipById(int memberId)
        {
            return db.MEMBERSHIP.Find(memberId);
        }

        #endregion

        #region switches

        public string GetRunningTotals(DateTime date, EntitySelector.Entity entity)
        {
            switch (entity)
            {
                case EntitySelector.Entity.Tithe:
                    return GetTithesRunningTotal(date);
                case EntitySelector.Entity.Offering:
                    return GetOfferingsRunningTotal(date);
                default:
                    return null;
            }
        }
        #endregion

        public bool SaveAll()
        {
            return db.SaveChanges() > 0;
        }
    }
}