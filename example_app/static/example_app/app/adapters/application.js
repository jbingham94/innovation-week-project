import DRFAdapter from './drf';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import JSONAPIAdapter from 'ember-data/adapters/json-api';

import ENV from '../config/environment';

export default JSONAPIAdapter.extend({
    host: ENV.host,
    namespace: 'api'
});

export default DRFAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:token',
  shouldReloadAll() {
    return true;
  },
  shouldBackgroundReloadRecord() {
    return true;
  },
});
