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