import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { MdCloudUpload } from "react-icons/md";
import toast from "react-hot-toast";

const PaymentModal = ({ isOpen, onClose, totalAmount, onSubmit }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file");
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    if (!selectedFile) {
      toast.error("Please upload payment screenshot");
      return;
    }
    onSubmit(selectedFile);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-[#161D29] rounded-lg p-6 max-w-2xl w-11/12 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-richblack-5">
            Complete Payment
          </h2>
          <button
            onClick={onClose}
            className="text-richblack-300 hover:text-richblack-5"
          >
            <RxCross1 size={24} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Total Amount */}
          <div className="bg-[#000814] p-4 rounded-lg border border-[#2C333F]">
            <p className="text-richblack-300 text-sm mb-1">Total Amount</p>
            <p className="text-yellow-50 text-3xl font-bold">₹{totalAmount}</p>
          </div>

          {/* QR Code Section */}
          <div className="bg-[#000814] p-6 rounded-lg border border-[#2C333F]">
            <h3 className="text-richblack-5 font-semibold mb-3 text-center">
              Scan QR Code to Pay
            </h3>
            <div className="flex justify-center mb-4">
              {/* Placeholder QR Code - Replace with your actual QR code */}
              <div className="bg-white p-4 rounded-lg">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=yourupi@paytm%26pn=StudyNotion%26am=${totalAmount}%26cu=INR`}
                  alt="Payment QR Code"
                  className="w-48 h-48"
                />
              </div>
            </div>
            <div className="text-center space-y-2">
              <p className="text-richblack-300 text-sm">
                Scan using any UPI app
              </p>
              <p className="text-richblack-400 text-xs">
                (Google Pay, PhonePe, Paytm, etc.)
              </p>
            </div>
          </div>

          {/* Upload Payment Screenshot */}
          <div className="bg-[#000814] p-6 rounded-lg border border-[#2C333F]">
            <h3 className="text-richblack-5 font-semibold mb-3">
              Upload Payment Screenshot
            </h3>
            
            <div className="space-y-4">
              <label
                htmlFor="payment-screenshot"
                className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-[#2C333F] rounded-lg cursor-pointer hover:border-yellow-50 transition-colors"
              >
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Payment screenshot preview"
                    className="max-h-44 object-contain"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <MdCloudUpload className="text-yellow-50 text-5xl mb-3" />
                    <p className="mb-2 text-sm text-richblack-300">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-richblack-400">
                      PNG, JPG or JPEG (MAX. 5MB)
                    </p>
                  </div>
                )}
                <input
                  id="payment-screenshot"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>

              {selectedFile && (
                <div className="flex items-center justify-between bg-[#161D29] p-3 rounded-lg">
                  <span className="text-richblack-300 text-sm truncate">
                    {selectedFile.name}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedFile(null);
                      setPreviewUrl(null);
                    }}
                    className="text-red-500 hover:text-red-400 ml-2"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-yellow-50 text-richblack-900 font-semibold py-3 px-6 rounded-lg hover:bg-yellow-100 transition-colors"
          >
            Submit Payment Proof
          </button>

          <p className="text-richblack-400 text-xs text-center">
            After submitting, your payment will be verified within few hours and you will get access to the course.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
