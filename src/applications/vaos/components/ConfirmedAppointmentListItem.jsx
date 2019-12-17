import React from 'react';
import classNames from 'classnames';
import {
  getLocationHeader,
  getAppointmentLocation,
  getAppointmentDate,
  getAppointmentDateTime,
  getAppointmentInstructions,
  getAppointmentInstructionsHeader,
  getAppointmentTypeHeader,
  hasInstructions,
  isVideoVisit,
} from '../utils/appointment';
import {
  CANCELLED_APPOINTMENT_SET,
  APPOINTMENT_TYPES,
} from '../utils/constants';
import VideoVisitSection from './VideoVisitSection';

export default function ConfirmedAppointmentListItem({
  appointment,
  type,
  index,
  cancelAppointment,
  showCancelButton,
  facility,
}) {
  let canceled = false;
  if (type === APPOINTMENT_TYPES.vaAppointment) {
    canceled = CANCELLED_APPOINTMENT_SET.has(
      appointment.vdsAppointments?.[0]?.currentStatus,
    );
  }

  const allowCancel = showCancelButton && !canceled;

  const itemClasses = classNames(
    'vads-u-background-color--gray-lightest vads-u-padding--2p5 vads-u-margin-bottom--3',
    {
      'vads-u-border-top--4px': true,
      'vads-u-border-color--green': !canceled,
      'vads-u-border-color--secondary-dark': canceled,
    },
  );

  return (
    <li aria-labelledby={`card-${index}`} className={itemClasses}>
      <div className="vaos-form__title vads-u-font-size--sm vads-u-font-weight--normal vads-u-font-family--sans">
        {getAppointmentTypeHeader(appointment)}
      </div>
      <h2 className="vaos-appts__date-time vads-u-font-size--lg vads-u-margin-x--0">
        {getAppointmentDateTime(appointment)}
      </h2>
      <div className="vads-u-display--flex vads-u-justify-content--space-between vads-u-margin-top--2">
        <div className="vaos-appts__status vads-u-flex--1">
          {canceled ? (
            <i className="fas fa-exclamation-circle" />
          ) : (
            <i className="fas fa-check-circle" />
          )}
          <span
            id={`card-${index}`}
            className="vads-u-font-weight--bold vads-u-margin-left--1 vads-u-display--inline-block"
          >
            {canceled ? 'Canceled' : 'Confirmed'}
            <span className="sr-only"> appointment</span>
          </span>
        </div>
      </div>

      <div className="vaos-appts__split-section vads-u-margin-top--2">
        <div className="vads-u-flex--1">
          {isVideoVisit(appointment) ? (
            <VideoVisitSection appointment={appointment} />
          ) : (
            <dl className="vads-u-margin--0">
              <dt className="vads-u-font-weight--bold">
                {getLocationHeader(appointment)}
              </dt>
              <dd>{getAppointmentLocation(appointment, facility)}</dd>
            </dl>
          )}
        </div>
        {hasInstructions(appointment) && (
          <div className="vads-u-flex--1">
            <dl className="vads-u-margin--0">
              <dt className="vads-u-font-weight--bold">
                {getAppointmentInstructionsHeader(appointment)}
              </dt>
              <dd>{getAppointmentInstructions(appointment)}</dd>
            </dl>
          </div>
        )}
      </div>

      {allowCancel && (
        <div className="vads-u-margin-top--2">
          <button
            onClick={() => cancelAppointment(appointment)}
            aria-label="Cancel appointment"
            className="vaos-appts__cancel-btn va-button-link vads-u-margin--0 vads-u-flex--0"
          >
            Cancel appointment
            <span className="sr-only">
              {' '}
              on {getAppointmentDate(appointment)}
            </span>
          </button>
        </div>
      )}
    </li>
  );
}
