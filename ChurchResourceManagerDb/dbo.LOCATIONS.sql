﻿CREATE TABLE [dbo].[LOCATIONS]
(
	LOCATION_ID INT NOT NULL IDENTITY(1,1),
	ADDRESS1 VARCHAR(255) NOT NULL,
	ADDRESS2 VARCHAR(255) NULL,
	CITY VARCHAR(50) NOT NULL,
	[STATE] CHAR(2) NOT NULL,
	ZIP_CODE VARCHAR(9) NOT NULL,

	CONSTRAINT [pk_LOCATIONS_LOCATION_ID] PRIMARY KEY CLUSTERED (LOCATION_ID)
);
