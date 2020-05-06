import React, { useState } from 'react';
import { connect } from 'react-redux';

import AdditionalInfo from '@department-of-veterans-affairs/formation-react/AdditionalInfo';
import AlertBox from '@department-of-veterans-affairs/formation-react/AlertBox';

import recordEvent from 'platform/monitoring/record-event';
import EbenefitsLink from 'platform/site-wide/ebenefits/containers/EbenefitsLink';
import { selectProfile } from 'platform/user/selectors';

import BankInfoForm from 'applications/personalization/profile360/components/BankInfoForm';
import {
  editModalToggled,
  savePaymentInformation as savePaymentInformationAction,
} from 'applications/personalization/profile360/actions/paymentInformation';
import {
  directDepositAccountInformation,
  directDepositInformation,
  directDepositIsSetUp,
} from 'applications/personalization/profile360/selectors';

import ProfileInfoTable from './ProfileInfoTable';
import { prefixUtilityClasses } from '../helpers';

const recordProfileNavEvent = (customProps = {}) => {
  recordEvent({
    event: 'profile-navigation',
    ...customProps,
  });
};

const FraudVictimAlert = () => (
  <AlertBox
    className="vads-u-margin-bottom--2 medium-screen:vads-u-margin-y--4"
    backgroundOnly
  >
    <strong>Note:</strong> If you think you’ve been the victim of bank fraud,
    please call us at{' '}
    <a
      href="tel:1-800-827-1000"
      aria-label="800. 8 2 7. 1000."
      title="Dial the telephone number 800-827-1000"
      className="no-wrap"
    >
      800-827-1000
    </a>{' '}
    (TTY: 711). We’re here Monday through Friday, 8:00 a.m. to 9:00 p.m. ET.
  </AlertBox>
);

const AdditionalInformation = () => (
  <>
    <div className="vads-u-margin-bottom--2">
      <AdditionalInfo
        triggerText="How do I change my direct deposit information for GI Bill and other education benefits?"
        onClick={() =>
          recordProfileNavEvent({
            'profile-action': 'view-link',
            'profile-section': 'how-to-change-direct-deposit',
          })
        }
      >
        <p>
          You’ll need to sign in to the eBenefits website with your Premium DS
          Logon account to change your direct deposit information for GI Bill
          and other education benefits online.
        </p>
        <p>
          If you don’t have a Premium DS Logon account, you can register for one
          or upgrade your Basic account to Premium. Your MyHealtheVet or ID.me
          credentials won’t work on eBenefits.
        </p>
        <EbenefitsLink path="ebenefits/about/feature?feature=direct-deposit-and-contact-information">
          Go to eBenefits to change your information
        </EbenefitsLink>
        <br />
        <a href="/change-direct-deposit/#are-there-other-ways-to-change">
          Find out how to change your information by mail or phone
        </a>
      </AdditionalInfo>
    </div>
    <AdditionalInfo
      triggerText="What’s my bank’s routing number?"
      onClick={() =>
        recordProfileNavEvent({
          'profile-action': 'view-link',
          'profile-section': 'whats-bank-routing',
        })
      }
    >
      <p>
        Your bank’s routing number is a 9-digit code that’s based on the U.S.
        location where your bank was opened. It’s the first set of numbers on
        the bottom left of your paper checks. You can also search for this
        number on your bank’s website. If your bank has multiple routing
        numbers, you’ll want the number for the state where you opened your
        account.
      </p>
    </AdditionalInfo>
  </>
);

export const DirectDepositContent = ({
  isDirectDepositSetUp,
  paymentAccount,
  paymentInformationUiState,
  savePaymentInformation,
  toggleEditState,
}) => {
  const [formData, setFormData] = useState({});

  const saveBankInfo = () => {
    // NOTE: You can create save error by sending undefined values in the payload
    const payload = {
      financialInstitutionName: 'Hidden form field',
      financialInstitutionRoutingNumber: formData.routingNumber,
      accountNumber: formData.accountNumber,
      accountType: formData.accountType,
    };
    savePaymentInformation(payload, isDirectDepositSetUp);
  };

  const bankInfoClasses = [
    ...prefixUtilityClasses(['display--flex', 'flex-direction--column']),
    ...prefixUtilityClasses(
      [
        'flex-direction--row',
        'align-items--flex-start',
        'justify-content--space-between',
      ],
      'small',
    ),
  ].join(' ');

  const bankInfoReadOnlyContent = (
    <div className={bankInfoClasses}>
      <div>
        <p className="vads-u-margin-top--0">
          {paymentAccount.financialInstitutionName}
        </p>
        <p>{paymentAccount.accountNumber}</p>
        <p className="vads-u-margin-bottom--0">{`${
          paymentAccount.accountType
        } account`}</p>
      </div>
      <button
        className="va-button-link vads-u-flex--auto"
        onClick={() => {
          toggleEditState();
        }}
      >
        Edit
      </button>
    </div>
  );

  const bankInfoNotSetUpContent = (
    <>
      <button
        onClick={() => {
          toggleEditState();
        }}
      >
        Set up direct deposit
      </button>
    </>
  );

  const bankInfoEditContent = (
    <>
      <p className="vads-u-margin-top--0">
        Please provide your bank’s current routing number as well as your
        current account number and type.
      </p>
      <div className="vads-u-margin-bottom--2">
        <AdditionalInfo triggerText="Where can I find these numbers?">
          <img
            src="/img/direct-deposit-check-guide.png"
            alt="On a personal check, find your bank’s 9-digit routing number listed along the bottom-left edge, and your account number listed beside that."
          />
        </AdditionalInfo>
      </div>
      <BankInfoForm
        formData={formData}
        formSubmit={saveBankInfo}
        formChange={data => setFormData(data)}
        isSaving={paymentInformationUiState.isSaving}
        onClose={() => {
          toggleEditState();
          setFormData({});
        }}
        cancelButtonClasses={['va-button-link', 'vads-u-margin-left--1']}
      />
    </>
  );

  // Helper that determines which data to show in the top row of the table
  const getBankInfo = () => {
    if (paymentInformationUiState.isEditing) {
      return bankInfoEditContent;
    }
    if (isDirectDepositSetUp) {
      return bankInfoReadOnlyContent;
    }
    return bankInfoNotSetUpContent;
  };

  const getTableData = () => [
    // top row of the table can show multiple states so we set its value with
    // the getBankInfo() helper
    {
      title: 'Account',
      value: getBankInfo(),
    },
    {
      title: 'Payment history',
      value: (
        <EbenefitsLink path="ebenefits/about/feature?feature=payment-history">
          View your payment history
        </EbenefitsLink>
      ),
    },
  ];

  return (
    <>
      <ProfileInfoTable
        title="Bank information"
        data={getTableData()}
        fieldName="directDeposit"
      />
      <FraudVictimAlert />
      <AdditionalInformation />
    </>
  );
};

DirectDepositContent.propTypes = {};

export const mapStateToProps = state => {
  const profile = selectProfile(state);

  return {
    profile,
    paymentAccount: directDepositAccountInformation(state),
    paymentInformation: directDepositInformation(state),
    isDirectDepositSetUp: directDepositIsSetUp(state),
    paymentInformationUiState: state.vaProfile.paymentInformationUiState,
  };
};

const mapDispatchToProps = {
  savePaymentInformation: savePaymentInformationAction,
  toggleEditState: editModalToggled,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DirectDepositContent);
