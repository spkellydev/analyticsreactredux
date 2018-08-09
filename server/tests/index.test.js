process.env.PORT = 4000;
process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../');
const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

describe('server can boot', () => {
	it('should respond with status 200 with HTML content', done => {
		chai.request(server)
			.get('/')
			.end((err, res) => {
				res.should.have.status(200);
				expect(res).to.have.header('content-type', 'text/html; charset=UTF-8');
				done();
			});
	});
});
