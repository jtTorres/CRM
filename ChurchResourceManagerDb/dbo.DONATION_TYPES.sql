﻿CREATE TABLE [dbo].[DONATION_TYPES]
(
	DONATION_TYPE_ID TINYINT NOT NULL,
	[DESCRIPTION] VARCHAR(80) NOT NULL

	CONSTRAINT [pk_DONATION_TYPES_DONATION_TYPE_ID] PRIMARY KEY CLUSTERED (DONATION_TYPE_ID)
);
GO
