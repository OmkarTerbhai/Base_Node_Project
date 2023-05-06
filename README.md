This is a base NodeJS project template which anyone can use as it hs been prepared by keeping some of the most important code principles and project management recommendations.

'src':- All the actual source code excluding the tests. You might want to make separate tests folder.

Inside the source folder.

1. config:- In this folder, anything and everything regarding configuration or setup of a library or module can be done. We also setup the logging library is done here.

2. routes:- In the routes folder we register a route and the corresponding middleware and the controller which will handle that route.

3. middlewares:- They are going to intercept the incoming requests where we can write our validators and authenticators.

4. controllers:- They are the last middlewares. They actually call the business logic layer and receive the incoming requests and data and then pass it to the business layer. And once business layer returns the output, we structure and prepare the response and send it back.

5. repositories:- This folder contains all the logic using which we can interact with the DB by writing queries. All the raw queries or ORM queries will go here. 

6. services:- Contains the actual business logic and interacts with data from the database.

7. utils:- Contains helper and error classes.

### Setup the project

-- Download this project
-- In the root directory, create a '.env' file and create the following environment variables.
 i. PORT Number
    e.g. 
        ```
        PORT=3400
        ```

-- Inside the src/config folder, create a file named 'config.json'