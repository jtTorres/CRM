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