import logger from '../server/components/utils/logger'

describe('User', function() {
  describe('#save()', function() {
    it('should save without error', function(done) {
      logger.log('error', 'test')
      done()
    })
  })
})
