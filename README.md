# Assessment Project

This project is a real-time cryptocurrency data tracking application. It periodically updates cryptocurrency data in a database using a third-party API and fetches the updated data on the frontend every 10 seconds.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Docker**: Make sure Docker is installed and running on your machine.
- **Node.js**: You should be using Node.js version `20.9.0`. If you have `nvm` (Node Version Manager) installed, the correct version will be automatically installed and used.

## Setup Instructions

Follow these steps to set up and run the project:

1. **Clone the repository** to your local machine:

```bash
    git clone git@github.com:HardikRathod123/fomofactory-assessment.git
    cd fomofactory-assessment
```

2. **Install dependencies and start Docker containers:**
   Run the following command to install all necessary npm packages, copy environment variables, and start Docker containers:

```bash
    npm run setup
```

3. **Start the development server:**
   After completing the setup, start the development server with:

```bash
    npm run dev
```

4. You're good to go! Open your browser and navigate to http://localhost:3000 to view the application.

## Functionality

- Data Update: The application fetches cryptocurrency data from a third-party API and updates it in the database every 10 seconds.
- Data Fetch: The frontend periodically fetches the latest data from the database at 10-second intervals, ensuring real-time updates.

## Additional Information

- Environment Variables: The project uses a .env.local file for environment variables. These are automatically copied from .env.example during setup.
- Docker Configuration: Ensure Docker is running as it will be used to manage the database and any other necessary services.

## Troubleshooting

If you encounter any issues during setup or while running the application, please check the following:

- Ensure Docker is running correctly and no other services are using the ports required by this project.
- Verify that you are using the correct Node.js version (20.9.0). If you have nvm installed, you can run nvm use to switch to the correct version.
