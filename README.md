Running the Movie App Locally
To run this Movie App locally on your machine, follow these steps:

Prerequisites
Before you begin, ensure you have the following software installed on your computer:

Node.js: You need Node.js to run the application.
npm: npm is the Node.js package manager and comes bundled with Node.js.
Clone the Repository
Open your terminal (command prompt) and navigate to the directory where you want to clone the repository.

Run the following command to clone the repository to your local machine:

bash
Copy code
git clone https://github.com/yxngshifu/watch
Replace your-username with your GitHub username.

Install Dependencies {axios,react-router-dom}
Navigate to the project directory using the following command:

bash
Copy code
cd movie-app
Install the project dependencies using npm:

bash
Copy code
npm install
Configure API Key (if needed)
If you are working with an API that requires an API key, you should add it to your project's environment variables. Create a .env file in the project root and add your API key as follows:

plaintext
Copy code
REACT_APP_API_KEY=your-api-key
Replace your-api-key with your actual API key. Ensure that you don't share your API key publicly; include .env in your .gitignore file.

Run the Application
Once you have completed the above steps, you can run the Movie App locally:

Start the development server:

bash
Copy code
npm start
Open your web browser and go to http://localhost:3000/ to view the Movie App.

Using the Movie App
You can search for movies by entering keywords in the search bar and clicking "Search."
Click on a movie card to see more details.
To favorite a movie, click the heart icon on the movie card. Click it again to remove it from your favorites.
Stopping the Application
To stop the development server and terminate the application, press Ctrl + C in the terminal where the server is running

API_KEY = 'e31c181561c78ddc082f76db470776f5';