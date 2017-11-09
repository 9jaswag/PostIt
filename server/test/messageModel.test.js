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
});

