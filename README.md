# Cookie CRUD

## Setup

Start up your server by running:

```bash
json-server --watch cookies.json
```

Navigate to ```"http://localhost:3000/cookies"``` in your browser to be sure your server is running and accurately reflecting the data in ```cookies.json```.

## Core Deliverables

![[Screenshot of completed challenge]]()

1. Fetch all the cookies and display them on the page. Each cookie should be contained in its own div with a class of ```cookie-card```. Each card should display the cookie's:
   - Name
   - Quantity
   - Image

2. Add a delete button to each cookie. When the button is clicked, the corresponding cookie should be removed from the page. The behavior does not have to persist; that is, it's okay if the cookie comes back when you refresh the page.

3. Set up the form so that the user can submit a new cookie with name, starting quantity, image, and delete button. The new cookie should show up on the cookie menu.

## Bonus Deliverables

4. Add a button to each cookie that decrements the quantity of that cookie by 1 each time it is clicked. The updated quantity does not have to persist; that is, it's okay if the cookie quantity resets when you refresh the page. Set up the button so that the displayed quantity never drops below zero.

5. Add a favorite button to each cookie that toggles between favorited and unfavorited when clicked.

6. Make all functionality persistent by updating the back end: POST new cookie, PATCH favorite, PATCH quantity, and DELETE.