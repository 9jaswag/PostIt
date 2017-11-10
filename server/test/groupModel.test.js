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
  it('should not create a group if group name is empty', (done) => {
    models.Group.create(group.demoGroup2).then().catch((error) => {
      error.errors[0].message.should.equal('Group name can not be empty');
    });
    done();
  });
  it('should not create a group if group description is empty', (done) => {
    models.Group.create(group.demoGroup3).then().catch((error) => {
      error.errors[0].message.should
        .equal('Group description can not be empty');
    });
    done();
  });
  it('should not create a group if group owner is empty', (done) => {
    models.Group.create(group.demoGroup4).then().catch((error) => {
      error.errors[0].message.should.equal('Group must have an owner');
    });
    done();
  });
});

