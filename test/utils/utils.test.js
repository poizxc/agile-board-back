const { expect } = require('chai');
const { checkIfIssueCanBeUpdated } = require('../../src/utils');

describe('checkIfIssueCanBeUpdated', () => {
  it('should return false if going from PENDING to TODO', () => {
    expect(checkIfIssueCanBeUpdated('PENDING', 'TODO')).to.be.false;
  });

  it('should return false if going from CLOSED to PENDING', () => {
    expect(checkIfIssueCanBeUpdated('CLOSED', 'PENDING')).to.be.false;
  });

  it('should return false if going from PENDING to TODO', () => {
    expect(checkIfIssueCanBeUpdated('CLOSED', 'TODO')).to.be.false;
  });

  it('should return true if going from TODO to PENDING', () => {
    expect(checkIfIssueCanBeUpdated('TODO', 'PENDING')).to.be.true;
  });

  it('should return true if going from TODO to CLOSED', () => {
    expect(checkIfIssueCanBeUpdated('TODO', 'CLOSED')).to.be.true;
  });

  it('should return true if going from TODO to CLOSED', () => {
    expect(checkIfIssueCanBeUpdated('TODO', 'CLOSED')).to.be.true;
  });
});
