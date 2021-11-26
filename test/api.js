const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const app = require('../server');
const Frame = require('../models/frame.js');

const mockData = {
  id : 1,
  // src : "path/to/file/filename.jpg",  // attach file to request
  descp : "file description",
  likes : 100,
  downloads : 50
};

var credentials = {
  username: 'tarunesh1234',
  password: '1234'
};

const findOrCreateFrame = async (data) => {
  const [frame, created] =  await Frame.findOrCreate({
    where: { id: 1 },
    defaults : data
  });
  return frame;
}


// Login user to get jwtToken
// set token in Authorization header to test for authenticated user
// dont set for unauthenticated user
before(function(done){
  chai.request(app)
  .post('/api/auth/login')
  .send(credentials)
  .end(function(req, res){
    jwtToken = res.body.token;
    console.log(jwtToken);
    done();
  })
});


describe('GET /api', () => {
  it('GET / should return API Server json', (done) => {
    chai.request(app)
    .get('/api')
    .end((err, res) => {
      should.not.exist(err);
      res.status.should.be.eql(200);
      res.type.should.be.eql('application/json');
      res.body.should.be.equal('Express API');
      done();
    });
  });
});

describe('GET /api/frames', () => {
  it('should return a list frames', done => {
    chai
      .request(app)
      .get('/api/frames')
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.be.equal(200);
        res.type.should.equal('application/json');
        res.body.should.be.a('array');
        done();
      });
  });
});


describe('POST /api/frames', () => {
  it('it should not POST a frame for Unauthorized User', done => {
    chai
      .request(app)
      .post('/api/frames')
      .send(mockData)
      .end((err, res) => {
        res.status.should.be.equal(401);
        done();
      });
  });

  it('it should POST a frame for Authorized User', function(done){
    // .send() and .attach or .field() don’t work together
    chai
      .request(app)
      .post('/api/frames')
      .set('Authorization', jwtToken)
      .type('form')
      .field('descp', 'file description')
      .field('likes', 10)
      .field('downloads', 5)
      .attach('img', './test/static/image.jpeg', 'image.jpeg')
      .end((err, res) => {
        // console.log(res);
        res.status.should.be.equal(200);
        done();
      });
  });
});


describe('GET /api/frames/:id', () => {
  // db must have frame with id 1 for test
  beforeEach(async () => {
    let frame = await findOrCreateFrame(mockData);
    // frame.id.should.be.eql(1);
  });

  it('it should GET a frame by the given id', done => {
    chai
      .request(app)
      .get('/api/frames/1')
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.be.equal(200);
        res.type.should.equal('application/json');
        done();
      });
  });

  it('should throw an error if the frame does not exist', done => {
    chai
      .request(app)
      .get('/api/frames/171263746')
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.be.equal(404);
        res.type.should.equal('application/json');
        res.body.message.should.be.equal('Frame not found');
        done();
      });
  });
});


describe('PUT /api/frames/:id', () => {
  // db must have frame with id 1 for test
  beforeEach(async () => {
    let frame = await findOrCreateFrame(mockData);
    // frame.id.should.be.eql(1);
  });


  it('should NOT update frame for UnAuthenticated User', done => {
    chai
      .request(app)
      .put('/api/frames/1')
      .send({
        'likes' : 15
      })
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.be.equal(401);
        done();
      });
  });


  it('should NOT update frame for UnAuthorized User', done => {
    chai
      .request(app)
      .put('/api/frames/1')
      .set('Authorization', jwtToken)
      .send({
        'likes' : 15
      })
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.be.equal(401);
        done();
      });
  });
  

  it('should update frame for Authorized User', done => {
    chai
      .request(app)
      .put('/api/frames/1')
      .set('Authorization', jwtToken)
      .send({
        'likes' : 15
      })
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.be.equal(200);
        res.body.should.be.equal('updated');
        done();
      });
  });

});


describe('DELETE /api/frames/:id', () => {
  // db must have frame with id 1 for test
  beforeEach(async () => {
    let frame = await findOrCreateFrame(mockData);
    // frame.id.should.be.eql(1);
  });

  it('should NOT delete frame for UnAuthenticated User', done => {
    chai
      .request(app)
      .delete('/api/frames/1')
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.be.equal(401);
        done();
      });
  });


  it('should NOT delete frame for Unauthorized User', done => {
    chai
      .request(app)
      .delete('/api/frames/1')
      .set('Authorization', jwtToken)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.be.equal(401);
        done();
      });
  });


  it('should delete frame for Authorized User', done => {
    chai
      .request(app)
      .delete('/api/frames/1')
      .set('Authorization', jwtToken)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.be.equal(200);
        res.body.should.be.equal('deleted');
        done();
      });
  });
});


/*
Test Flow
- test all for auth nd non auth users
- create new frame
    - frame image upload test
- get frame by id
- get all frames
- delete frame by id
*/