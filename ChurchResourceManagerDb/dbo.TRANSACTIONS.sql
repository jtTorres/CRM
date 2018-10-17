﻿CREATE TABLE [dbo].[TRANSACTIONS]
(
	TRANSACTION_ID INT NOT NULL IDENTITY (1,1),
	TRANSACTION_TYPE_ID TINYINT NOT NULL,
	PAYMENT_ACCOUNT_ID TINYINT NOT NULL,
	TRANSACTION_DATE DATE NOT NULL,
	TRANSACTION_AMOUNT MONEY NOT NULL,
	CHECK_NUMBER VARCHAR(20) NULL,
	BANK_POSTED_DATE DATE NULL,
	IS_DEBIT BIT NOT NULL,
	COMMENTS VARCHAR(255) NOT NULL

	CONSTRAINT [pk_TRANSACTIONS_TRANSACTION_ID] PRIMARY KEY CLUSTERED (TRANSACTION_ID)
);
GO

ALTER TABLE dbo.TRANSACTIONS
WITH CHECK ADD CONSTRAINT [fk_TRANSACTIONS_to_TRANSACTION_TYPES_TRANSACTION_TYPE_ID] FOREIGN KEY (TRANSACTION_TYPE_ID)
REFERENCES dbo.TRANSACTION_TYPES (TRANSACTION_TYPE_ID);
GO

ALTER TABLE dbo.TRANSACTIONS
WITH CHECK ADD CONSTRAINT [fk_TRANSACTIONS_to_PAYMENT_ACCOUNTS_PAYMENT_ACCOUNT_ID] FOREIGN KEY (PAYMENT_ACCOUNT_ID)
REFERENCES dbo.PAYMENT_ACCOUNTS (PAYMENT_ACCOUNT_ID);
GO

ALTER TABLE dbo.TRANSACTIONS
ADD CONSTRAINT [df_IS_DEBIT_TRUE] DEFAULT 1 FOR IS_DEBIT;
GO

