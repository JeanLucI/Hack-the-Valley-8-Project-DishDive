# Hack-the-Valley-8-Project-DishDive

DishDive is a user-friendly application designed to enhance your dining experience by understanding your food preferences and offering personalized food suggestions. This app utilizes MongoDB for seamless data storage and leverages OpenAI's cutting-edge AI capabilities to provide you with the perfect meal recommendations.

**Running React Frontend**

Dependencies are found in package.json dive-dash file and more React app running instructions in the README.md in that file as well

**Running Flask Backend**
- pip install pipenv (make sure it's within a python scripts folder that is part of a PATH)
- then pipenv install the rest of the packages that are found in Pipfile in the backend directory
- API key is needed for openai and MONGO_URI string needed for MongoDB and need to be stored in a .env file in the backend directory
- Use OPENAI_API and MONGO_URI as the const names for the environment variables
- pipenv shell in the backend directory
- flask run in the directory to finally start running your server

**Devpost:**
https://devpost.com/software/dishdive

**Demonstration:**
https://youtu.be/yZszC1P5IYk
