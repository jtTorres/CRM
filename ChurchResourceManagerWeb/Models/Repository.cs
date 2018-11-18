using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Globalization;
using System.Linq;

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
        public TithesViewModel AddTithe(TithesViewModel tithe)
        {
            try
            {
                var titheRecord = ModelFactory.CreateTithe(tithe);
                db.TITHES.Add(titheRecord);
                SaveAll();

                return GetMemberTitheByTitheId(titheRecord.TITHE_ID);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
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
            }
        }

        public int AddFamily(FamiliesViewModel family)
        {
            try
            {
                var fam = ModelFactory.CreateFamily(family);
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
            }
        }

        public bool AddContactInfo(ContactInfoViewModel[] contactInfo)
        {
            try
            {
                foreach (var contact in contactInfo)
                {
                    var contactInfoListVm = ModelFactory.CreateContactInfoViewModelList(contact);
                    var info = ModelFactory.CreateContactInfoList(contactInfoListVm);
                    AddContactInfo(info);
                    SaveAll();
                }

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

        public bool AddContactInfo(CONTACT_INFO contactInfo)
        {
            db.CONTACT_INFO.Add(contactInfo);
            return true;
        }

        public bool SubmitTransaction(TransactionsViewModel transaction)
        {
            db.TRANSACTIONS.Add(ModelFactory.CreateTransaction(transaction));
            return SaveAll();
        }

        public bool AddDonation(DonationsViewModel donation)
        {
            db.DONATIONS.Add(ModelFactory.CreateDonation(donation));
            return SaveAll();
        }


        #endregion

        #region Update Methods
        public TithesViewModel UpdateTithe(TithesViewModel tithe)
        {
            db.Entry(GetTitheById(tithe.TitheId)).CurrentValues.SetValues(ModelFactory.CreateTithe(tithe));
            SaveAll();

            return tithe;
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
                    if (memberInfo.MemberId == 0)
                    {
                        AddNewMember(memberInfo, membership[0]);
                        break;
                    }
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

        private void AddNewMember(MembershipViewModel newMember, MembershipViewModel parentRecord)
        {
            newMember.LocationId = parentRecord.LocationId;
            newMember.FamilyId = parentRecord.FamilyId;

            var memberToAdd = new List<MembershipViewModel> { newMember };

            AddMembership(memberToAdd.ToArray());

        }

        public bool UpdateFamily(FamiliesViewModel family)
        {
            db.Entry(GetFamilyById(family.FamilyId)).CurrentValues.SetValues(ModelFactory.CreateFamily(family));
            return SaveAll();
        }

        public bool UpdateAddress(LocationsViewModel location)
        {
            db.Entry(GetLocationById(location.LocationId)).CurrentValues.SetValues(ModelFactory.CreateLocation(location));
            return SaveAll();
        }

        public bool UpdateContactInfo(List<ContactInfoViewModel> contactInfo)
        {
            foreach (var contact in contactInfo)
            {
                var contactList = ModelFactory.CreateContactInfoViewModelList(contact);

                foreach (var contacts in contactList)
                {
                    var contactx = GetContactInfoById(contacts.MemberId, contacts.ContactMethodId);

                    if (contactx == null)
                        AddContactInfo(ModelFactory.CreateContactInfo(contacts));
                    else
                        db.Entry(contactx).CurrentValues.SetValues(ModelFactory.CreateContactInfo(contacts));
                }
            }
            return SaveAll();
        }

        public bool UpdateTransaction(TransactionsViewModel transaction)
        {
            db.Entry(GetTransactionById(transaction.TransactionId)).CurrentValues.SetValues(ModelFactory.CreateTransaction(transaction));
            return SaveAll();
        }

        public bool UpdateDonation(DonationsViewModel donation)
        {
            db.Entry(GetDonationById(donation.DonationId)).CurrentValues.SetValues(ModelFactory.CreateDonation(donation));
            return SaveAll();
        }

        #endregion

        #region Delete Methods
        public int DeleteTithe(int titheId)
        {
            var titheRecord = GetTitheById(titheId);

            db.Entry(titheRecord).State = EntityState.Deleted;
            SaveAll();
            return titheId;
        }

        public bool DeleteOffering(int offeringId)
        {
            var offeringRecord = GetOfferingById(offeringId);

            db.Entry(offeringRecord).State = EntityState.Deleted;
            return SaveAll();
        }

        public bool DeleteTransaction(int transactionId)
        {
            db.Entry(GetTransactionById(transactionId)).State = EntityState.Deleted;
            return SaveAll();
        }

        public bool DeleteDonation(int donationId)
        {
            db.Entry(GetDonationById(donationId)).State = EntityState.Deleted;
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

            return db.MEMBERSHIP.Include(f => f.FAMILIES).Where(g => g.GROUP_ID != 3).Select(m =>
                new MembershipViewModel
                {
                    FamilyId = m.FAMILY_ID,
                    FamilyName = m.FAMILIES.NAME,
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
        }

        public IEnumerable<MemberSearchViewModel> GetMemberSearch()
        {
            return ModelFactory.CreateMemberSearchViewModelList(db.MEMBERSHIP, db.FAMILIES, db.MEMBERSHIP_STATUS);
        }

        public IEnumerable<MemberSearchViewModel> GetMemberSearchByFamilyId(int familyId)
        {
            return ModelFactory.CreateMemberSearchViewModelList(db.MEMBERSHIP.Where(f => f.FAMILY_ID == familyId), db.FAMILIES.Where(f => f.FAMILY_ID == familyId), db.MEMBERSHIP_STATUS);
        }

        public IEnumerable<MemberSearchViewModel> GetMemberSearchByMemberId(int memberId)
        {
            return ModelFactory.CreateMemberSearchViewModelList(db.MEMBERSHIP.Where(f => f.MEMBER_ID == memberId), db.FAMILIES, db.MEMBERSHIP_STATUS);
        }

        public IEnumerable<MemberSearchViewModel> GetMemberSearchByExitDate(DateTime startDate, DateTime endDate)
        {
            return ModelFactory.CreateMemberSearchViewModelList(db.MEMBERSHIP.Where(e => e.EXIT_DATE >= startDate && e.EXIT_DATE <= endDate), db.FAMILIES, db.MEMBERSHIP_STATUS);
        }

        public IEnumerable<MemberSearchViewModel> GetMemberSearchByDateOfBirth(DateTime startDate, DateTime endDate)
        {
            return ModelFactory.CreateMemberSearchViewModelList(db.MEMBERSHIP.Where(d => d.DOB >= startDate && d.DOB <= endDate), db.FAMILIES, db.MEMBERSHIP_STATUS);
        }

        public IEnumerable<MemberSearchViewModel> GetMemberSearchByMembershipDate(DateTime startDate, DateTime endDate)
        {
            return ModelFactory.CreateMemberSearchViewModelList(db.MEMBERSHIP.Where(e => e.EFFECTIVE_DATE >= startDate && e.EFFECTIVE_DATE <= endDate), db.FAMILIES, db.MEMBERSHIP_STATUS);
        }

        public IEnumerable<TithesViewModel> GetMemberTithes(int memberId, DateTime? date)
        {

            var tithe = db.TITHES.Where(t => (t.TITHE_DATE == date && memberId == 0) || (t.MEMBER_ID == memberId && memberId > 0) || (memberId == 0 && date == null));
            return ModelFactory.CreateTithesViewModelList(tithe).OrderByDescending(t => t.TitheId);
        }

        public TithesViewModel GetMemberTitheByTitheId(int titheId)
        {
            return ModelFactory.CreateTithesViewModel(db.TITHES.Where(t => t.TITHE_ID == titheId));
        }

        public IEnumerable<TithesViewModel> GetTithingActivityByDateRange(DateTime startDate, DateTime endDate)
        {
            var tithe = db.TITHES.Where(t => t.TITHE_DATE >= startDate && t.TITHE_DATE <= endDate);
            return ModelFactory.CreateTithesViewModelList(tithe);
        }

        public object GetTithingActivityByFamilyId(int familyId)
        {
            return ModelFactory.CreateTithesViewModelList(db.TITHES.Include(m => m.MEMBERSHIP).Where(m => m.MEMBERSHIP.FAMILY_ID == familyId));
        }

        public IEnumerable<OfferingsViewModel> GetOfferings(DateTime? date)
        {
            var offering = db.OFFERINGS.Where(o => date != null ? o.OFFERING_DATE == date : date == null);
            return ModelFactory.CreateOfferingsViewModelList(offering).OrderByDescending(o => o.OfferingId);
        }

        public IEnumerable<DonationsViewModel> GetDonations(DateTime? date)
        {
            var donation = db.DONATIONS.Where(d => date != null ? d.DONATION_DATE == date : date == null);
            return ModelFactory.CreateDonationsViewModelList(donation).OrderByDescending(d => d.DonationId);
        }

        public IEnumerable<DonationsViewModel> GetDonationsByDateRange(DateTime startDate, DateTime endDate)
        {
            return ModelFactory.CreateDonationsViewModelList(db.DONATIONS.Where(d => d.DONATION_DATE >= startDate && d.DONATION_DATE <= endDate));
        }

        public IEnumerable<DonationsViewModel> GetDonationsByMemberId(int memberId)
        {
            return ModelFactory.CreateDonationsViewModelList(db.DONATIONS.Where(m => m.MEMBER_ID == memberId));
        }

        public IEnumerable<OfferingsViewModel> GetOfferingsByDateRange(DateTime startDate, DateTime endDate)
        {
            return ModelFactory.CreateOfferingsViewModelList(db.OFFERINGS.Where(d => d.OFFERING_DATE >= startDate && d.OFFERING_DATE <= endDate));
        }

        public string GetTithesRunningTotal(DateTime date)
        {
            var amount = db.TITHES.Where(t => t.TITHE_DATE == date);
            return amount.Any() ? amount.Sum(a => a.TITHE_AMOUNT).ToString(CultureInfo.CurrentCulture) : "0";
        }

        public string GetTithesRunningTotalByDateRange(DateTime startDate, DateTime endDate)
        {
            var amount = db.TITHES.Where(t => t.TITHE_DATE >= startDate && t.TITHE_DATE <= endDate);
            return amount.Any() ? amount.Sum(a => a.TITHE_AMOUNT).ToString(CultureInfo.CurrentCulture) : "0";
        }

        public string GetOfferingsRunningTotal(DateTime date)
        {
            var amount = db.OFFERINGS.Where(o => o.OFFERING_DATE == date);
            return amount.Any() ? amount.Sum(a => a.OFFERING_AMOUNT).ToString(CultureInfo.CurrentCulture) : "0";
        }

        public string GetOfferingsRunningTotalByDateRange(DateTime startDate, DateTime endDate)
        {
            var amount = db.OFFERINGS.Where(o => o.OFFERING_DATE >= startDate && o.OFFERING_DATE <= endDate);
            return amount.Any() ? amount.Sum(a => a.OFFERING_AMOUNT).ToString(CultureInfo.CurrentCulture) : "0";
        }

        public string GetDonationsRunningTotalByDateRange(DateTime startDate, DateTime endDate)
        {
            var amount = db.DONATIONS.Where(d => d.DONATION_DATE >= startDate && d.DONATION_DATE <= endDate);
            return amount.Any() ? amount.Sum(a => a.DONATION_AMOUNT).ToString(CultureInfo.CurrentCulture) : "0";
        }

        public object GetEmptyMemberInfo()
        {
            return new
            {
                memberInfo = new MembershipInfoViewModel(),
                contactInfo =
                new ContactInfoViewModel
                {
                    MemberId = 0,
                    ContactMethodId = 0,
                    ContactInfo = null,
                    HomePhoneNumber = null,
                    CellPhoneNumber = null,
                    Email = null,
                    PreferredContactMethod = 0,
                    IsContactInfoPanelOpen = true,
                    IsContactInfoPanelDisabled = false
                }
            };
        }

        public IEnumerable<ContactMethodsViewModel> GetContactMethods()
        {
            return ModelFactory.CreateContactMethodsList(db.CONTACT_METHODS).OrderBy(x => x.Description);
        }

        public IEnumerable<MembershipStatusViewModel> GetMembershipStatuses()
        {
            return ModelFactory.CreateMembershipStatusList(db.MEMBERSHIP_STATUS).OrderBy(x => x.Description);
        }

        public IEnumerable<RelationshipTypesViewModel> GetRelationshipTypes()
        {
            return ModelFactory.CreateRelationshipTypesList(db.RELATIONSHIP_TYPES).OrderBy(x => x.Description);
        }

        public IEnumerable<MaritalStatusesViewModel> GetMaritalStatuses()
        {
            return ModelFactory.CreateMaritalStatusList(db.MARITAL_STATUS).OrderBy(x => x.Description);
        }

        public IEnumerable<MemberGroupsViewModel> GetMemberGroups()
        {
            return ModelFactory.CreateMemberGroupsViewModel(db.MEMBER_GROUPS).OrderBy(x => x.Description);
        }

        public IEnumerable<TransactionTypesViewModel> GetTransactionTypes()
        {
            return ModelFactory.CreateTransactionTypesViewModelList(db.TRANSACTION_TYPES).OrderBy(x => x.Description);
        }

        public IEnumerable<PaymentAccountsViewModel> GetPaymentAccounts()
        {
            return ModelFactory.CreatePaymentAccountsViewModelList(db.PAYMENT_ACCOUNTS).OrderBy(x => x.PaymentAccount);
        }

        public IEnumerable<DonationTypesViewModel> GetDonationTypes()
        {
            return ModelFactory.CreateDonationTypesViewModelList(db.DONATION_TYPES).OrderBy(x => x.Description);
        }

        public MEMBERSHIP GetMembershipById(int memberId)
        {
            return db.MEMBERSHIP.Find(memberId);
        }

        public EditMembershipViewModel GetMembershipByFamilyId(int familyId)
        {
            var family = ModelFactory.CreateFamiliesViewModel(db.FAMILIES.Find(familyId));
            var members = ModelFactory.CreateMembershipViewModelList(db.MEMBERSHIP.Where(f => f.FAMILY_ID == familyId));

            var location = ModelFactory.CreateLocationViewModel(db.LOCATIONS.Find(members.FirstOrDefault().LocationId));

            var memberIds = members.Select(m => m.MemberId).ToList();

            var contact = (from c in db.CONTACT_INFO where memberIds.Contains(c.MEMBER_ID) select c);

            var contactInfo = ModelFactory.CreateContactInfoViewModelList(contact, db.MEMBERSHIP.Where(f => f.FAMILY_ID == familyId));

            return new EditMembershipViewModel
            {
                Family = family,
                Location = location,
                Membership = members,
                ContactInfo = contactInfo
            };
        }

        public FAMILIES GetFamilyById(int familyId)
        {
            return db.FAMILIES.Find(familyId);
        }

        public LOCATIONS GetLocationById(int locationId)
        {
            return db.LOCATIONS.Find(locationId);
        }

        public CONTACT_INFO GetContactInfoById(int contactMemberId, byte contactMethodId)
        {
            return db.CONTACT_INFO.FirstOrDefault(m => m.MEMBER_ID == contactMemberId && m.CONTACT_METHOD_ID == contactMethodId);
        }

        public IEnumerable<TransactionsViewModel> GetTransactions()
        {
            return ModelFactory.CreateTransactionsViewModelList(db.TRANSACTIONS, db.TRANSACTION_TYPES).OrderByDescending(t => t.TransactionId);
        }

        public TransactionsViewModel GetTransactionViewModelById(int transactionId)
        {
            return ModelFactory.CreateTransactionsViewModel(db.TRANSACTIONS.Find(transactionId));
        }

        public TRANSACTIONS GetTransactionById(int transactionId)
        {
            return db.TRANSACTIONS.Find(transactionId);
        }

        public IEnumerable<TransactionsViewModel> GetTransactionsByTransactionDate(DateTime startDate, DateTime endDate)
        {
            return ModelFactory.CreateTransactionsViewModelList(db.TRANSACTIONS.Where(t => t.TRANSACTION_DATE >= startDate && t.TRANSACTION_DATE <= endDate));
        }

        public IEnumerable<TransactionsViewModel> GetTransactionsByBankPostedDate(DateTime startDate, DateTime endDate)
        {
            return ModelFactory.CreateTransactionsViewModelList(db.TRANSACTIONS.Where(t => t.BANK_POSTED_DATE >= startDate && t.BANK_POSTED_DATE <= endDate));
        }

        public DONATIONS GetDonationById(int donationId)
        {
            return db.DONATIONS.Find(donationId);
        }

        public DonationsViewModel GetDonationsViewModelById(int donationId)
        {
            return ModelFactory.CreateDonationsViewModel(db.DONATIONS.Find(donationId));
        }

        public int GetMemberCounts()
        {
            return db.MEMBERSHIP.Count(m => m.MEMBERSHIP_STATUS_ID == 1);
        }

        public string GetTransactionRunningTotal(DateTime date, TransactionInquiryTypes.InquiryType inquiryType)
        {
            IQueryable<TRANSACTIONS> amount;
            switch (inquiryType)
            {
                case TransactionInquiryTypes.InquiryType.Expenses:
                    amount = db.TRANSACTIONS.Where(t => t.TRANSACTION_DATE == date && t.IS_DEBIT);
                    break;
                case TransactionInquiryTypes.InquiryType.Income:
                    amount = db.TRANSACTIONS.Where(t => t.TRANSACTION_DATE == date && !t.IS_DEBIT);
                    break;
                default:
                    amount = db.TRANSACTIONS;
                    break;
            }
            return amount.Any() ? amount.Sum(a => a.TRANSACTION_AMOUNT).ToString(CultureInfo.CurrentCulture) : "0";
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

        public string GetRunningTotalsByDateRange(DateTime startDate, DateTime endDate, EntitySelector.Entity entity)
        {
            switch (entity)
            {
                case EntitySelector.Entity.Tithe:
                    return GetTithesRunningTotalByDateRange(startDate, endDate);
                case EntitySelector.Entity.Offering:
                    return GetOfferingsRunningTotalByDateRange(startDate, endDate);
                case EntitySelector.Entity.Donation:
                    return GetDonationsRunningTotalByDateRange(startDate, endDate);
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