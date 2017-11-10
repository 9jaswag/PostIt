import chai from 'chai';
import models from '../models';
import messageData from './data/messageData';

const should = chai.should();

const { message } = messageData;

describe('Message model', () => {
  it('should create a message', (done) => {
    models.Message.create(message.demoMessage).then((newMessage) => {
      newMessage.title.should.equal(message.demoMessage.title);
      newMessage.message.should.equal(message.demoMessage.message);
      newMessage.userId.should.equal(message.demoMessage.userId);
      newMessage.groupId.should.equal(message.demoMessage.groupId);
      newMessage.priority.should.equal(message.demoMessage.priority);
    });
    done();
  });
  it('should not create a message if title is empty', (done) => {
    models.Message.create(message.demoMessage2).then().catch((error) => {
      error.errors[0].message.should.equal('Message title can not be empty');
    });
    done();
  });
  it('should not create a message if message body is empty', (done) => {
    models.Message.create(message.demoMessage3).then().catch((error) => {
      error.errors[0].message.should.equal('Message can not be empty');
    });
    done();
  });
  it('should not create a message if message priority is null', (done) => {
    models.Message.create(message.demoMessage4).then().catch((error) => {
      error.errors[0].message.should.equal('priority cannot be null');
    });
    done();
  });
  it('should not create a message if message author is null', (done) => {
    models.Message.create(message.demoMessage5).then().catch((error) => {
      error.errors[0].message.should.equal('author cannot be null');
    });
    done();
  });
  it('should not create a message if message readby is null', (done) => {
    models.Message.create(message.demoMessage6).then().catch((error) => {
      error.errors[0].message.should.equal('readby cannot be null');
    });
    done();
  });
});

