using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

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
                DONATION_TYPE_ID = offering.DonationType,
                OFFERING_AMOUNT = offering.OfferingAmount,
                COMMENTS = offering.Comments
            };
        }

        public LOCATIONS CreateLocation(MembershipInfoViewModel membershipRecord)
        {
            return new LOCATIONS
            {
                ADDRESS1 = membershipRecord.Address1,
                ADDRESS2 = membershipRecord.Address2,
                CITY = membershipRecord.City,
                STATE = membershipRecord.State,
                ZIP_CODE = membershipRecord.ZipCode
            };
        }

        public MEMBERSHIP CreateMembership(MembershipInfoViewModel membership)
        {
            return new MEMBERSHIP
            {
                FIRST_NAME = membership.FirstName,
                MIDDLE_NAME = membership.MiddleName,
                LAST_NAME = membership.LastName,
                DOB = Convert.ToDateTime(membership.Dob),
                GENDER = membership.Gender,
                FAMILY_ID = membership.FamilyId,
                MARITAL_STATUS_ID = membership.MaritalStatusId,
                GROUP_ID = membership.GroupId,
                PREFERRERD_CONTACT_METHOD = membership.PreferredContactMethod,
                MEMBERSHIP_TYPE_ID = membership.MembershipTypeId,
                LOCATION_ID = membership.LocationId,
                EXIT_DATE = null,
                LAST_MODIFIED_DATE = DateTime.Now,
                RELATIONSHIP_TYPE_ID = membership.RelationshipTypeId
            };
        }

        public FAMILIES CreateFamily(string familyName)
        {
            return new FAMILIES
            {
                NAME = familyName
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

        #endregion


        #region List Creations
        public IEnumerable<TithesViewModel> CreateTithesViewModelList(IQueryable<TITHES> tithe, IQueryable<MEMBERSHIP> member)
        {
            return (from t in tithe
                    join m in member on t.MEMBER_ID equals m.MEMBER_ID
                    select new TithesViewModel
                    {
                        TitheId = t.TITHE_ID,
                        MemberId = m.MEMBER_ID,
                        FirstName = m.FIRST_NAME,
                        LastName = m.LAST_NAME,
                        DonationType = t.DONATION_TYPE_ID,
                        TitheDateDateTime = t.TITHE_DATE,
                        IsCheck = t.IS_CHECK,
                        CheckNumber = t.CHECK_NUMBER ?? 0,
                        TitheAmount = t.TITHE_AMOUNT,
                        Comments = t.COMMENTS
                    }).ToList();
        }

        public IEnumerable<OfferingsViewModel> CreateOfferingsViewModelList(IQueryable<OFFERINGS> offering)
        {

            return offering.Select(o => new OfferingsViewModel
            {
                OfferingId = o.OFFERING_ID,
                OfferingDateTime = o.OFFERING_DATE,
                OfferingAmount = o.OFFERING_AMOUNT,
                Comments = o.COMMENTS
            }).ToList();
        }

        public IEnumerable<ContactInfoViewModel> CreateContactInfoViewModelList(int memberId, string homePhone, string cellPhone, string email)
        {
            var contactInfo = new List<ContactInfoViewModel>();

            if (!string.IsNullOrEmpty(homePhone))
                contactInfo.Add(new ContactInfoViewModel() { MemberId = memberId, ContactMethodId = 1, ContactInfo = homePhone });

            if (!string.IsNullOrEmpty(cellPhone))
                contactInfo.Add(new ContactInfoViewModel() { MemberId = memberId, ContactMethodId = 2, ContactInfo = cellPhone });

            if (!string.IsNullOrEmpty(email))
                contactInfo.Add(new ContactInfoViewModel() { MemberId = memberId, ContactMethodId = 3, ContactInfo = email });

            return contactInfo;

        }

        public IEnumerable<CONTACT_INFO> CreateContactInfo(IEnumerable<ContactInfoViewModel> contactInfo)
        {

            return contactInfo.Select(c => new CONTACT_INFO
            {
                MEMBER_ID = c.MemberId,
                CONTACT_METHOD_ID = c.ContactMethodId,
                CONTACT_INFO1 = c.ContactInfo
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

        public IEnumerable<MembershipStatusViewModel> CreateMembershipStatusList(IQueryable<MEMBERSHIP_TYPES> membershipStatus)
        {
            return membershipStatus.Select(m => new MembershipStatusViewModel
            {
                Id = m.MEMBERSHIP_TYPE_ID,
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
        #endregion
    }
}