/* globals describe, it */

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import Component from '../../src/scripts/components/link-item.jsx';

describe('link-item', () => {
  it('renders without problems', function () {
    let component = TestUtils.renderIntoDocument(<Component/>);
    expect(component).to.exist;
  });
});
