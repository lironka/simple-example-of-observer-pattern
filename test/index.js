/*
 *  Command for start:  NODE_ENV=test mocha 
 */
const Subject = require('../subject');
const should = require('should');
// make sure you run it in test env
should(process.env.NODE_ENV).eql('test');

describe('Observer Pattern Test', () => {
   context('Create Subscription Observer', () => {
      let subject = new Subject();
      let subscription;

      it('Subject length 0', () => {
         (subject.length()).should.be.equal(0);
      });

      it('Add Observer in Subject and check emits', (done) => {
         const value = 'New Data';
         /** Add Observer, check changes in subscription */
         // Observer - function in subscribe()
         subscription = subject.subscribe(data => {
            data.should.be.equal(value);
            done();
         });

         /** Broadcast changes */
         subject.next(value);
      });

      it('Subject length 1', () => {
         (subject.length()).should.be.equal(1);
      });

      it('Do unsubscribe. Subject length == 0', () => {
         subscription.unsubscribe();
         (subject.length()).should.be.equal(0);
      });
   });

   context('Remove one of several Observers', () => {
      const value = 'New Data';
      let subject, subscription1, subscription2, subscription3;

      beforeEach(function () {
         subject = new Subject();
      });

      afterEach(function () {
         subscription1.unsubscribe();
         subscription2.unsubscribe();
         subscription3.unsubscribe();
      });

      it('Remove first Observer', (done) => {
         const resultSubscription = [];
         subscription1 = subject.subscribe(data => {
            resultSubscription.push('1');
         });

         subscription2 = subject.subscribe(data => {
            resultSubscription.push('2');
         });

         subscription3 = subject.subscribe(data => {
            resultSubscription.push('3');
         });

         /** Unsubscribe Observer 1 */
         subscription1.unsubscribe();

         subject.next(value);

         setTimeout(() => {
            resultSubscription.indexOf('1').should.equal(-1);
            resultSubscription.indexOf('2').should.not.equal(-1);
            resultSubscription.indexOf('3').should.not.equal(-1);
            done();
         }, 10);
      });

      it('Remove middle Observer', (done) => {
         const resultSubscription = [];
         subscription1 = subject.subscribe(data => {
            resultSubscription.push('1');
         });

         subscription2 = subject.subscribe(data => {
            resultSubscription.push('2');
         });

         subscription3 = subject.subscribe(data => {
            resultSubscription.push('3');
         });

         /** Unsubscribe Observer 2 */
         subscription2.unsubscribe();

         subject.next(value);

         setTimeout(() => {
            resultSubscription.indexOf('1').should.not.equal(-1);
            resultSubscription.indexOf('2').should.equal(-1);
            resultSubscription.indexOf('3').should.not.equal(-1);
            done();
         }, 10);
      });

      it('Remove last Observer', (done) => {
         const resultSubscription = [];
         subscription1 = subject.subscribe(data => {
            resultSubscription.push('1');
         });

         subscription2 = subject.subscribe(data => {
            resultSubscription.push('2');
         });

         subscription3 = subject.subscribe(data => {
            resultSubscription.push('3');
         });

         /** Unsubscribe Observer 3 */
         subscription3.unsubscribe();

         subject.next(value);

         setTimeout(() => {
            resultSubscription.indexOf('1').should.not.equal(-1);
            resultSubscription.indexOf('2').should.not.equal(-1);
            resultSubscription.indexOf('3').should.equal(-1);
            done();
         }, 10);
      });
   });
});