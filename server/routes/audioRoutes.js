const https = require('https');

module.exports = function(app, db) {
  app.post('/getaudio', (mainReq, mainRes) => {
    const params = mainReq.body.params;
    const postData = mainReq.body.postData;
    const req = https.request(params, (res) => {
      if (res.statusCode < 200 || res.statusCode >= 300) {
        mainRes.send({ res: 'errorStatus' });
      }
      let body = [];
      res.on('data', (chunk) => {
        body.push(chunk);
      });
      res.on('end', () => {
        try {
          body = Buffer.concat(body);
        } catch (e) {
          mainRes.send({ e });
        }
        mainRes.send({ res: body });
      });
    });
    req.on('error', (err) => {
      mainRes.send({ err });
    });
    if (postData) {
      req.write(postData);
    }
    req.end();
  });
};
