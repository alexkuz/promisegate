'use strict';

module.exports = function (Promise) {
  /**
   * Constructs a function that proxies to promiseFactory
   * limiting the count of promises that can run simultaneously.
   * @param promiseFactory function that returns promises.
   * @param concurrency how many promises are allowed to be running at the same time.
   * @returns function that returns a promise that eventually proxies to promiseFactory.
   */
  function limit(promiseFactory, concurrency) {
    var running = 0,
        semaphore;

    function scheduleNextJob() {
      if (running < concurrency) {
        running++;
        return Promise.resolve();
      }

      if (!semaphore) {
        semaphore = Promise.defer();
      }

      return semaphore.promise
        .then(scheduleNextJob, scheduleNextJob);
    }

    function processScheduledJobs() {
      running--;

      if (semaphore && running < concurrency) {
        semaphore.resolve();
        semaphore = null;
      }
    }

    return function () {
      var _this = this,
          args = arguments;

      function runJob() {
        return promiseFactory.apply(_this, args);
      }

      return scheduleNextJob()
        .then(runJob)
        .then(processScheduledJobs, processScheduledJobs);
    };
  }

  return {
    limit: limit
  };
};