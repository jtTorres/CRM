/*
Post-Deployment Script Template							
--------------------------------------------------------------------------------------
 This file contains SQL statements that will be appended to the build script.		
 Use SQLCMD syntax to include a file in the post-deployment script.			
 Example:      :r .\myfile.sql								
 Use SQLCMD syntax to reference a variable in the post-deployment script.		
 Example:      :setvar TableName MyTable							
			   SELECT * FROM [$(TableName)]					
--------------------------------------------------------------------------------------
*/


--===================
--ADD CONTACT METHODS
--===================
MERGE INTO dbo.CONTACT_METHODS AS TARGET
USING
(
	VALUES
	(0, 'Do Not Contact'),
	(1, 'Home Phone'),
	(2, 'Cell Phone'),
	(3, 'Email')
)
AS SOURCE (CONTACT_METHOD_ID, [DESCRIPTION])
ON TARGET.CONTACT_METHOD_ID = SOURCE.CONTACT_METHOD_ID

WHEN NOT MATCHED BY TARGET THEN
INSERT (CONTACT_METHOD_ID, [DESCRIPTION])
VALUES 
(CONTACT_METHOD_ID, [DESCRIPTION]);
GO

--==================
--ADD DONATION TYPES
--==================
MERGE INTO dbo.DONATION_TYPES AS TARGET
USING
(
	VALUES
	(1, 'Tithes'),
	(2, 'Offerings'),
	(3, 'Special Offering'),
	(4, 'Missions'),
	(5, 'Member Needs'),
	(6, 'Hall Rental')
)
AS SOURCE (DONATION_TYPE_ID, [DESCRIPTION])
ON TARGET.DONATION_TYPE_ID = SOURCE.DONATION_TYPE_ID

WHEN NOT MATCHED BY TARGET THEN
INSERT (DONATION_TYPE_ID, [DESCRIPTION])
VALUES (DONATION_TYPE_ID, [DESCRIPTION]);
GO

--=============
--ADD LOCATIONS
--=============
MERGE INTO dbo.LOCATIONS AS TARGET
USING
(
	VALUES
	(0, 'Unknown', 'Unknown', 'Unknown', '', '')
)
AS SOURCE (LOCATION_ID, ADDRESS1, ADDRESS2, CITY, [STATE], ZIP_CODE)
ON TARGET.LOCATION_ID = SOURCE.LOCATION_ID

WHEN NOT MATCHED BY TARGET THEN 
INSERT (LOCATION_ID, ADDRESS1, ADDRESS2, CITY, [STATE], ZIP_CODE)
VALUES
(LOCATION_ID, ADDRESS1, ADDRESS2, CITY, [STATE], ZIP_CODE);
GO

--==================
--ADD MARITAL STATUS
--==================
MERGE INTO dbo.MARITAL_STATUS AS TARGET
USING
(
	VALUES
	(0, 'Unknown'),
	(1, 'Single'),
	(2, 'Married'),
	(3, 'Divorced'),
	(4, 'Widowed')
)AS SOURCE (MARITAL_STATUS_ID, [DESCRIPTION])
ON TARGET.MARITAL_STATUS_ID = SOURCE.MARITAL_STATUS_ID

WHEN NOT MATCHED BY TARGET THEN
INSERT (MARITAL_STATUS_ID, [DESCRIPTION])
VALUES
(MARITAL_STATUS_ID, [DESCRIPTION]);
GO

--=================
--ADD MEMBER GROUPS
--=================
MERGE INTO dbo.MEMBER_GROUPS AS TARGET
USING
(
	VALUES
	(0, 'Unknown'),
	(1, 'Adults'),
	(2, 'Youth'), 
	(3, 'Children')
)
AS SOURCE (GROUP_ID, [DESCRIPTION])
ON TARGET.GROUP_ID = SOURCE.GROUP_ID

WHEN NOT MATCHED BY TARGET THEN
INSERT (GROUP_ID, [DESCRIPTION])
VALUES
(GROUP_ID, [DESCRIPTION]);
GO

--====================
--ADD MEMBERSHIP_TYPES
--====================
MERGE INTO dbo.MEMBERSHIP_TYPES AS TARGET
USING
(
	VALUES
	(0, 'Unknown'),
	(1, 'Active'),
	(2, 'Passive')
) AS SOURCE (MEMBERSHIP_TYPE_ID, [DESCRIPTION])
ON TARGET.MEMBERSHIP_TYPE_ID = SOURCE.MEMBERSHIP_TYPE_ID

WHEN NOT MATCHED BY TARGET THEN
INSERT (MEMBERSHIP_TYPE_ID, [DESCRIPTION])
VALUES
(MEMBERSHIP_TYPE_ID, [DESCRIPTION]);
GO

--=================
--ADD UTILITY BILLS
--=================
MERGE INTO dbo.UTILITY_BILLS AS TARGET
USING
(
	VALUES
	(1, 'Electricity'),
	(2, 'Water'),
	(3, 'Gas')
)
AS SOURCE (UTILITY_BILL_ID, [DESCRIPTION])
ON TARGET.UTILITY_BILL_ID = SOURCE.UTILITY_BILL_ID

WHEN NOT MATCHED BY TARGET THEN
INSERT (UTILITY_BILL_ID, [DESCRIPTION])
VALUES
(UTILITY_BILL_ID, [DESCRIPTION]);
GO

--=====================
--ADD TRANSACTION TYPES
--=====================
MERGE INTO dbo.TRANSACTION_TYPES AS TARGET
USING
(
	VALUES
	(1, 'Pastor Salary'),
	(2, 'Church Supplies'),
	(3, 'Pastor Expenses'),
	(4, 'Utility Bills'),
	(5, 'Rent'),
	(6, 'Preacher Offerings'),
	(7, 'Member Needs'),
	(8, 'Tithes of Tithes'),
	(9, 'Miscellaneous')
)
AS SOURCE (TRANSACTION_TYPE_ID, [DESCRIPTION])
ON TARGET.TRANSACTION_TYPE_ID = SOURCE.TRANSACTION_TYPE_ID

WHEN NOT MATCHED BY TARGET THEN
INSERT (TRANSACTION_TYPE_ID, [DESCRIPTION])
VALUES (TRANSACTION_TYPE_ID, [DESCRIPTION]);
GO