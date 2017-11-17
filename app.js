/**
 * app.js
 *
 * Use `app.js` to run your app without `sails lift`.
 * To start the server, run: `node app.js`.
 *
 * This is handy in situations where the sails CLI is not relevant or useful.
 *
 * For example:
 *   => `node app.js`
 *   => `forever start app.js`
 *   => `node debug app.js`
 *   => `modulus deploy`
 *   => `heroku scale`
 *
 *
 * The same command-line arguments are supported, e.g.:
 * `node app.js --silent --port=80 --prod`
 */
var path=require("path");
 
// Ensure we're in the project directory, so relative paths work as expected
// no matter where we actually lift from.
process.chdir(__dirname);


// Ensure a "sails" can be located:
(function() {
    
    // Chromis needs a "contents.js" file in the assets/res folder in order to load functions and components.  Generate
    // one now based on the current assets
    var ls;
    ls = require("child_process").exec("node "+path.join(__dirname,"assets","node","build.js"), function (error, stdout, stderr) {
        if (error) {
            console.log(error.stack);
            console.log('Error code: '+error.code);
            console.log('Signal received: '+error.signal);
        }
        console.log(stdout);
        console.log(stderr);
    });

    ls.on('exit', function (code) {
        // It did it's thang!
    });  
 
  // Lift Sails  
  var sails;
  try {
    sails = require('sails');
  } catch (e) {
    console.error('To run an app using `node app.js`, you usually need to have a version of `sails` installed in the same directory as your app.');
    console.error('To do that, run `npm install sails`');
    console.error('');
    console.error('Alternatively, if you have sails installed globally (i.e. you did `npm install -g sails`), you can use `sails lift`.');
    console.error('When you run `sails lift`, your app will still use a local `./node_modules/sails` dependency if it exists,');
    console.error('but if it doesn\'t, the app will run with the global sails instead!');
    return;
  }

  // Try to get `rc` dependency
  var rc;
  try {
    rc = require('rc');
  } catch (e0) {
    try {
      rc = require('sails/node_modules/rc');
    } catch (e1) {
      console.error('Could not find dependency: `rc`.');
      console.error('Your `.sailsrc` file(s) will be ignored.');
      console.error('To resolve this, run:');
      console.error('npm install rc --save');
      rc = function () { return {}; };
    }
  }


  // Start server
  sails.lift(rc('sails'));
  

 
})();
 
 /*
process.on('uncaughtException', function (err) {
    try {
        var msg='uncaughtException: '+err.message;
        msg+="</br>"+err.stack;
        if (sails) {
            sails.log.error('uncaughtException:', err.message);
            sails.log.error(err.stack);
            if (Utility) {
                Utility.diagnosticEmail(msg,"Application crash",function(){
                    process.exit(1);   //Forever should restart us;
                });      
            }   
            else {
                 process.exit(1);   //Forever should restart us;
            }        
            // Make sure we exit if the email sending fails
            setTimeout(function(){process.exit(1)},5000)   
        }
        else {
            console.log(msg);
            process.exit(1);   //Forever should restart us;
        }
    }
    catch(e) {
        if (sails) {
            sails.log.error("Error handling uncaught exception");
            sails.log.error(e);            
        }
        else {
            console.log("Error handling uncaught exception");
            console.log(e);  
        }
        process.exit(1);   //Forever should restart us;
    }
    
}) 
 */