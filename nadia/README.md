#https://www.linkedin.com/learning/node-js-testing-and-code-quality

# Nadia’s Garden Restaurant

This is a Node.js and Express website that accepts and lists restaurant reservations. Improve it with the lynda.com course, "Node.js: Testing and Code Quality" by Jon Peck.

The backend contains intentional mistakes, like weak validation on email addresses. Inconsistencies in coding style are also intentional.

## npm config set -g production false

## Getting Started

```bash
npm install
npm start
```

The server runs on port 3000.

There are three routes:

- http://localhost:3000/ - homepage
- http://localhost:3000/reservations - submit a reservation booking request
- http://localhost:3000/admin - view all booking requests; basic auth login/password `admin`

The server persists using a SQLite3 database named `database.sqlite` in the site root.

## Development

This project uses EditorConfig to standardize text editor configuration.
Visit http://editorconfig.org for details. 

This project uses ESLint to detect suspicious code in JavaScript files.
Visit http://eslint.org for details.

### Debugging

This project uses https://www.npmjs.com/package/debug for development logging. To start `nodemon` and enable logging:

```bash
npm run debug
```

## FAQ

- Q: Why didn't you store the time submitted?
  - A: I wanted to reduce the number of fields and simplify testing.
- Q: Wouldn't it be easier if the form submitted a datetime string instead of building and parsing one?
  - A: Yes, it would, but the form logic is simpler. Either way, someone has to do the work.
- Q: Why did you mix a callback and a Promise in `lib/reservations.js`?
  - A: `Joi` doesn't support Promises, but it does support callbacks. I wanted to show how to test both kinds of asynchronous code.
- Q: How'd you handle cross-platform support?
  - A: Avoided relative directories, used `cross-env` to transform environmental variables.

## Credits

This is an adaptation of a WordPress site hosted at http://587672.youcanlearnit.net/

The conversion:

- Archive original with wget
- Strip out unrelated functionality
- Reorganize JavaScript and Stylesheets into logical directories
- Converted HTML into Jade / Pug templates using http://html2jade.org/

The front end should be mostly unchanged from the original.

## eslint
- npm run eslint . => current directory
- npm run -s eslint app.js => specific file
-  on atom linter-eslint package

- examples :
   github.com/airbnb/javascript
   github.com/standard/eslint-config-standard
   github.com/google/eslint-config-google
   github.com/dustinspecker/awesome-eslint


- mocha recursive:
  npm test -- --help / mocha --help
  npm test -- --recursive / mocha --recursive
  create a .opts file and place the command
  
  -- Testing:
  
  This project uses Mocha and Chai for testing.
  Visit http://mochajs.org and http://chaijs.com for details.

  To execute tests:

  ```bash
  npm test
  ```
  
  
  Stubs, Spies, Mocks:
  ## https://semaphoreci.com/community/tutorials/best-practices-for-spies-stubs-and-mocks-in-sinon-js
  
    stubs: 
       replace a component and return a hardcoded response
       Temporarily replaces real component
       verifies input directly
       
       ex: faking a db query database query, disable logging
       
       A stub will not respond to a request, unless it's programmed to, which is a good starting place. A stub can temporarily replace a real component, so the original can always be restored as needed. In terms of usefulness, a stub can be used to verify indirect input. For example, you can fake a database query response by specifying a hard-coded response. You can also disable logging by replacing the logger with an empty stub, so calls to it just log to nothing. A test spy, like its name implies, observes interactions with tested code.
       
       
    
    Spies:
      a component :
        number of times it is called
        how it is called
        what it responded with
        
      verifies indirect o/p 
      
      ex: to see if a validator was returned with transformed values
      
      Primarily spies are used to count the number of times a component was called, along with how it was called, and what it responded with. In this manner, spies verify the indirect outputs of components. A test spy can either be added to an existing method in order to see how it behaves, or replace it completely, like a stub. For example, a spy can determine if the validator was called once with transformed values. Mock objects are interesting. They're preprogrammed with expectations of how something is supposed to work and completely leaves out the responses  
      
      
    Mock Objects:
      
      A mock verifies behavior, specifically the expectations around how something is called. This includes with what arguments and how many times. If those expectations are not met then when verified a mock will fail the test. A mock does not return anything, which differentiates it from a stub. You'd want to use a mock when you want to verify the method in which something is being used. For example, you'd use a mock when verifying that saving only calls the database once. There is some definite similarities between mock objects and test spies, and the demonstrations later in the chapter should help clarify the difference.
      
    Fake Objects and Dummy Object:
      
      A fake object is a working implementation of a component that takes a shortcut, typically for performance reasons. Fake objects are not usable in production and are intended only for testing purposes. For example, you could replace a database implementation with a simple in-memory array with the same API. That'd be more performant, but you'd want to use a real database in production. The final variation of a test double is a dummy object, which just provides a parameter for a tested method. For example, a dummy object can be used to test reservation validation using arbitrary input that doesn't change.
      
    Test Doubles Summary:
      
      We've already done this when we created a reservation, just without the label of a dummy object. Let's review and compare the different test doubles. A test stub verifies indirect inputs by providing a controlled response. A test spy records indirect outputs by reporting on how the request was made for later verification. A mock object verifies indirect outputs by setting up expectations and throwing an exception if it's used unexpectedly. A fake object just runs faster with less functionality.
      
      test patterns:
        xunitpatterns.com/Test%20Double.html
        martinfowler.com/bliki/TestDouble.html 
        
  
  Dependency Manipulation Libraries With Sinon.js
    Mockery
    Proxyquire
    Rewire    
    
    
# Code Coverages
  istanbul (nyc)
  
   cmd:
     npm run -s coverage    
     
# Functional Testing
    - chaiHttp
    - superAgent
    - phantom.js
    - seliniumWebDriver     
    
    
# CI
  setup:
    jenkins
  
  Servise:
    Travis
    circle CI
    GitLab
  