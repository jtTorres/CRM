using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ChurchResourceManagerWeb.Models
{
    public class ModelFactory
    {
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

    }
}