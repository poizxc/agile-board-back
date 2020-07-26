const { expect } = require('chai');
const reqID = require('../../src/middlewares/reqID');

describe('reqID', () => {
  it('should add uuid as req.id', () => {
    const req = {};

    reqID(req, {}, () => {});
    expect(req.id).to.be.string;
  });
});
