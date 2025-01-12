import React from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import { BiError } from "react-icons/bi";

const ErrorMessage = ({ error }) => {
  const getErrorDetails = () => {
    if (error?.response) {
      // Handle API error responses
      switch (error.response.status) {
        case 400:
          return {
            title: "Bad Request",
            message:
              error.response.data.message || "Invalid request parameters",
            type: "error",
          };
        case 401:
          return {
            title: "Unauthorized",
            message: "Invalid API key or authentication failed",
            type: "error",
          };
        case 402:
          return {
            title: "API Limit Reached",
            message:
              "Daily API request limit has been reached. Please try again tomorrow or upgrade your plan.",
            type: "warning",
          };
        case 403:
          return {
            title: "Forbidden",
            message: "You do not have permission to access this resource",
            type: "error",
          };
        case 404:
          return {
            title: "Not Found",
            message: "The requested resource was not found",
            type: "error",
          };
        case 429:
          return {
            title: "Too Many Requests",
            message: "Rate limit exceeded. Please try again later.",
            type: "warning",
          };
        case 500:
          return {
            title: "Server Error",
            message:
              "An internal server error occurred. Please try again later.",
            type: "error",
          };
        default:
          return {
            title: "Error",
            message:
              error.response.data.message ||
              error.message ||
              "An unexpected error occurred",
            type: "error",
          };
      }
    } else if (error?.request) {
      // Handle network errors
      return {
        title: "Network Error",
        message:
          "Unable to connect to the server. Please check your internet connection.",
        type: "error",
      };
    } else {
      // Handle all other errors
      return {
        title: "Error",
        message: error?.message || "An unexpected error occurred",
        type: "error",
      };
    }
  };

  const errorDetails = getErrorDetails();
  const isWarning = errorDetails.type === "warning";

  return (
    <div
      className={`max-w-2xl mx-auto mt-8 p-4 ${
        isWarning
          ? "bg-yellow-50 border-yellow-200"
          : "bg-red-50 border-red-200"
      } border rounded-lg`}>
      <div className="flex items-center justify-center gap-3">
        {isWarning ? (
          <RiErrorWarningLine className="w-6 h-6 text-yellow-400" />
        ) : (
          <BiError className="w-6 h-6 text-red-400" />
        )}
        <div>
          <h3
            className={`text-lg font-semibold ${
              isWarning ? "text-yellow-800" : "text-red-800"
            }`}>
            {errorDetails.title}
          </h3>
          <p className={isWarning ? "text-yellow-700" : "text-red-700"}>
            {errorDetails.message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
