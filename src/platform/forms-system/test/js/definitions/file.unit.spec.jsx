import React from 'react';
import { findDOMNode } from 'react-dom';
import { expect } from 'chai';
import ReactTestUtils from 'react-dom/test-utils';

import { DefinitionTester } from 'platform/testing/unit/schemaform-utils.jsx';
import uiSchema, { fileSchema } from '../../../src/js/definitions/file';

describe('Schemaform definition file', () => {
  it('should render file', () => {
    const form = ReactTestUtils.renderIntoDocument(
      <DefinitionTester schema={fileSchema} uiSchema={uiSchema('Test')} />,
    );

    const formDOM = findDOMNode(form);

    expect(formDOM.querySelector('input[type="file"]')).not.to.be.null;
    expect(formDOM.querySelector('label>span[role="button"]')).not.to.be.null;
  });
});
