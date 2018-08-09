# Stacks #
* Yii Framwork
* React
* MongoDB
### TO DO ###
[ ] Remove extra file(defaults controller and etc) from Yii
## Back-end ##  
In backend directory run the following commands:  
`composer install`  
`./yii serve`    

Output:  
> Server started on http://localhost:8080/  
> Document root is "/home/mehrdad/www/tracker/backend/web"  
> Quit the server with CTRL-C or COMMAND-C.    

you can run `./yii serve -p PORT`  
Notice to the port of host (8080 in my case)    

Common problems:  
    • Composer is not updated or installed  
      For Linux and Mac:  
        `curl -sS https://getcomposer.org/installer | php mv composer.phar /usr/local/bin/composer`  
      For windows run https://getcomposer.org/Composer-Setup.exe  
    • Assets are not up to date  
      `composer global require "fxp/composer-asset-plugin:^1.4.2"`  
## Front-end ##
In frontend directory run the following commands:  
`npm install`  
Check the src/config.json and make sure the address is written with right port(8080 from backend part).  
Then:  
`npm run build`  
`npm install serve -g`  
`serve -s build`  
and open the served address(probably http://localhost:5000)  
Or:  
`npm start`  
and open http://localhost:3000  
## Data ##
I used MongoDB here, if you want to set authentication for database edit backend/config/web.php find mongodb and enter username and password.
Restore the data directory using the following command:  
`mongorestore -d tracker /path/to/data/directory`  
