const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = 'http://localhost:5000/api';

// Assertion configuration
chai.should();
chai.use(chaiHTTP);

// TESTS
// /!\ If the SignUp and SignIn tests went through &&
// you would like to run test again, please update user
// credential details line 23 or delete user in DB

describe('RESTFUL API Jusitify Content Test', () => {
    let token = '';
    let userId = '';

    /**
     * Test the SignUp route
     */
    describe('POST /api/auth/signup', () => {
        it('Should create a new User', function(done) {
            let user = {
                email: 'foo@bar.com',
                password: 'qwertyuiop'
            };

            chai.request(server)
                .post('/auth/signup')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eq(true);
                    res.body.should.have.property('token');
                    res.body.user.should.have.nested.property('id');
                    res.body.user.should.have.nested.property('email').eq('foo@bar.com');
                    res.body.user.should.have.nested.property('password');
                    res.body.user.should.have.nested.property('counter').eq(0);
                    token = res.body.token;
                    userId = res.body.user.id;
                    done();
                });
        });
    });

    /**
     * Test the SignIn route
     */
    describe('POST /api/auth/signin', () => {
        it('Should log in a User', function(done) {
            let user = {
                email: 'foo@bar.com',
                password: 'qwertyuiop'
            };

            chai.request(server)
                .post('/auth/signin')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eq(true);
                    res.body.should.have.property('token');
                    res.body.user.should.have.nested.property('id').eq(userId);
                    res.body.user.should.have.nested.property('email').eq('foo@bar.com');
                    res.body.user.should.have.nested.property('counter');
                    done();
                });
        });
    });

    /**
     * Test the Justify route
     */
    describe('POST /api/justify', () => {
        it("Should not authorize non authenticated user to use API", function(done) {
            let text = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."

            chai.request(server)
                .post('/justify')
                .send(text)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.have.property('msg').eq('No token, unauthorized.');
                    done();
                });
        });

        it('Should create a content && return it justified', function(done) {
            let text = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."

            chai.request(server)
                .post('/justify')
                .set('token', token)
                .set('Content-Type', 'text/plain')
                .send(text)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
});