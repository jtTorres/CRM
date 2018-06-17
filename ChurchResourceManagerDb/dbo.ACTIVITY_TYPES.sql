﻿CREATE TABLE [dbo].[ACTIVITY_TYPES]
(
	ACTIVITY_TYPE_ID TINYINT NOT NULL,
	[DESCRIPTION] VARCHAR(80) NOT NULL

	CONSTRAINT [pk_ACTIVITY_TYPES_ACTIVITY_TYPE_ID] PRIMARY KEY CLUSTERED (ACTIVITY_TYPE_ID)
);
GO