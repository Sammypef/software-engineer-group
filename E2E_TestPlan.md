E2E Test Plan
Scenario ID: E2E-001
Title: User login and dashboard access (Google OAuth)
Preconditions: Google OAuth configured
Steps:
1) Open home page (/) 
2) Click "Sign in with Google"
3) Complete Google OAuth callback
4) Navigate to /dashboard
5) Verify user name/email visible
Expected: Dashboard shows authenticated user info

Scenario ID: E2E-002
Title: User login and dashboard access (Email + Password)
Preconditions: User account exists
Steps:
1) Open home page (/login)
2) Click "Sign in with Google"
3) After callback, navigate to /dashboard
4) Verify user name/email visible
Expected: Dashboard shows authenticated user info

Scenario ID: E2E-003
Title: Redirect unauthenticated user to login page
Preconditions: User not logged in 
Steps:
1) Open /home directly
2) Observe page behavior 
Expected: User is redirected to /login page

---

Scenario ID: E2E-004
Title: Play music normally
Preconditions: User logged in
Steps:
1) Navigate to /home, or /song/:id
2) Select any available song
3) Click “Play” button
4) Observe that music starts playing and controls (pause/next) work 
Expected: Dashboard shows authenticated user info

---

Scenario ID: E2E-005
Title: Verify homepage elements and navigation
Preconditions: User is on the home page
Steps:
1) Open home page (http://localhost:5173)
2) Check that main elements are visible (logo, home button, lessons button, music button, profile button, logout button)
3) Click on "Profile" or another accessible link
4) Verify the page navigates correctly 
Expected:
All main homepage elements are visible
Navigation links work as expected

---