# AngularApp2
Angular Development Assignment 2 - Reservations with database

1. Test updating the reservation with valid data.
    -- Record added - PASSED

2. Test updating the reservation with invalid / empty data.
    -- Record not added - PASSED 

3. Test adding new reservation with valid data.
    -- Record added - PASSED

4. Test adding new reservation with invalid / empty data.
    -- Record not added - PASSED

5. Test updating the image with an invalid file type.  
    -- Allows updating with invalid file format - FAILED 
    -- ACTION NEEDED: Do not allow invalid file types. 
    ***UPDATE***
    Does not allow adding or updating invalid file format for image

6. Test the form submission after filling input fields, 
   selecting image and  then hitting cancel button.
    -- Record not added - PASSED

7. Test if the reservation updates appropriately when adding reservation. 
    -- List updates appropriately. - PASSED
    
8. Test if the reservation updates appropriately when updating reservation. 
    -- List updates appropriately. - PASSED

9. Test the number of characters allowed in add/update a reservation.
    -- Validation added to allow maximum of 50 characters for the reservation name.

10. Test if it allows adding empty data to the database
    -- Record not added, it shows error to fill all fields - PASSED