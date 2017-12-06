const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const postData = require('../queries/postData');
const getData = require('../queries/getData');
const getFac = require('../queries/getFac');
const getFreelance = require('../queries/getFreelance');
const getInternship = require('../queries/getInternship');
const getJuniorDev = require('../queries/getJuniorDev');
const getMentor = require('../queries/getMentor');

const homeHandler = (request, response) => {
  let filePath = path.join(__dirname, '..', 'index.html');
  fs.readFile(filePath, 'utf8', (err, file) => {
    if (err) {
      response.writeHead(500, {
        "Content-Type": 'text/plain'
      });
      response.end('server error');
    } else {
      response.writeHead(200, {
        "Content-Type": "text/html"
      });
      response.end(file);
    }
  })
}

const staticHandler = (request, response, endpoint) => {

  const extensionType = {
    html: 'text/html',
    css: 'text/css',
    js: 'application/javascript'
  }
  const extension = endpoint.split('.')[1];
  const filePath = path.join(__dirname, '..', endpoint);
  fs.readFile(filePath, (err, file) => {
    if (err) {
      response.writeHead(500, {
        "Content-Type": "text/plain"
      });
      response.end("Error");
    }
    response.writeHead(200, 'Content-Type: ' + extensionType[extension]);
    response.end(file);
  });
}

const addMe = (request, response, endpoint) => {
  let data = '';
  request.on('data', function(chunk) {
    data += chunk;
    console.log("chunk ", chunk);
  });
  request.on('end', () => {
    console.log("data ", data)
    var allData = querystring.parse(data)
    const name = allData.personName;
    const cohortNumber = allData.cohortNumber;
    const gitterHandle = allData.gitterHandle;
    const talkInfo = allData.talkInfo;
    let category = [];
    if (allData.category1){
      category.push('Life at FAC');
    } if (allData.category2){
      category.push('Freelancing');
    } if (allData.category3){
      category.push('Internship');
    } if (allData.category4){
      category.push('Junior Dev');
    } if (allData.category5){
      category.push('Mentoring');
    }

    console.log("name ", name)
    console.log("cohortNumber ", cohortNumber);
    console.log("gitterHandle ", gitterHandle);
    console.log("categoryArray: ", category);
    console.log("talkInfo: ", talkInfo);

    // categoryData(category, (err, res) => {
    //   if (err) {
    //     response.writeHead(500, 'Content-Type:text/html');
    //     response.end('<h1>Sorry, there was a problem adding that category</h1>');
    //     console.log(err)
    //   }
    // });

    postData(name, cohortNumber, gitterHandle, category, talkInfo, (err, res) => {
      if (err) {
        response.writeHead(500, 'Content-Type:text/html');
        response.end('<h1>Sorry, there was a problem adding that user</h1>');
        console.log(err)
      } else {
        response.writeHead(200, {'Location' : '/'});
        response.end();
      }
    });

    response.writeHead(200, {
      "Content-Type": "text/html"
    });
    fs.readFile(__dirname + "/../index.html", function(error, file) {
      if (error) {
        console.log(error);
        return;
      } else {
        response.end(file);
      }
    });
  })
}

const viewAll = (request, response, endpoint) => {
  console.log(endpoint);
  getData((err, res) => {
    if (err) {
      response.writeHead(500, 'Content-Type:text/html');
      response.end('<h1>Sorry, there was a problem getting the users</h1>');
      console.log(error);
    } else {
      let output = JSON.stringify(res);
      response.writeHead(200, {
        'content-type': 'application/json'
      });
      response.end(output);
    }
  });
}

const facLife = (request, response, endpoint) => {
  console.log(endpoint);
  getFac((err, res) => {
    if (err) {
      response.writeHead(500, 'Content-Type:text/html');
      response.end('<h1>Sorry, there was a problem getting the users</h1>');
      console.log(error);
    } else {
      let output = JSON.stringify(res);
      response.writeHead(200, {
        'content-type': 'application/json'
      });
      response.end(output);
    }
  });
}

const freelance = (request, response, endpoint) => {
  console.log(endpoint);
  getFreelance((err, res) => {
    if (err) {
      response.writeHead(500, 'Content-Type:text/html');
      response.end('<h1>Sorry, there was a problem getting the users</h1>');
      console.log(error);
    } else {
      let output = JSON.stringify(res);
      response.writeHead(200, {
        'content-type': 'application/json'
      });
      response.end(output);
    }
  });
}

const internship = (request, response, endpoint) => {
  console.log(endpoint);
  getInternship((err, res) => {
    if (err) {
      response.writeHead(500, 'Content-Type:text/html');
      response.end('<h1>Sorry, there was a problem getting the users</h1>');
      console.log(error);
    } else {
      let output = JSON.stringify(res);
      response.writeHead(200, {
        'content-type': 'application/json'
      });
      response.end(output);
    }
  });
}

const juniorDev = (request, response, endpoint) => {
  console.log(endpoint);
  getJuniorDev((err, res) => {
    if (err) {
      response.writeHead(500, 'Content-Type:text/html');
      response.end('<h1>Sorry, there was a problem getting the users</h1>');
      console.log(error);
    } else {
      let output = JSON.stringify(res);
      response.writeHead(200, {
        'content-type': 'application/json'
      });
      response.end(output);
    }
  });
}

const mentor = (request, response, endpoint) => {
  console.log(endpoint);
  getMentor((err, res) => {
    if (err) {
      response.writeHead(500, 'Content-Type:text/html');
      response.end('<h1>Sorry, there was a problem getting the users</h1>');
      console.log(error);
    } else {
      let output = JSON.stringify(res);
      response.writeHead(200, {
        'content-type': 'application/json'
      });
      response.end(output);
    }
  });
}

module.exports = {
  homeHandler,
  staticHandler,
  addMe,
  viewAll,
  facLife,
  freelance,
  internship,
  juniorDev,
  mentor
}
