import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

export default function createApplicationStatus(store, form) {
  const root = document.querySelector(
    `[data-widget-type="${form.widgetType}"]`,
  );
  if (root) {
    import(/* webpackChunkName: "application-status" */
    'platform/forms/save-in-progress/ApplicationStatus').then(module => {
      const ApplicationStatus = module.default;
      ReactDOM.render(
        <Provider store={store}>
          <ApplicationStatus
            formId={form.formId}
            showApplyButton={
              root.getAttribute('data-hide-apply-button') === null
            }
            showLearnMoreLink={
              root.getAttribute('data-widget-show-learn-more') !== null
            }
            additionalText={form.additionalText}
            applyHeading={form.applyHeading}
            applyLink={form.applyLink}
            applyText={form.applyText}
          />
        </Provider>,
        root,
      );
    });
  }
}
