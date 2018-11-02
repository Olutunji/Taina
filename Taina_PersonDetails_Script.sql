
use [Nigeria]

--DROP TABLE [dbo].[PersonDetail]

CREATE TABLE PersonDetail (
    PersonId bigint NOT NULL IDENTITY PRIMARY KEY,
	CreateDate datetime NOT NULL,
	FirstName nvarchar(30) NOT NULL,
    SurName nvarchar(40) NOT NULL,
	Gender nvarchar(6) NOT NULL,
	Email nvarchar(200) NOT NULL,
    PhoneNumber nvarchar(30) 
);

GO

---------------------------------------------------------------------------------------------------
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[InsertPersonDetail]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[InsertPersonDetail]
GO

CREATE PROCEDURE dbo.InsertPersonDetail
@CreationDate datetime,
@FirstName nvarchar(30), 
@SurName nvarchar(40), 
@Gender nvarchar(6),
@Email nvarchar(200), 
@PhoneNumber nvarchar(25)

AS

/*
----------------------------------------------------------------------------
-- Inserts a record of Person details to the table
-- 22 Oct 2018
----------------------------------------------------------------------------
*/

SET NOCOUNT ON

INSERT INTO [dbo].[PersonDetail]
           (
			 [CreateDate]
			,[FirstName]
			,[SurName]
			,[Gender]
			,[Email]
			,[PhoneNumber])
     VALUES
           (
			@CreationDate
			,@FirstName
			,@SurName
			,@Gender
			,@Email
			,@PhoneNumber)
GO

-----------------------------------------------------------------------------------------
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[GetPersonDetails]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[GetPersonDetails]
GO

CREATE PROCEDURE dbo.GetPersonDetails

AS

/*
----------------------------------------------------------------------------
-- Returns all the records of person details
-- 22 Oct 2018
----------------------------------------------------------------------------
*/

SET NOCOUNT ON

SELECT 
	PersonId,	
	CreateDate,	
	FirstName,    
	SurName,	
	Gender,
	Email,    
	PhoneNumber
FROM dbo.PersonDetail

GO

--------------------------------------------------------------------------------------------------------------
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[GetPersonDetail_ById]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[GetPersonDetail_ById]
GO

CREATE PROCEDURE dbo.GetPersonDetail_ById
@PersonId bigint
AS

/*
----------------------------------------------------------------------------
-- Returns one record of person details table
-- 22 Oct 2018
----------------------------------------------------------------------------
*/

SET NOCOUNT ON

SELECT 
	PersonId,	
	CreateDate,	
	FirstName,    
	SurName,	
	Gender,
	Email,    
	PhoneNumber
FROM dbo.PersonDetail
WHERE PersonId = @PersonId

GO

------------------------------------------------------------------------------------------------------
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[UpdatePersonDetail]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[UpdatePersonDetail]
GO

CREATE PROCEDURE dbo.UpdatePersonDetail
@PersonId bigint,
@CreationDate datetime,
@FirstName nvarchar(30), 
@SurName nvarchar(40), 
@Gender nvarchar(6),
@Email nvarchar(200), 
@PhoneNumber nvarchar(25)

AS

/*
----------------------------------------------------------------------------
-- Updates a record of Person detail for the Id passed
-- 22 Oct 2018
----------------------------------------------------------------------------
*/

SET NOCOUNT ON

UPDATE [dbo].[PersonDetail] 
	SET 
		[CreateDate] = @CreationDate,
		[FirstName] = @FirstName,
		[SurName] = @SurName,
		[Gender] = @Gender,
		[Email] = @Email,
		[PhoneNumber] = @PhoneNumber
	WHERE PersonId = @PersonId

GO

----------------------------------------------------------------------------------------------------------------
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[DeletePersonDetail]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[DeletePersonDetail]
GO

CREATE PROCEDURE dbo.DeletePersonDetail
@PersonId bigint

AS

/*
----------------------------------------------------------------------------
-- Deletes a record of Person detail for the Id passed
-- 22 Oct 2018
----------------------------------------------------------------------------
*/

SET NOCOUNT ON

DELETE FROM [dbo].[PersonDetail] 
	WHERE PersonId = @PersonId

GO
