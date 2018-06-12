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