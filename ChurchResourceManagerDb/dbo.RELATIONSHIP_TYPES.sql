﻿CREATE TABLE [dbo].[RELATIONSHIP_TYPES]
(
	RELATIONSHIP_TYPE_ID TINYINT NOT NULL,
	[DESCRIPTION] VARCHAR(80) NOT NULL

	CONSTRAINT [pk_RELATIONSHIP_TYPES_RELATIONSHIP_TYPE_ID] PRIMARY KEY CLUSTERED (RELATIONSHIP_TYPE_ID)
);
GO
