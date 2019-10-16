![travis-url]
[![Coveralls][coveralls-shield]][coveralls-url]
[![Maintainability][maintainability-shield]][maintainability-url]
[![Contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/fedepazos95/backend-assessment/issues)
[![LinkedIn][linkedin-shield]][linkedin-url]

<br />
<p align="center">
  <a href="https://github.com/fedepazos95/backend-assessment">
    <img src="docs/images/js.png" alt="Logo" width="100" height="100">
  </a>

  <h2 align="center">Node.JS Backend Assessment</h2>

  <p align="center">
    <a href="https://github.com/fedepazos95/backend-assessment"><strong>Explore the docs »</strong></a>
    <br />
    <small>
      <a href="https://github.com/fedepazos95/backend-assessment">View Demo</a>
      ·
      <a href="https://github.com/fedepazos95/backend-assessment/issues">Report Bug</a>
    </small>
  </p>
</p>


## Table of Contents
* [About the Project](#about-the-project)
* [Running the Web API](#running-the-web-api)
* [Usage](#usage)
* [Testing](#testing)
* [Contact](#contact)
* [License](#license)


## About The Project
This is a Web API that exposes some services related to insurance policies and company clientes, with some added constraints:

 - Users can only access to:
	 - Get User data by id.
	 - Get User data filtered by name.
 - Admins can only access to:
	 - Get User data by id.
	 - Get User data filtered by name.
	 - Get the list of Policies linked to a User.
   - Get the User linked to a Policy.


## Running the Web API
To get a local copy up and running follow these simple steps.

1. Download or clone the project code
```sh
git clone https:://github.com/fedepazos95/backend-assessment.git
```
2. Install project dependencies
```sh
yarn #or npm i
```
3. Then you need to set some environment variables, first create a **.env** file in the root folder and set the following:
```sh
PORT=3000 #or any other
USERS_URL=http://www.mocky.io/v2/5808862710000087232b75ac
POLICIES_URL=http://www.mocky.io/v2/580891a4100000e8242b75c5
```
4. Start the development server by running:
```sh
yarn dev
```


## Usage
To start using the Web API you can go to [http://localhost:3000/api/docs](http://localhost:3000) to see the Open Api specification and test it through Swagger.

[![Swagger Screenshot][swagger-screenshot]](https://github.com/fedepazos95/backend-assessment)

The Swagger is already configured with some ids to start using it asap! 


>*The only pre-requirement is to authenticate with an email to get a Token and use it in the **Authorize** button.*

>*Also there is a [Postman Collection](https://www.getpostman.com/collections/a12bdde76a4ebac5ea1c) that contains an example of every resource.*


## Testing
To run all the tests locally, you need to setup a new environment variable. That is because one of the tests requires an User Token to fail trying to request info available only for admins.

To do this, follow:

1. Start the development server

2. Authenticate with a User, the fatest way is running:
```sh
curl -d '{"email":"barnettblankenship@quotezart.com"}' -H "Content-Type: application/json" -X POST http://localhost:3000/api/users/authenticate
#But also you can do it through Swagger or Postman.
```
3. Use the received token in your **.env** file:
```sh
TEST_TOKEN=*YOUR-TOKEN*
#Be aware that the token will expires in 30mins.
```
4. Run the tests:
```sh
yarn test
```

## Contact
- [LinkedIn][linkedin-url]
- [Email][mailto]

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


[mailto]: mailto:fede.pazos95@gmail.com
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/federicopazos/
[js-logo]: docs/images/js.png
[swagger-screenshot]: docs/images/swagger.png
[travis-url]: https://travis-ci.org/fedepazos95/backend-assessment.svg?branch=master
[coveralls-shield]: https://coveralls.io/repos/github/fedepazos95/backend-assessment/badge.svg?branch=develop
[coveralls-url]: https://coveralls.io/github/fedepazos95/backend-assessment?branch=develop
[maintainability-shield]: https://api.codeclimate.com/v1/badges/9299d62f7e5bdcb0288f/maintainability
[maintainability-url]: https://codeclimate.com/github/fedepazos95/backend-assessment/maintainability
[dependencies-url]: https://david-dm.org/fedepazos95/backend-assessment.svg
