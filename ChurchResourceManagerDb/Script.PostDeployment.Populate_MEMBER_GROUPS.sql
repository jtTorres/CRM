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