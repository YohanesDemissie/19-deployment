#SOURCE
https://github.com/Iamheathsmith/17-bearer-auth/blob/lab-heath/lab-heath/README.md

 #GET 'ER RUNNING
 npm run start-db

 nodemon

 http POST http://localhost/api/v1/signup username=yoHector email='hector@gmnail.com' password=12345678

OR

new synatax:
http POST :3000/api/v1/signup username=hector email='meh@me.com' password=whatever

#ALWAYS RUN MANGODB FIRST


#MY DATAASE
http POST :3000/api/v1/signup username=tim email='tim@blah.com' password=stuff

#ID
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImQ3YTI1YmQzZTY4NThkZDc0ZDBmOTM0OTgwZmZhZmMyMmM1MjNiZWQxZDY3YWJjYTdjOWFjOTYxMDc3ZjZlNjY5NDljYjk5NzNkNWUwMDJkOWJmZjU3ZTE5ZTBjN2UzNGMzODM4NWI2YjhjOWMzNjlhNWZlMzZiOWEyNDAwMjg2IiwiaWF0IjoxNTE4MDU3NzQwfQ.pORbFKH5jXD5P6fZdH8fLQWXqHTx2PB6G8LlEXx7Ojo
#SIGN IN WORKS
http -a tim:stuff :3000/api/v1/signin

#WEDNESDAY
"paths" in mongodb documentaiton is a reference to 'PROPERTY'

#PART 2: Restful API and Authentication DATA FLOW
Authentication Routes
We have an endpoint for authentication: Sign in and Sign Up
Sign Up: Post Route: Body Parser
Sign In: Get Route: Basic Auth
Return: Json Web Token :

Gallery Routes
C.R.U.D: All Require Token Authentication
#PART 3 AWS
sign in to aws services by first clicking signup
top right corner use us west(oregon) in the dropdown menu
click compute and then EC2
EC2 More robust deployment platform than Heroku
Storage S3 is simple storage
Database: Dynamo DB Like mongo\Rlational DataBAse more like SQL
SECURITY: IAM creates users and permission
Setup Budgets

FOLLLOW VIDEO FROM HERE ON OUT
npm install del, multer, aws-sdk

AWS. & S3. & S3.config crazy API with so many 
Look throug the docs for some dope a** tools

#UPDATING GALLERY
Token Created from original POST above

http POST :3000/api/v1/gallery name='my gallery' description='new things' 'Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImQ3YTI1YmQzZTY4NThkZDc0ZDBmOTM0OTgwZmZhZmMyMmM1MjNiZWQxZDY3YWJjYTdjOWFjOTYxMDc3ZjZlNjY5NDljYjk5NzNkNWUwMDJkOWJmZjU3ZTE5ZTBjN2UzNGMzODM4NWI2YjhjOWMzNjlhNWZlMzZiOWEyNDAwMjg2IiwiaWF0IjoxNTE4MDU3NzQwfQ.pORbFKH5jXD5P6fZdH8fLQWXqHTx2PB6G8LlEXx7Ojo'

#UPLOAD IMAGE
http -f POST :3000/api/v1/photo image@~/Desktop/homer.jpg name=homer description='donut' galleryId='5a7bbac664b1a83961a91f76' 'Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImQ3YTI1YmQzZTY4NThkZDc0ZDBmOTM0OTgwZmZhZmMyMmM1MjNiZWQxZDY3YWJjYTdjOWFjOTYxMDc3ZjZlNjY5NDljYjk5NzNkNWUwMDJkOWJmZjU3ZTE5ZTBjN2UzNGMzODM4NWI2YjhjOWMzNjlhNWZlMzZiOWEyNDAwMjg2IiwiaWF0IjoxNTE4MDU3NzQwfQ.pORbFKH5jXD5P6fZdH8fLQWXqHTx2PB6G8LlEXx7Ojo'