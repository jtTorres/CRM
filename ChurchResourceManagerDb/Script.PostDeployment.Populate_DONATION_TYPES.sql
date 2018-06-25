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