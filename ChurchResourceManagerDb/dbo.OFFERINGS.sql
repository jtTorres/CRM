﻿CREATE TABLE [dbo].[OFFERINGS]
(
	[OFFERING_ID] INT NOT NULL IDENTITY(1,1),
	OFFERING_DATE DATE NOT NULL,
	DONATION_TYPE_ID TINYINT NOT NULL,
	OFFERING_AMOUNT SMALLMONEY NOT NULL,
	COMMENTS VARCHAR(1000) NULL

	CONSTRAINT [pk_OFFERINGS_OFFERING_ID] PRIMARY KEY CLUSTERED (OFFERING_ID)
);
GO

ALTER TABLE dbo.OFFERINGS
ADD CONSTRAINT [df_DONATION_TYPE_ID_OFFERINGS] DEFAULT 2 FOR DONATION_TYPE_ID;
GO

ALTER TABLE dbo.OFFERINGS
ADD CONSTRAINT [fk_OFFERINGS_to_DONATION_TYPES_DONATION_TYPE_ID] FOREIGN KEY (DONATION_TYPE_ID)
REFERENCES dbo.DONATION_TYPES (DONATION_TYPE_ID);
GO