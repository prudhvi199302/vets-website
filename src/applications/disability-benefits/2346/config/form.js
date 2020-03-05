import { VA_FORM_IDS } from 'platform/forms/constants';
import fullSchemaMDOT from '../2346-schema.json';
import personalInfoBox from '../components/personalInfoBox';
import orderSupplyPageContent from '../components/oderSupplyPageContent';
import deviceNameField from '../components/customFields/deviceNameField';
import productNameField from '../components/customFields/productNameField';
import quantityField from '../components/customFields/quantityField';
import productIdField from '../components/customFields/productIdField';
import lastOrderDateField from '../components/customFields/lastOrderDateField';
import emptyField from '../components/customFields/emptyField';
import { vetFields } from '../constants';
import ConfirmationPage from '../containers/ConfirmationPage';
import IntroductionPage from '../containers/IntroductionPage';
import UIDefinitions from '../definitions/2346UI';

const {
  email,
  dateOfBirth,
  veteranFullName,
  veteranAddress,
  gender,
  supplies,
} = fullSchemaMDOT.definitions;

const { emailUI, addressUI } = UIDefinitions.sharedUISchemas;

const formChapters = {
  veteranInformation: 'Veteran Information',
  orderSupplies: 'Order your supplies',
};

const formPages = {
  personalDetails: 'Personal Details',
  confirmAddress: 'Shipping Address',
  orderSuppliesPage: 'Add batteries to your order',
};

const formConfig = {
  urlPrefix: '/',
  submitUrl: '/posts',
  submit: () =>
    Promise.resolve({ attributes: { confirmationNumber: '123123123' } }),
  trackingPrefix: 'va-2346a-',
  introduction: IntroductionPage,
  confirmation: ConfirmationPage,
  formId: VA_FORM_IDS.FORM_VA_2346A,
  version: 0,
  prefillEnabled: true,
  title: 'Reorder Hearing Aid Batteries and Accessories',
  subTitle: 'VA Form 2346A',
  savedFormMessages: {
    notFound: 'Please start over to apply for benefits.',
    noAuth: 'Please sign in again to continue your application for benefits.',
  },
  defaultDefinitions: {
    email,
    dateOfBirth,
    veteranFullName,
    veteranAddress,
    gender,
    supplies,
  },
  chapters: {
    VeteranInformationChapter: {
      title: formChapters.veteranInformation,
      pages: {
        [formPages.personalDetails]: {
          path: 'veteran-information',
          title: formPages.personalDetails,
          uiSchema: {
            'ui:description': personalInfoBox,
          },
          schema: {
            type: 'object',
            properties: {},
          },
        },
        [formPages.address]: {
          path: 'veteran-information/addresses',
          title: formPages.confirmAddress,
          uiSchema: {
            [vetFields.address]: addressUI,
            [vetFields.email]: emailUI,
          },
          schema: {
            type: 'object',
            properties: {
              veteranAddress,
              email,
            },
          },
        },
      },
    },
    OrderSuppliesChapter: {
      title: formChapters.orderSupplies,
      pages: {
        [formPages.orderSuppliesPage]: {
          path: 'order-supplies',
          title: formPages.orderSuppliesPage,
          schema: {
            type: 'object',
            properties: {
              'view:addBatteries': {
                type: 'string',
                enum: ['yes', 'no'],
              },
              supplies,
            },
          },
          uiSchema: {
            'view:addBatteries': {
              'ui:title': 'Add batteries to your order',
              'ui:description': orderSupplyPageContent,
              'ui:widget': 'radio',
              'ui:options': {
                labels: {
                  yes: 'Yes, I need to order hearing aid batteries.',
                  no: "No, I don't need to order hearing aid batteries.",
                },
              },
            },
            supplies: {
              'ui:title': 'Which hearing aid do you need batteries for?',
              'ui:description':
                'You will be sent a 6 month supply of batteries for each device you select below.',
              'ui:options': {
                classNames: 'order-background',
                expandUnder: 'view:addBatteries',
                expandUnderCondition: 'yes',
              },
              deviceName: {
                'ui:title': '  ',
                'ui:field': deviceNameField,
              },
              productName: {
                'ui:title': '  ',
                'ui:field': productNameField,
              },
              quantity: {
                'ui:title': '  ',
                'ui:field': quantityField,
              },
              productId: {
                'ui:title': '  ',
                'ui:field': productIdField,
              },
              lastOrderDate: {
                'ui:title': '  ',
                'ui:field': lastOrderDateField,
              },
              productGroup: {
                'ui:title': '  ',
                'ui:field': emptyField,
              },
              availableForReorder: {
                'ui:title': '  ',
                'ui:field': emptyField,
              },
              nextAvailabilityDate: {
                'ui:title': '  ',
                'ui:field': emptyField,
              },
              leftEar: {
                'ui:title': '  ',
                'ui:field': emptyField,
              },
              rightEar: {
                'ui:title': '  ',
                'ui:field': emptyField,
              },
            },
          },
        },
      },
    },
  },
};
export default formConfig;