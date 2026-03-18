# Intent: Vote Initiation App

## Objective

Create a new directory named:

    vote-initiation-app

Generate a complete React + java application using Vite. This application shal be used by International Monitory Fund (IMF) for the members to vote on resolution  

---

## Functional Requirements 
### 1. UI has 7 screens with guidelines below
- Use the logo and look and feel from https://www.imf.org/en/home 
- send the state/details to Backend after SUBMIT button is clicked on every screen, so backend can maintain the state across page navigations.
- ALL the screens, except screen 7, should have SUBMIT and CANCEL buttons at the bottom of the screen.  
- Cancel button shall reset that specific page to initial state of the same page
- Submit button will send the user selected option to the Backend and takes you to the next screen in UI
- There will be no BACK button for user to navigate to previous screen
- screen 1 for SIGNIN: User should be able to login to the application with username "admin" and password "admin".
- screen 2 for "VOTE NUMBER": TextBox that prompts user for 6 digit alphanumeric code
- screen 3 for "META-DATA": TextBox for 1)Title, 2) Description, 3) Deadline. Default values are listed below and they should be editable by user 
   -- Deadline: October 25th 2026
   -- Title: "Fiscal Responsibility-2026" 
   -- Description: "The IMF is advising countries to implement growth-friendly fiscal adjustments to reduce high public debt, which is expected to rise further"
- screen 4 for "VOTING-TYPE": Radio button group for one of the 2 choices 1)RESOLUTION VOTE, or 2)ELECTION VOTE. For now only RESOLUTION VOTE is supported; hence grey out ELECTION VOTE
- screen 5 for DETAILS: if it is "RESOLUTION VOTE": Have 1) a textbox for "RESOLUTION TEXT" and 2)upload functionality for a pdf document
- screen 6 for SUMMARY: Show the summay and details from screen 2, screen 3, screen 4, screen 5. Also show a new table of ELIGIBLE VOTING COUNTRIES which includes  USA, Canada, UK, Netherlands, UAE, Australia 
- screen 7. on clicking the SUBMIT button in screen 6, it should show the message "PROCESSING..." and show only "SIGNOUT" button. At this point, Backend should generate email with all the contents that were displayed in screen 6. 

---
### 2. Backend
- Use JDK 21 as baseline Java
- Use Java Spring Boot with Actuator Health Checks
- Use Lombok Annotations 
- Backend exposes REST API call to communicate with each screen in UI
- After screen 6 of UI is submitted, it calls backend which generates  email with all the details and PDF attachment, to following two addresses
       - xx@wipro.com
       - ss@gmail.com and app password is "vv"


---

### 3. State Management
- Backend and Front End manages the state as user navigates between all the screens that UI shows
- When Backend API is invoked for screen 6 SUMMARY, Backend also generates email with the all the details and pdf file as attachment
 

---

### 4. Assets

Create:
 
- Use the logo from Use the logo and look and feel from https://www.imf.org/en/home 
- Every page should have above/same logo
- Use simple SVG for submit and cancel buttons.

---

### 5. Styling

- Centered layout
- Clean modern UI
- Responsive
- Use the logo and look and feel from https://www.imf.org/en/home

---

### 6. Project Structure

vote-initiation-app/
   
    

---

### 7. Add

- README.md  