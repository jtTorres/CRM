﻿using System;

namespace ChurchResourceManagerWeb.Models
{
    public class TransactionsViewModel
    {
        public int TransactionId { get; set; }
        public byte TransactionTypeId { get; set; }
        public byte PaymentAccountId { get; set; }
        public string TransactionType { get; set; }
        public string PaymentAccount { get; set; }
        public DateTime TransactionDateTime { get; set; }
        public string TransactionDate
        {
            get => TransactionDateTime.ToString("MM/dd/yyyy");
            set => TransactionDateTime = Convert.ToDateTime(value);
        }
        public decimal TransactionAmount { get; set; }
        public string TransactionAmountString => TransactionAmount.ToString("C");
        public string CheckNumber { get; set; }
        public DateTime? BankPostedDateTime { get; set; }
        public string BankPostedDate
        {
            get
            {
                if (BankPostedDateTime == null)
                    return null;

                var bankPostedDate = Convert.ToDateTime(BankPostedDateTime);
                return bankPostedDate.ToString("MM/dd/yyyy");

            }
            set
            {
                if (!string.IsNullOrEmpty(value))
                    BankPostedDateTime = Convert.ToDateTime(value);
            }
        }

        public bool IsDebit { get; set; }
        public string IsDebitString => IsDebit ? "Y" : "N";
        public string Comments { get; set; }
    }
}