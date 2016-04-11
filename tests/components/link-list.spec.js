/* globals describe, it, before, sinon, expect */

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Component from '../../src/scripts/components/link-list.jsx';

describe('link-list', function() {
  before(function() {
    window.chrome = {
      storage: {
        sync: sinon.stub({
          set: function() {},
          get: function() {},
          remove: function() {},
          clear: function() {}
        })
      }
    };
  });

  it('renders without problems', function() {
    let component = TestUtils.renderIntoDocument(<Component/>);
    expect(component).to.exist;
  });
});
