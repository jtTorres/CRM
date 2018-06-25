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