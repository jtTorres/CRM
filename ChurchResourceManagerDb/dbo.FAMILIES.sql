﻿CREATE TABLE [dbo].[FAMILIES]
(
	FAMILY_ID INT NOT NULL IDENTITY (1,1),
	NAME VARCHAR(80) NOT NULL

	CONSTRAINT [pk_FAMILIES_FAMILY_ID] PRIMARY KEY CLUSTERED (FAMILY_ID)
);