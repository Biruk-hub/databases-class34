Exercise 1 : Normalization

The manager of the dinner club would like to manage the information system that assists him to keep track of the dinners had by members. Because the manager is not an expert of Information Systems, (s)he uses the following table to store the information. Please help the manger by using the knowledge of database normal forms. Save all answers in a text file / MD file.

    What columns violate 1NF?
    What entities do you recognize that could be extracted?
    Name all the tables and columns that would make a 3NF compliant solution.

+-----------+---------------+----------------+-----------+-------------+------------+-------------------+-----------+------------------+
| member_id | member_name   | member_address | dinner_id | dinner_date | venue_code | venue_description | food_code | food_description |
+-----------+---------------+----------------+-----------+-------------+------------+-------------------+-----------+------------------+
|         1 | Amit          | 325 Max park   | D00001001 | 2020-03-15  | B01        | Grand Ball Room   | C1, C2    | Curry, Cake      |
|         2 | Ben           | 24 Hudson lane | D00001002 | 2020/03/15  | B02        | Zoku Roof Top     | S1, C2    | Soup, Cake       |
|         3 | Cristina      | 516 6th Ave    | D00001002 | 2020/03/15  | B02        | Zoku Roof Top     | S1, C2    | Soup, Cake       |
|         4 | Dan           | 89 John St     | D00001003 | 20-03-2020  | B03        | Goat Farm         | P1, T1, M1| Pie, Tea, Mousse |
|         1 | Amit          | 325 Max park   | D00001003 | 20-03-2020  | B03        | Goat Farm         | P1, T1, M1| Pie, Tea, Mousse |
|         3 | Cristina      | 516 6th Ave    | D00001004 | Mar 25 '20  | B04        | Mama's Kitchen    | F1, M1    | Falafal, Mousse  |
|         5 | Gabor         | 54 Vivaldi St  | D00001005 | Mar 26 '20  | B05        | Hungry Hungary    | G1, P2    | Goulash, Pasca   |
|         6 | Hema          | 9 Peter St     | D00001003 | 01-04-2020  | B03        | Goat Farm         | P1, T1, M1| Pie, Tea, Mousse |
+-----------+---------------+----------------+-----------+-------------+------------+-------------------+-----------+------------------+



Solution

1NF => 1st normal form

    Rules

        * All data must be atomic (every column should only contain a single value)
        * Repeating columns are not allowed
        * Prevent duplicate records (by applying primary keys)
        * Attribute domain should not change (all values in a column must be of the same kind or type).
    
    Columns that break the rule

        1) "member_id", "member_name", "member_address" are repeating data
        2) there is no primary key on the table
        3) "member_address" has multiple value e.g room/house number and address
        4) "dinner_date" accepts different type of data
        5) "food_code" multiple value on one column
        6) "food_description" contain multiple value
        7) "dinner_id" repeating data

    Solution

        1) create Member table. { id(PK), name, location(FK)}
        2) create Order table. { id(PK), dinner_id(FK), member_id(FK)}
        3) create Dinner table. {id, dinner_date(data), venue_code(FK)}
        4) create FoodDinner table. {id, dinner_id(FK), food_id(Fk)}
        5) create Food table. { food_code(PK), food_description}
        6) create Venue table. { venue_code(PK), venue_description}

        <------ Joining/Junction Table----->
        FoodDinner. {id, dinner_id(FK), food_id(Fk)}
        Order. { id(PK), dinner_id(FK), member_id(FK)}

    Output

    1) Member table

    +----------+------------+-------------+--------------+-------------+
    |   id     |    name    | address     | house_number | postal_code | 
    +----------+------------+-------------+--------------+-------------+

    2) Order table

    +------+-----------+------------+
    | id   | dinner_id | member_id  |
    +------+-----------+------------+

    3) Dinner table

    +------+-----------+------------+
    | id   | date_date | venue_code |
    +------+-----------+------------+

    4) FoodDinner table

    +------+-----------+----------+
    | id   | dinner_id | food_id  |
    +------+-----------+----------+

    5) Food table
    +-----------+------------------+
    | food_code | food_description |
    +-----------+------------------+

    6) Venue table
    +-----------+-------------------+
    | venue_code| venue_description |
    +-----------+-------------------+
