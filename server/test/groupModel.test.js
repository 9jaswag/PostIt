import chai from 'chai';
import models from '../models';
import groupData from './data/groupData';

const should = chai.should();

const { group } = groupData;

describe('Group model', () => {
  it('should create a group', (done) => {
    models.Group.create(group.demoGroup).then((newGroup) => {
      newGroup.name.should.equal(group.demoGroup.name);
      newGroup.owner.should.equal(group.demoGroup.owner);
      newGroup.description.should.equal(group.demoGroup.description);
    });
    done();
  });
});

