﻿CREATE TABLE [dbo].[UTILITY_BILLS]
(
	UTILITY_BILL_ID TINYINT NOT NULL,
	[DESCRIPTION] VARCHAR(80) NOT NULL

	CONSTRAINT [pk_UTILITY_BILLS_UTILITY_BILL_ID] PRIMARY KEY CLUSTERED (UTILITY_BILL_ID) 
);
GO
