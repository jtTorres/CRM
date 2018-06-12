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
    }
}