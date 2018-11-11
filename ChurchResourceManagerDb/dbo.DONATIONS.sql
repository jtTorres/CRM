﻿CREATE TABLE [dbo].[DONATIONS]
(
	DONATION_ID INT NOT NULL IDENTITY (1,1),
	DONATION_DATE DATE NOT NULL,
	DONATION_TYPE_ID TINYINT NOT NULL,
	MEMBER_ID INT NULL,
	DONATION_AMOUNT MONEY NOT NULL,
	COMMENTS VARCHAR(255) NULL

	CONSTRAINT [pk_DONATIONS_DONATION_ID] PRIMARY KEY CLUSTERED (DONATION_ID)
)
GO

ALTER TABLE dbo.DONATIONS
ADD CONSTRAINT [fk_DONATIONS_to_DONATION_TYPES_DONATION_TYPE_ID] FOREIGN KEY (DONATION_TYPE_ID)
REFERENCES dbo.DONATION_TYPES (DONATION_TYPE_ID);
GO

ALTER TABLE dbo.DONATIONS
ADD CONSTRAINT [fk_DONATIONS_to_MEMBERSHIP_MEMBER_ID] FOREIGN KEY (MEMBER_ID)
REFERENCES dbo.MEMBERSHIP (MEMBER_ID);
GO