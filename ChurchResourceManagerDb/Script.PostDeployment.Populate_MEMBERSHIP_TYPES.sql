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