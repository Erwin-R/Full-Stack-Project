CREATE TABLE customer(
    id SERIAL PRIMARY KEY ,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    gender TEXT NOT NULL,
    age INT NOT NULL
);

-- BELOW IS HOW WE USED TO DO IT
-- ALTER TABLE customer
--     ADD CONSTRAINT customer_email_unique UNIQUE (email);

-- ALTER TABLE customer
--     ADD COLUMN gender TEXT NOT NULL;

-- "the column can not be added because it's mandatory (not null) but unknown how to fill it for the existing rows."
-- ^we get this warning initially because we have existing customers that do not have the gender field. We could add a default value such as "MALE", "FEMALE", "GENDER"
-- or we could remove the NOT NULL and once we populate the genders then we alter the columns to be null


-- HOWEVER for the purposes of this course we will keep the NOT NULL since we are going to be deleting the customers from the database