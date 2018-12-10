# SkyPi

## Getting Started

Before following any of the instructions below please clone the SkyPi repository to a machine.

### Prerequisites

This is easy!

1. Install NodeJS and MongoDB on a dev machine.
2. Start up the MongoDB service on the machine using their instructions.

### Installing

#### Backend:

1. Navigate to skypi/api/core in a terminal
2. Run the command below

```
npm install
```

3. Navigate to skypi/core/api/config
4. Create a file called keys_dev.js to export your mongoURI and its username and password (if you configured them)
5. To test if everything install correctedly, navigate to skypi/core/api and run:

```
node server
```

6. You should see:

```
Express server running on port 5000
MongoDB connected!
```

##### Frontend:

1. Navigate to skypi/frontend/client in a terminal
2. Run the command below

```
npm install
```

3. To test if everything install correctedly, run:

```
npm start
```

4. You should see:

```
Compiled successfully
```

5. The frontend will start in a default web browser window.

## Deployment

Backend:

1. Clone this repository to a cloud web server and follow the instructions above for dev machine.

Frontend:

1. Navigate to skypi/frontend/client in a terminal
2. Run

```
npm run build
```

3. This command will output a build folder with everything you need to host on a web server like GoDaddy, AWS, or even your own homebrew.
4. Take the contents from the build folder and drop them in the hosting provider of your choice.

## Built With

- [NodeJS](https://nodejs.org/)
- [ExpressJS](https://expressjs.com/)
- [ReactJS](https://reactjs.org/)
- [Raspberry Pi](https://www.raspberrypi.org/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
