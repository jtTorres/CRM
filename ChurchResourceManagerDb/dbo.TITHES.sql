﻿CREATE TABLE [dbo].[TITHES]
(
	TITHE_ID INT NOT NULL IDENTITY (1,1),
	MEMBER_ID INT NOT NULL,
	DONATION_TYPE_ID TINYINT NOT NULL,
	TITHE_DATE DATE NOT NULL,
	IS_CHECK BIT NOT NULL,
	CHECK_NUMBER SMALLINT NULL,
	TITHE_AMOUNT SMALLMONEY NOT NULL,
	COMMENTS VARCHAR(80) NULL

	CONSTRAINT [pk_TITHES_TITHE_ID] PRIMARY KEY CLUSTERED (TITHE_ID)
);
GO

ALTER TABLE dbo.TITHES
WITH CHECK ADD CONSTRAINT [fk_TITHES_to_MEMBERSHIP_MEMBER_ID] FOREIGN KEY (MEMBER_ID)
REFERENCES dbo.MEMBERSHIP(MEMBER_ID);
GO

ALTER TABLE dbo.TITHES
ADD CONSTRAINT [df_IS_CHECK_FALSE] DEFAULT 0 FOR IS_CHECK;
GO

ALTER TABLE dbo.TITHES
ADD CONSTRAINT [df_DONATION_TYPE_ID_TITHES] DEFAULT 1 FOR DONATION_TYPE_ID;
GO

ALTER TABLE dbo.TITHES
WITH CHECK ADD CONSTRAINT [fk_TITHES_to_DONATION_TYPES_DONATION_TYPE_ID] FOREIGN KEY (DONATION_TYPE_ID)
REFERENCES dbo.DONATION_TYPES (DONATION_TYPE_ID);
GO