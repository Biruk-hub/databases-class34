Write down all the steps of conversion (installation, commands etc.) in a text file / MD file.

Steps to convert sql database to mongoDB 

1) open MYSQL workbench 
2) connect to admin privilege
3) Go to world database and select city , country, and country_language
4) right click and and select table data export and select csv file format then export
5) Open mongoDB cluster application
6) Create new database called world
7) Create new collection inside world database
8) click import data inside collection screen
9) select csv file from local directory
10) fix the data type for city_id and population into integer