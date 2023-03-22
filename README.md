# Exchange Rate API Web Application

This is a web application that enables users to retrieve exchange rates between two currencies and visualize them as a graph. Users must log in to access the input screen, where they can input the From and To currency symbols and choose their exchange rate preference. The exchange rate data is retrieved from the [Alpha Vantage API](https://www.alphavantage.co/), and the API query is generated based on user input.

## Screenshot
![Screenshot of my project](/screenshot.png)

## Installation

To install and run the Vue project, follow the steps below:

1. Make sure you have Node.js and npm installed on your machine. If you don't have it installed, download and install it from the [official website](https://nodejs.org/en/).
2. Clone the repository to your local machine using the command: `git clone https://github.com/esmaeilbahrani/exchangeRateAPI`
3. Navigate to the project directory using the terminal or command prompt.
4. Install the dependencies using the following command: `npm install`
5. Once the installation is complete, run the following command to launch the project on your default browser.

This will compile and start the development server.
You can access the project on your browser.

That's it! You have now successfully installed and launched the project.

## Usage

To use the web application, follow these steps:
 
1. On the login page, enter credentials and click the "Log In" button. For demonstration purposes, the credentials can be hardcoded, but validation will occur before redirecting the user to the input screen.
2. On the input screen, enter the From and To currency symbols in the input fields provided. All standard currency symbols are allowed based on Alpha Vantage API.
3. Click the "Get Exchange Rate" button to retrieve the exchange rate data and display it as a graph.
 
## Credits

This web application was created by [Esmaeil Bahrani Fard](https://github.com/esmaeilbahrani) using the following technologies:

- HTML 
- SCSS
- Vue JS
- Axios
- Pinia
- Alpha Vantage API

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). See the LICENSE file for details.
