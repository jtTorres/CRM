﻿CREATE TABLE [dbo].[MEMBERSHIP]
(
	FAMILY_ID INT NULL,
	MEMBER_ID INT NOT NULL IDENTITY(1,1),
	FIRST_NAME VARCHAR(80) NOT NULL,
	MIDDLE_NAME CHAR(1) NULL,
	LAST_NAME VARCHAR(90) NOT NULL,
	DOB DATE NULL,
	GENDER CHAR(1) NULL,
	LOCATION_ID INT NULL ,
	MARITAL_STATUS_ID TINYINT NULL,
	GROUP_ID TINYINT NULL,
	PREFERRERD_CONTACT_METHOD TINYINT NULL,
	EXIT_DATE DATE NULL,
	MEMBERSHIP_STATUS_ID TINYINT NULL,
	LAST_MODIFIED_DATE DATETIME NOT NULL,
	RELATIONSHIP_TYPE_ID TINYINT NULL
	
	CONSTRAINT [pk_MEMBERSHIP_MEMBER_ID] PRIMARY KEY CLUSTERED (MEMBER_ID)
);
GO

ALTER TABLE dbo.MEMBERSHIP
ADD CONSTRAINT [fk_MEMBERSHIP_to_FAMILIES_FAMILY_ID] FOREIGN KEY (FAMILY_ID)
REFERENCES dbo.FAMILIES (FAMILY_ID);
GO

ALTER TABLE dbo.MEMBERSHIP
ADD CONSTRAINT [fk_MEMBERSHIP_to_LOCATIONS_LOCATION_ID] FOREIGN KEY (LOCATION_ID)
REFERENCES dbo.LOCATIONS (LOCATION_ID);
GO

ALTER TABLE dbo.MEMBERSHIP
ADD CONSTRAINT [fk_MEMBERSHIP_to_MARITAL_STATUS_MARITAL_STATUS_ID] FOREIGN KEY (MARITAL_STATUS_ID)
REFERENCES dbo.MARITAL_STATUS (MARITAL_STATUS_ID);
GO

ALTER TABLE dbo.MEMBERSHIP
ADD CONSTRAINT [fk_MEMBERSHIP_to_MEMBER_GROUPS_GROUP_ID] FOREIGN KEY (GROUP_ID)
REFERENCES dbo.MEMBER_GROUPS (GROUP_ID);
GO

ALTER TABLE dbo.MEMBERSHIP
ADD CONSTRAINT [fk_MEMBERSHIP_to_MEMBERSHIP_STATUS_MEMBERSHIP_STATUS_ID] FOREIGN KEY (MEMBERSHIP_STATUS_ID)
REFERENCES dbo.MEMBERSHIP_STATUS (MEMBERSHIP_STATUS_ID);
GO

ALTER TABLE dbo.MEMBERSHIP
ADD CONSTRAINT [df_LAST_MODIFIED_DATE_CURRENT_DATE] DEFAULT GETDATE() FOR LAST_MODIFIED_DATE;
GO

ALTER TABLE dbo.RELATIONSHIP_TYPES
ADD CONSTRAINT [fk_MEMBERSHIP_to_RELATIONSHIP_TYPES_RELATIONSHIP_TYPE_ID] FOREIGN KEY (RELATIONSHIP_TYPE_ID)
REFERENCES dbo.RELATIONSHIP_TYPES (RELATIONSHIP_TYPE_ID);
GO