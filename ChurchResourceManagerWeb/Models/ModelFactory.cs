﻿using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace ChurchResourceManagerWeb.Models
{
    public class ModelFactory
    {
        #region EF Creations
        public TITHES CreateTithe(TithesViewModel tithe)
        {
            return new TITHES
            {
                TITHE_ID = tithe.TitheId,
                MEMBER_ID = tithe.MemberId,
                DONATION_TYPE_ID = tithe.DonationType,
                TITHE_DATE = Convert.ToDateTime(tithe.TitheDate),
                IS_CHECK = tithe.IsCheck,
                CHECK_NUMBER = tithe.CheckNumber,
                TITHE_AMOUNT = tithe.TitheAmount,
                COMMENTS = tithe.Comments
            };
        }

        public OFFERINGS CreateOffering(OfferingsViewModel offering)
        {
            return new OFFERINGS
            {
                OFFERING_ID = offering.OfferingId,
                OFFERING_DATE = Convert.ToDateTime(offering.OfferingDate),
                DONATION_TYPE_ID = offering.DonationTypeId,
                OFFERING_AMOUNT = offering.OfferingAmount,
                COMMENTS = offering.Comments
            };
        }

        public LOCATIONS CreateLocation(LocationsViewModel loc)
        {
            return new LOCATIONS
            {
                LOCATION_ID = loc.LocationId,
                ADDRESS1 = loc.Address1,
                ADDRESS2 = loc.Address2,
                CITY = loc.City,
                STATE = loc.State,
                ZIP_CODE = loc.ZipCode
            };
        }

        public MEMBERSHIP CreateMembership(MembershipViewModel membership)
        {
            return new MEMBERSHIP
            {
                FAMILY_ID = membership.FamilyId,
                MEMBER_ID = membership.MemberId,
                FIRST_NAME = membership.FirstName,
                MIDDLE_NAME = membership.MiddleName,
                LAST_NAME = membership.LastName,
                DOB = Convert.ToDateTime(membership.Dob),
                GENDER = membership.Gender,
                LOCATION_ID = membership.LocationId,
                MARITAL_STATUS_ID = membership.MaritalStatusId,
                GROUP_ID = membership.GroupId,
                PREFERRERD_CONTACT_METHOD = membership.PreferredContactMethod,
                EFFECTIVE_DATE = membership.EffectiveDateTime,
                EXIT_DATE = membership.ExitDateTime,
                MEMBERSHIP_STATUS_ID = membership.MembershipStatusId,
                LAST_MODIFIED_DATE = DateTime.Now,
                RELATIONSHIP_TYPE_ID = membership.RelationshipTypeId
            };
        }

        public FAMILIES CreateFamily(FamiliesViewModel family)
        {
            return new FAMILIES
            {
                FAMILY_ID = family.FamilyId,
                NAME = family.Name
            };
        }

        public CONTACT_METHODS CreateContactMethods(ContactMethodsViewModel contactMethods)
        {
            return new CONTACT_METHODS
            {
                CONTACT_METHOD_ID = contactMethods.Id,
                DESCRIPTION = contactMethods.Description
            };
        }

        public TRANSACTIONS CreateTransaction(TransactionsViewModel transaction)
        {
            return new TRANSACTIONS
            {
                TRANSACTION_ID = transaction.TransactionId,
                TRANSACTION_TYPE_ID = transaction.TransactionTypeId,
                PAYMENT_ACCOUNT_ID = transaction.PaymentAccountId,
                TRANSACTION_DATE = Convert.ToDateTime(transaction.TransactionDate),
                TRANSACTION_AMOUNT = transaction.TransactionAmount,
                CHECK_NUMBER = transaction.CheckNumber,
                BANK_POSTED_DATE = transaction.BankPostedDateTime,
                IS_DEBIT = transaction.IsDebit,
                COMMENTS = transaction.Comments
            };
        }

        public DONATIONS CreateDonation(DonationsViewModel donation)
        {
            return new DONATIONS
            {
                DONATION_ID = donation.DonationId,
                DONATION_DATE = donation.DonationDateTime,
                DONATION_TYPE_ID = donation.DonationTypeId,
                MEMBER_ID = donation.MemberId,
                DONATION_AMOUNT = donation.DonationAmount,
                COMMENTS = donation.Comments
            };
        }

        #endregion

        #region ViewModel Creation

        public TithesViewModel CreateTithesViewModel(IQueryable<TITHES> tithe)
        {
            return tithe.Include(m => m.MEMBERSHIP).Select(t => new TithesViewModel
            {
                TitheId = t.TITHE_ID,
                MemberId = t.MEMBER_ID,
                FirstName = t.MEMBERSHIP.FIRST_NAME,
                LastName = t.MEMBERSHIP.LAST_NAME,
                DonationType = t.DONATION_TYPE_ID,
                TitheDateDateTime = t.TITHE_DATE,
                IsCheck = t.IS_CHECK,
                CheckNumber = t.CHECK_NUMBER ?? 0,
                TitheAmount = t.TITHE_AMOUNT,
                Comments = t.COMMENTS

            }).First();
        }

        public OfferingsViewModel CreateOfferingsViewModel(IQueryable<OFFERINGS> offering)
        {
            return offering.Include(dt => dt.DONATION_TYPES).Select(o => new OfferingsViewModel
            {
                OfferingId = o.OFFERING_ID,
                OfferingDateTime = o.OFFERING_DATE,
                DonationTypeId = o.DONATION_TYPES.DONATION_TYPE_ID,
                DonationType = o.DONATION_TYPES.DESCRIPTION,
                OfferingAmount = o.OFFERING_AMOUNT,
                Comments = o.COMMENTS
            }).First();

        }

        public MembershipViewModel CreateMembershipViewModel(MEMBERSHIP membership)
        {
            return new MembershipViewModel
            {
                FamilyId = membership.FAMILY_ID,
                MemberId = membership.MEMBER_ID,
                FirstName = membership.FIRST_NAME,
                MiddleName = membership.MIDDLE_NAME,
                LastName = membership.LAST_NAME,
                DobDateTime = Convert.ToDateTime(membership.DOB),
                Gender = membership.GENDER,
                LocationId = membership.LOCATION_ID,
                MaritalStatusId = membership.MARITAL_STATUS_ID,
                GroupId = membership.GROUP_ID,
                PreferredContactMethod = membership.PREFERRERD_CONTACT_METHOD,
                ExitDateTime = membership.EXIT_DATE,
                MembershipStatusId = membership.MEMBERSHIP_STATUS_ID,
                LastModifiedDateTime = membership.LAST_MODIFIED_DATE,
                RelationshipTypeId = membership.RELATIONSHIP_TYPE_ID
            };
        }

        public FamiliesViewModel CreateFamiliesViewModel(FAMILIES family)
        {
            return new FamiliesViewModel
            {
                FamilyId = family.FAMILY_ID,
                Name = family.NAME
            };
        }

        public LocationsViewModel CreateLocationViewModel(LOCATIONS location)
        {
            return new LocationsViewModel
            {
                LocationId = location.LOCATION_ID,
                Address1 = location.ADDRESS1,
                Address2 = location.ADDRESS2,
                City = location.CITY,
                State = location.STATE,
                ZipCode = location.ZIP_CODE
            };
        }

        public TransactionsViewModel CreateTransactionsViewModel(TRANSACTIONS transaction)
        {
            return new TransactionsViewModel
            {
                TransactionId = transaction.TRANSACTION_ID,
                TransactionTypeId = transaction.TRANSACTION_TYPE_ID,
                TransactionType = transaction.TRANSACTION_TYPES.DESCRIPTION,
                PaymentAccountId = transaction.PAYMENT_ACCOUNT_ID,
                PaymentAccount = transaction.PAYMENT_ACCOUNTS.PAYMENT_ACCOUNT,
                TransactionDateTime = transaction.TRANSACTION_DATE,
                TransactionAmount = transaction.TRANSACTION_AMOUNT,
                CheckNumber = transaction.CHECK_NUMBER,
                BankPostedDateTime = transaction.BANK_POSTED_DATE,
                IsDebit = transaction.IS_DEBIT,
                Comments = transaction.COMMENTS
            };
        }

        public DonationsViewModel CreateDonationsViewModel(DONATIONS donation)
        {
            return new DonationsViewModel
            {
                DonationId = donation.DONATION_ID,
                DonationDateTime = donation.DONATION_DATE,
                DonationTypeId = donation.DONATION_TYPE_ID,
                DonationType = donation.DONATION_TYPES.DESCRIPTION,
                MemberId = donation.MEMBER_ID,
                FirstName = donation.MEMBERSHIP?.FIRST_NAME,
                LastName = donation.MEMBERSHIP?.LAST_NAME,
                DonationAmount = donation.DONATION_AMOUNT,
                Comments = donation.COMMENTS
            };
        }
        #endregion

        #region List Creations
        public IEnumerable<TithesViewModel> CreateTithesViewModelList(IQueryable<TITHES> tithe)
        {

            return tithe.Include(m => m.MEMBERSHIP).Select(t => new TithesViewModel
            {
                TitheId = t.TITHE_ID,
                MemberId = t.MEMBER_ID,
                FirstName = t.MEMBERSHIP.FIRST_NAME,
                LastName = t.MEMBERSHIP.LAST_NAME,
                DonationType = t.DONATION_TYPE_ID,
                TitheDateDateTime = t.TITHE_DATE,
                IsCheck = t.IS_CHECK,
                CheckNumber = t.CHECK_NUMBER ?? 0,
                TitheAmount = t.TITHE_AMOUNT,
                Comments = t.COMMENTS

            }).ToList();
        }

        public IEnumerable<MemberSearchViewModel> CreateMemberSearchViewModelList(IQueryable<MEMBERSHIP> membership, IQueryable<FAMILIES> family, IQueryable<MEMBERSHIP_STATUS> membershipStatus)
        {
            return (from m in membership
                    join f in family on m.FAMILY_ID equals f.FAMILY_ID
                    join ms in membershipStatus on m.MEMBERSHIP_STATUS_ID equals ms.MEMBERSHIP_STATUS_ID
                    select new MemberSearchViewModel
                    {
                        FamilyId = f.FAMILY_ID,
                        FamilyName = f.NAME,
                        MemberId = m.MEMBER_ID,
                        FirstName = m.FIRST_NAME,
                        MiddleName = m.MIDDLE_NAME,
                        LastName = m.LAST_NAME,
                        Dob = m.DOB.ToString(),
                        Gender = m.GENDER,
                        MembershipStatus = ms.DESCRIPTION,
                        MembershipStatusId = (byte)m.MEMBERSHIP_STATUS_ID
                    }).ToList();
        }

        public IEnumerable<OfferingsViewModel> CreateOfferingsViewModelList(IQueryable<OFFERINGS> offering)
        {

            return offering.Include(dt => dt.DONATION_TYPES.DESCRIPTION)
                .Select(o => new OfferingsViewModel
                {
                    OfferingId = o.OFFERING_ID,
                    DonationTypeId = o.DONATION_TYPES.DONATION_TYPE_ID,
                    DonationType = o.DONATION_TYPES.DESCRIPTION,
                    OfferingDateTime = o.OFFERING_DATE,
                    OfferingAmount = o.OFFERING_AMOUNT,
                    Comments = o.COMMENTS
                }).ToList();
        }

        public List<ContactInfoViewModel> CreateContactInfoViewModelList(ContactInfoViewModel contact)
        {
            var contactInfo = new List<ContactInfoViewModel>();

            if (!string.IsNullOrEmpty(contact.HomePhoneNumber))
                contactInfo.Add(new ContactInfoViewModel() { MemberId = contact.MemberId, ContactMethodId = 1, ContactInfo = contact.HomePhoneNumber });

            if (!string.IsNullOrEmpty(contact.CellPhoneNumber))
                contactInfo.Add(new ContactInfoViewModel() { MemberId = contact.MemberId, ContactMethodId = 2, ContactInfo = contact.CellPhoneNumber });

            if (!string.IsNullOrEmpty(contact.Email))
                contactInfo.Add(new ContactInfoViewModel() { MemberId = contact.MemberId, ContactMethodId = 3, ContactInfo = contact.Email });

            if (contact.IsContactInfoPanelDisabled)
                contactInfo.Add(new ContactInfoViewModel() { MemberId = contact.MemberId, ContactMethodId = 0, ContactInfo = "No Contact Info" });

            return contactInfo;

        }

        public IEnumerable<ContactInfoViewModel> CreateContactInfoViewModelList(IQueryable<CONTACT_INFO> contactInfo, IQueryable<MEMBERSHIP> member)
        {

            var query = contactInfo
                .GroupBy(m => new { m.MEMBER_ID/*, m.CONTACT_METHOD_ID*/ })
                .Select(g => new
                {
                    MemberId = g.Key.MEMBER_ID,
                    HomePhoneNumber = g.Where(h => h.CONTACT_METHOD_ID == 1).Select(c => c.CONTACT_INFO1).Max(),
                    CellPhoneNumber = g.Where(h => h.CONTACT_METHOD_ID == 2).Select(c => c.CONTACT_INFO1).Max(),
                    Email = g.Where(h => h.CONTACT_METHOD_ID == 3).Select(c => c.CONTACT_INFO1).Max()
                });

            var stuff = (from c in query
                         join m in member on c.MemberId equals m.MEMBER_ID
                         select new ContactInfoViewModel
                         {
                             MemberId = c.MemberId,
                             HomePhoneNumber = c.HomePhoneNumber,
                             CellPhoneNumber = c.CellPhoneNumber,
                             Email = c.Email,
                             PreferredContactMethod = (byte)m.PREFERRERD_CONTACT_METHOD,
                             IsContactInfoPanelDisabled = m.PREFERRERD_CONTACT_METHOD == 0,
                             IsContactInfoPanelOpen = m.PREFERRERD_CONTACT_METHOD != 0
                         }).ToList();

            return stuff;


        }

        public IEnumerable<CONTACT_INFO> CreateContactInfoList(IEnumerable<ContactInfoViewModel> contactInfo)
        {

            return contactInfo.Select(c => new CONTACT_INFO
            {
                MEMBER_ID = c.MemberId,
                CONTACT_METHOD_ID = c.ContactMethodId,
                CONTACT_INFO1 = c.ContactInfo
            }).ToList();
        }

        public IEnumerable<MembershipViewModel> CreateMembershipViewModelList(IEnumerable<MEMBERSHIP> membership)
        {
            return membership.Select(m => new MembershipViewModel
            {
                FamilyId = m.FAMILY_ID,
                MemberId = m.MEMBER_ID,
                FirstName = m.FIRST_NAME,
                MiddleName = m.MIDDLE_NAME,
                LastName = m.LAST_NAME,
                DobDateTime = Convert.ToDateTime(m.DOB),
                Gender = m.GENDER,
                LocationId = m.LOCATION_ID,
                MaritalStatusId = m.MARITAL_STATUS_ID,
                GroupId = m.GROUP_ID,
                PreferredContactMethod = m.PREFERRERD_CONTACT_METHOD,
                ExitDateTime = m.EXIT_DATE,
                MembershipStatusId = m.MEMBERSHIP_STATUS_ID,
                LastModifiedDateTime = m.LAST_MODIFIED_DATE,
                RelationshipTypeId = m.RELATIONSHIP_TYPE_ID
            }).ToList();
        }



        public IEnumerable<ContactMethodsViewModel> CreateContactMethodsList(IQueryable<CONTACT_METHODS> contactMethods)
        {
            return contactMethods.Select(c => new ContactMethodsViewModel
            {
                Id = c.CONTACT_METHOD_ID,
                Description = c.DESCRIPTION
            }).ToList();
        }

        public IEnumerable<MembershipStatusViewModel> CreateMembershipStatusList(IQueryable<MEMBERSHIP_STATUS> membershipStatus)
        {
            return membershipStatus.Select(m => new MembershipStatusViewModel
            {
                Id = m.MEMBERSHIP_STATUS_ID,
                Description = m.DESCRIPTION
            }).ToList();
        }

        public IEnumerable<RelationshipTypesViewModel> CreateRelationshipTypesList(IQueryable<RELATIONSHIP_TYPES> relationshipTypes)
        {
            return relationshipTypes.Select(r => new RelationshipTypesViewModel
            {
                Id = r.RELATIONSHIP_TYPE_ID,
                Description = r.DESCRIPTION
            }).ToList();
        }

        public IEnumerable<MaritalStatusesViewModel> CreateMaritalStatusList(IQueryable<MARITAL_STATUS> maritalStatus)
        {
            return maritalStatus.Select(m => new MaritalStatusesViewModel
            {
                Id = m.MARITAL_STATUS_ID,
                Description = m.DESCRIPTION
            }).ToList();
        }

        public IEnumerable<MemberGroupsViewModel> CreateMemberGroupsViewModel(IQueryable<MEMBER_GROUPS> memberGroup)
        {
            return memberGroup.Select(m => new MemberGroupsViewModel
            {
                Id = m.GROUP_ID,
                Description = m.DESCRIPTION
            }).ToList();
        }

        public IEnumerable<TransactionsViewModel> CreateTransactionsViewModelList(IQueryable<TRANSACTIONS> transaction)
        {
            return transaction.Include(tt => tt.TRANSACTION_TYPES.DESCRIPTION).Include(pa => pa.PAYMENT_ACCOUNTS.PAYMENT_ACCOUNT)
                .Select(t => new TransactionsViewModel
                {
                    TransactionId = t.TRANSACTION_ID,
                    TransactionTypeId = t.TRANSACTION_TYPE_ID,
                    TransactionType = t.TRANSACTION_TYPES.DESCRIPTION,
                    PaymentAccountId = t.PAYMENT_ACCOUNT_ID,
                    PaymentAccount = t.PAYMENT_ACCOUNTS.PAYMENT_ACCOUNT,
                    TransactionDateTime = t.TRANSACTION_DATE,
                    TransactionAmount = t.TRANSACTION_AMOUNT,
                    CheckNumber = t.CHECK_NUMBER,
                    BankPostedDateTime = t.BANK_POSTED_DATE,
                    IsDebit = t.IS_DEBIT,
                    Comments = t.COMMENTS
                }).ToList();
        }

        public IEnumerable<PaymentAccountsViewModel> CreatePaymentAccountsViewModelList(IQueryable<PAYMENT_ACCOUNTS> paymentAccounts)
        {
            return paymentAccounts.Select(x => new PaymentAccountsViewModel { PaymentAccountId = x.PAYMENT_ACCOUNT_ID, PaymentAccount = x.PAYMENT_ACCOUNT });
        }

        public IEnumerable<DonationTypesViewModel> CreateDonationTypesViewModelList(IQueryable<DONATION_TYPES> donationTypes)
        {
            return donationTypes.Select(x => new DonationTypesViewModel { Id = x.DONATION_TYPE_ID, Description = x.DESCRIPTION });
        }

        public IEnumerable<DonationsViewModel> CreateDonationsViewModelList(IQueryable<DONATIONS> donation)
        {
            return donation.Include(dt => dt.DONATION_TYPES.DESCRIPTION).Include(m => m.MEMBERSHIP)
                .Select(x => new DonationsViewModel
                {
                    DonationId = x.DONATION_ID,
                    DonationDateTime = x.DONATION_DATE,
                    DonationTypeId = x.DONATION_TYPE_ID,
                    DonationType = x.DONATION_TYPES.DESCRIPTION,
                    MemberId = x.MEMBER_ID,
                    FirstName = x.MEMBERSHIP.FIRST_NAME,
                    LastName = x.MEMBERSHIP.LAST_NAME,
                    DonationAmount = x.DONATION_AMOUNT,
                    Comments = x.COMMENTS
                });
        }

        public IEnumerable<TransactionsViewModel> CreateTransactionsViewModelList(IQueryable<TRANSACTIONS> transactions, IQueryable<TRANSACTION_TYPES> transactionTypes)
        {

            return transactions.Include(tt => tt.TRANSACTION_TYPES.DESCRIPTION).Include(pa => pa.PAYMENT_ACCOUNTS.PAYMENT_ACCOUNT)
                .Select(t => new TransactionsViewModel
                {
                    TransactionId = t.TRANSACTION_ID,
                    TransactionType = t.TRANSACTION_TYPES.DESCRIPTION,
                    PaymentAccount = t.PAYMENT_ACCOUNTS.PAYMENT_ACCOUNT,
                    TransactionTypeId = t.TRANSACTION_TYPE_ID,
                    TransactionDateTime = t.TRANSACTION_DATE,
                    TransactionAmount = t.TRANSACTION_AMOUNT,
                    CheckNumber = t.CHECK_NUMBER,
                    BankPostedDateTime = t.BANK_POSTED_DATE,
                    IsDebit = t.IS_DEBIT,
                    Comments = t.COMMENTS
                }).ToList();
        }

        public IEnumerable<TransactionTypesViewModel> CreateTransactionTypesViewModelList(IQueryable<TRANSACTION_TYPES> transactionType)
        {
            return transactionType.Select(t => new TransactionTypesViewModel
            {
                Id = t.TRANSACTION_TYPE_ID,
                Description = t.DESCRIPTION
            }).ToList();
        }

        public IEnumerable<TaxLetterViewModel> CreateTaxLetterViewModelList(IEnumerable<TithesViewModel> memberTithes, IEnumerable<DonationsViewModel> memberDonations)
        {
            var titheDonation = memberTithes.Select(t => new DonationsViewModel
            {
                DonationDateTime = t.TitheDateDateTime,
                DonationTypeId = t.DonationType,
                MemberId = t.MemberId,
                FirstName = t.FirstName,
                LastName = t.LastName,
                DonationAmount = t.TitheAmount,
                IsCheck = t.IsCheck,
                CheckNumber = t.CheckNumber,
                Comments = t.Comments
            });

            var donations = titheDonation.Union(memberDonations).ToList();
            var memberIds = donations.Select(x => new { x.MemberId }).Distinct();

            var result = memberIds.Select(x => new TaxLetterViewModel
            {
                MemberGiving = donations.Where(d => d.MemberId == x.MemberId),
                TotalAmount = donations.Where(d => d.MemberId == x.MemberId).Sum(t => t.DonationAmount),
                MemberName = donations.Where(d => d.MemberId == x.MemberId).Select(f => $"{f.FirstName} {f.LastName}").FirstOrDefault()
            });

            return result;

        }
        #endregion


        public CONTACT_INFO CreateContactInfo(ContactInfoViewModel contactInfoList)
        {
            return new CONTACT_INFO
            {
                MEMBER_ID = contactInfoList.MemberId,
                CONTACT_METHOD_ID = contactInfoList.ContactMethodId,
                CONTACT_INFO1 = contactInfoList.ContactInfo
            };
        }
    }
}