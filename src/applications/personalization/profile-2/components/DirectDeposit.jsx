import React, { useEffect } from 'react';

import { focusElement } from 'platform/utilities/ui';

import DirectDepositContent from './DirectDepositContent';

const DirectDeposit = () => {
  useEffect(() => {
    focusElement('[data-focus-target]');
  }, []);

  return (
    <>
      <h2
        tabIndex="-1"
        className="vads-u-line-height--1  vads-u-margin-y--2 medium-screen:vads-u-margin-y--4"
        data-focus-target
      >
        Direct deposit information for disability compensation and pension
        benefits
      </h2>
      <DirectDepositContent />
    </>
  );
};

export default DirectDeposit;
