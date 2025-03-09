# Invoice Management Application

This project is a web-based Invoice Management Application designed to allow users to view, search, filter, and paginate invoices efficiently. The application consists of a React frontend and a Go backend, providing a seamless user experience for managing invoices.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Configure API endpoint

Ensure that the frontend is set to communicate with the correct backend API endpoint. Update the API base URL in the api/invoices.ts file if necessary: [http://localhost:8080](http://localhost:8080)

## Usage

- **Viewing Invoices:** The main page displays a list of invoices with their details.
- **Searching Invoices:** Use the search bar to filter invoices by service name or invoice number.
- **Sorting Invoices:** Click on the column headers to sort invoices by date or amount.
- **Pagination:** Navigate through pages using the pagination controls at the bottom of the table.
- **Invoice Details:** Click the "Show" button on an invoice row to view detailed information in a modal.
