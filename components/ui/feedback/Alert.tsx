import {
  CheckCircleIcon,
  ExclamationIcon,
  InformationCircleIcon,
  XCircleIcon,
  XIcon,
} from "@heroicons/react/solid";
import { NextPage } from "next";
import { useState, useEffect, SVGProps } from "react";

export enum AlertType {
  Warning,
  Info,
  Error,
  Success,
}

interface Props {
  message: string;
  type: AlertType;
  description?: string;
  subMessages?: string[];
  dismissable?: boolean;
  actions?: { text: string; action: Function }[];
}

const Alert: NextPage<Props> = ({
  message,
  type,
  description,
  subMessages,
  dismissable,
  actions,
}) => {
  const [dismissed, setDismissed] = useState(false);
  const [alertType, setAlertType] = useState<{
    color: string;
    icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  }>({ color: "blue", icon: InformationCircleIcon });

  useEffect(() => {
    switch (type) {
      case AlertType.Error:
        setAlertType({ color: "red", icon: XCircleIcon });
        break;
      case AlertType.Info:
        setAlertType({ color: "blue", icon: InformationCircleIcon });
        break;
      case AlertType.Warning:
        setAlertType({ color: "yellow", icon: ExclamationIcon });
        break;
      case AlertType.Success:
        setAlertType({ color: "green", icon: CheckCircleIcon });
        break;
    }
  }, []);
  return (
    <div
      className={`${dismissed && "hidden"} rounded-md bg-${
        alertType.color
      }-50 p-4 mb-2`}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <alertType.icon
            className={`h-5 w-5 text-${alertType.color}-400`}
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <h3 className={`text-sm font-medium text-${alertType.color}-800`}>
            {message}
          </h3>
          {description && (
            <div className={`mt-2 text-sm text-${alertType.color}-700`}>
              <p>{description}</p>
            </div>
          )}
          {subMessages && (
            <div className={`mt-2 text-sm text-${alertType.color}-700`}>
              <ul className="list-disc pl-5 space-y-1">
                {subMessages.map((subMessage, index) => (
                  <li key={index}>{subMessage}</li>
                ))}
              </ul>
            </div>
          )}

          {actions && (
            <div className="mt-4">
              <div className="-mx-2 -my-1.5 flex">
                {actions.map(({ action, text }, index) => (
                  <button
                    type="button"
                    key={index}
                    onClick={() => action()}
                    className={`mx-0.5 bg-${alertType.color}-100 px-2 py-1.5 rounded-md text-sm font-semibold text-${alertType.color}-800 hover:bg-${alertType.color}-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-${alertType.color}-50 focus:ring-${alertType.color}-600`}
                  >
                    {text}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        {dismissable && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                onClick={() => setDismissed(true)}
                className={`inline-flex bg-${alertType.color}-100 rounded-md p-1.5 text-${alertType.color}-500 hover:bg-${alertType.color}-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-${alertType.color}-50 focus:ring-${alertType.color}-600`}
              >
                <span className="sr-only">Dismiss</span>
                <XIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alert;
