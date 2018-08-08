﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ChurchResourceManagerWeb.Models
{
    public class TransactionsViewModel
    {
        public int TransactionId { get; set; }
        public byte TransactionTypeId { get; set; }
        public DateTime TransactionDateTime { get; set; }
        public string TransactionDate
        {
            get => TransactionDateTime.ToString("MM/dd/yyyy");
            set => TransactionDateTime = Convert.ToDateTime(value);
        }
        public short CheckNumber { get; set; }
        public DateTime BankPostedDateTime { get; set; }
        public string BankPostedDate
        {
            get => BankPostedDateTime.ToString("MM/dd/yyyy");
            set => BankPostedDateTime = Convert.ToDateTime(value);
        }
        public bool IsDebit { get; set; }
        public string Comments { get; set; }
    }
}