![travis-url]
[![Coveralls][coveralls-shield]][coveralls-url]
[![Maintainability][maintainability-shield]][maintainability-url]
[![Contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/fedepazos95/backend-assessment/issues)
[![LinkedIn][linkedin-shield]][linkedin-url]

<br />
<p align="center">
  <a href="https://github.com/fedepazos95/backend-assessment">
    <img src="images/js.png" alt="Logo" width="100" height="100">
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



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)

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



<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_



<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/fedepazos95/backend-assessment/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Your Name - [@twitter_handle](https://twitter.com/twitter_handle) - fede.pazos95@gmail.com

Project Link: [https://github.com/fedepazos95/backend-assessment](https://github.com/fedepazos95/backend-assessment)



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements

* []()
* []()
* []()





<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/federicopazos/
[js-logo]: images/js.png
[travis-url]: https://travis-ci.org/fedepazos95/backend-assessment.svg?branch=master
[coveralls-shield]: https://coveralls.io/repos/github/fedepazos95/backend-assessment/badge.svg?branch=develop
[coveralls-url]: https://coveralls.io/github/fedepazos95/backend-assessment?branch=develop
[maintainability-shield]: https://api.codeclimate.com/v1/badges/9299d62f7e5bdcb0288f/maintainability
[maintainability-url]: https://codeclimate.com/github/fedepazos95/backend-assessment/maintainability
[dependencies-url]: https://david-dm.org/fedepazos95/backend-assessment.svg
