import React, { useState, useRef, useEffect } from "react";
import { Camera, CreditCard, MessageSquare, CheckCircle2, ChevronLeft, Smartphone, Info, AlertCircle } from "lucide-react";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Alert from "@mui/material/Alert";
import AlertDescription from "@mui/material/Alert";
import { toast } from "sonner";


// Color constants matching Flutter theme
const theme = {
    buttonColor: "#FFB800", // Primary yellow color
    lightYellow: "#FFF8E7", // Light yellow for backgrounds
    borderYellow: "#FFD466", // Lighter yellow for borders
    hoverYellow: "#FFA600", // Darker yellow for hover states
};

// API Configuration
const API_TOKEN =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczNjE1ODg2NywianRpIjoiNGE4MGMxMjMtMDM3Ny00MmYyLTk1NDItMTcyNTc2OTBhY2ExIiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LnNoYWhlZW5Ac3VyZXBhc3MuaW8iLCJuYmYiOjE3MzYxNTg4NjcsImV4cCI6MTczNzAyMjg2NywiZW1haWwiOiJzaGFoZWVuQHN1cmVwYXNzLmlvIiwidGVuYW50X2lkIjoibWFpbiIsInVzZXJfY2xhaW1zIjp7InNjb3BlcyI6WyJ1c2VyIl19fQ.9SBuyX1BE8gNyM73Jo5IxY2F9TJjBguLZmEzbtQDlc0";
const API_BASE_URL = "https://sandbox.surepass.io/api/v1";

const DigiLockerVerification = () => {
    // State management
    const [currentStep, setCurrentStep] = useState(0);
    const [hasPrerequisites, setHasPrerequisites] = useState(false);
    const [aadhaarNumber, setAadhaarNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [selfieImage, setSelfieImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [clientId, setClientId] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [verificationData, setVerificationData] = useState(null);
    const [isResendingOtp, setIsResendingOtp] = useState(false);

    // Refs for camera handling
    const videoRef = useRef(null);
    const streamRef = useRef(null);

    const steps = ["Start", "Aadhaar", "OTP", "Selfie"];

    // Camera initialization effect
    useEffect(() => {
        if (currentStep === 3 && !selfieImage) {
            startCamera();
        } else {
            stopCamera();
        }
        return () => {
            stopCamera();
        };
    }, [currentStep, selfieImage]);

    // Camera handling functions
    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { 
                    facingMode: "user",
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                }
            });
            streamRef.current = stream;
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play().catch(err => {
                    console.error("Error playing video:", err);
                });
            }
        } catch (err) {
            console.error("Error accessing camera:", err);
            alert("Unable to access camera. Please ensure camera permissions are granted.");
        }
    };

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => {
                track.stop();
            });
            streamRef.current = null;
        }
        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }
    };

    // Helper functions
    const formatAadhaar = (value) => {
        const digits = value.replace(/\D/g, '');
        const groups = digits.match(/.{1,4}/g) || [];
        return groups.join(' ');
    };

    const handleAadhaarChange = (e) => {
        const formatted = formatAadhaar(e.target.value);
        if (formatted.length <= 14) {
            setAadhaarNumber(formatted);
        }
    };

    const handleOtpChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        if (value.length <= 6) {
            setOtp(value);
        }
    };

    const takeSelfie = async () => {
        if (!videoRef.current || !videoRef.current.videoWidth) {
            console.error("Video stream not ready");
            return;
        }

        try {
            const canvas = document.createElement("canvas");
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            
            const ctx = canvas.getContext("2d");
            // Flip the image horizontally to match the mirrored preview
            ctx.scale(-1, 1);
            ctx.translate(-canvas.width, 0);
            ctx.drawImage(videoRef.current, 0, 0);

            const imageBlob = await new Promise((resolve) => 
                canvas.toBlob(resolve, "image/jpeg", 0.8)
            );
            
            const imageUrl = URL.createObjectURL(imageBlob);
            setSelfieImage(imageUrl);
            stopCamera();
        } catch (err) {
            console.error("Error taking selfie:", err);
            alert("Error taking selfie. Please try again.");
        }
    };

    // API Calls
    const generateOtp = async () => {
        if (aadhaarNumber.replace(/\s/g, "").length !== 12) return;

        setIsLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/aadhaar-v2/generate-otp`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${API_TOKEN}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id_number: aadhaarNumber.replace(/\s/g, ""),
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setClientId(data.data.client_id);
                if (!isResendingOtp) {
                    setCurrentStep(2);
                }
            }
        } catch (err) {
            console.error("Error generating OTP:", err);
        } finally {
            setIsLoading(false);
            setIsResendingOtp(false);
        }
    };

    const verifyOtp = async () => {
        if (otp.length !== 6 || !clientId) return;

        setIsLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/aadhaar-v2/submit-otp`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${API_TOKEN}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    client_id: clientId,
                    otp: otp,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setVerificationData(data.data);
                setProfileImage(data.data.profile_image);
                setCurrentStep(3);
            }
        } catch (err) {
            console.error("Error verifying OTP:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const performFaceMatch = async () => {
        if (!selfieImage || !profileImage) return;

        setIsLoading(true);

        try {
            const formData = new FormData();
            const selfieBlob = await fetch(selfieImage).then((r) => r.blob());
            formData.append("selfie", selfieBlob, "selfie.jpg");
            formData.append("selfie_2_link", profileImage);

            const response = await fetch(`${API_BASE_URL}/face/face-match`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${API_TOKEN}`,
                },
                body: formData,
            });

            const data = await response.json();

            if (response.ok && data.data.match_status) {
                console.log("Face match successful");
                // Handle successful verification
            } else {
              toast.error("Face not found or error in face verificaiton. Please Re-verify")
            }
        } catch (err) {
            console.error("Error in face match:", err);
            setSelfieImage(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleNext = async () => {
        if (isLoading) return;

        setIsLoading(true);

        try {
            switch (currentStep) {
                case 0:
                    setCurrentStep(currentStep + 1);
                    break;

                case 1:
                    await generateOtp();
                    break;

                case 2:
                    await verifyOtp();
                    break;

                case 3:
                    if (!selfieImage) {
                        await takeSelfie();
                    } else {
                        await performFaceMatch();
                    }
                    break;

                default:
                    console.log("Invalid step");
                    break;
            }
        } catch (error) {
            console.error("Error in handleNext:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const getButtonText = () => {
        switch (currentStep) {
            case 0:
                return "Start Verification";
            case 1:
                return "Verify Aadhaar";
            case 2:
                return "Verify OTP";
            case 3:
                return selfieImage ? "Complete Verification" : "Take Selfie";
            default:
                return "Continue";
        }
    };

    const PrerequisitesStep = () => (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Welcome to Aadhaar Verification</h2>

            <div
                className="p-6 rounded-xl space-y-6"
                style={{ backgroundColor: theme.lightYellow, borderColor: theme.borderYellow }}
            >
                <h3 className="text-lg font-semibold text-gray-900">Before you begin, please ensure:</h3>

                {[
                    {
                        icon: <Smartphone className="w-5 h-5" />,
                        title: "Mobile Number Access",
                        desc: "You have access to the mobile number linked with your Aadhaar",
                    },
                    {
                        icon: <CreditCard className="w-5 h-5" />,
                        title: "Aadhaar Card",
                        desc: "Your 12-digit Aadhaar number is readily available",
                    },
                    {
                        icon: <Camera className="w-5 h-5" />,
                        title: "Camera Ready",
                        desc: "Your device camera is working for the selfie verification",
                    },
                ].map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                        <div className="p-2 rounded-lg" style={{ backgroundColor: theme.lightYellow }}>
                            <div className="p-2 rounded-lg" style={{ backgroundColor: theme.buttonColor }}>
                                {item.icon}
                            </div>
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-900">{item.title}</h4>
                            <p className="text-gray-600 text-sm">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
                <input
                    type="checkbox"
                    checked={hasPrerequisites}
                    onChange={(e) => setHasPrerequisites(e.target.checked)}
                    className="mt-1 w-4 h-4"
                    style={{ accentColor: theme.buttonColor }}
                />
                <span className="text-gray-700">I confirm that I have all the prerequisites ready</span>
            </label>
        </div>
    );

    const AadhaarStep = () => (
        <Card>
            <CardContent className="p-6 space-y-6">
                <div className="text-center">
                    <div
                        className="mx-auto w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: theme.lightYellow }}
                    >
                        <CreditCard className="w-6 h-6" style={{ color: theme.buttonColor }} />
                    </div>
                    <h2 className="mt-4 text-xl font-semibold">Enter Aadhaar Details</h2>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Aadhaar Number</label>
                    <div className="mt-1 relative">
                        <input
                            type="text"
                            value={aadhaarNumber}
                            onChange={handleAadhaarChange}
                            placeholder="XXXX XXXX XXXX"
                            className="w-full px-4 py-2 border rounded-lg outline-none"
                            style={{
                                borderColor: theme.borderYellow,
                                "--tw-ring-color": theme.buttonColor,
                            }}
                        />
                    </div>
                </div>

                <Alert
                    className="border rounded-xl"
                    style={{ backgroundColor: theme.lightYellow, borderColor: theme.borderYellow }}
                >
                    <AlertCircle className="h-4 w-4" style={{ color: theme.buttonColor }} />
                    <AlertDescription>
                        <div className="ml-2">
                            <p className="font-medium">Important:</p>
                            <ul className="mt-2 space-y-1 text-sm">
                                <li>Enter the 12-digit Aadhaar number linked with your mobile</li>
                                <li>Double-check the number before proceeding</li>
                                <li>Your data is encrypted and secure</li>
                            </ul>
                        </div>
                    </AlertDescription>
                </Alert>
            </CardContent>
        </Card>
    );

    const OtpStep = () => (
        <Card>
            <CardContent className="p-6 space-y-6">
                <div className="text-center">
                    <div
                        className="mx-auto w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: theme.lightYellow }}
                    >
                        <MessageSquare className="w-6 h-6" style={{ color: theme.buttonColor }} />
                    </div>
                    <h2 className="mt-4 text-xl font-semibold">OTP Verification</h2>
                    <p className="mt-2 text-gray-600">Enter the OTP sent to your Aadhaar-linked mobile</p>
                </div>

                <div>
                    <input
                        type="text"
                        value={otp}
                        onChange={handleOtpChange}
                        placeholder="······"
                        className="w-full px-4 py-2 text-center text-2xl tracking-widest border rounded-lg outline-none"
                        maxLength={6}
                        style={{
                            borderColor: theme.borderYellow,
                            "--tw-ring-color": theme.buttonColor,
                        }}
                    />
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-gray-600">Did not receive OTP?</span>
                    <button
                        style={{ color: theme.buttonColor }}
                        className="hover:opacity-80"
                        onClick={() => {
                            setIsResendingOtp(true);
                            generateOtp();
                        }}
                    >
                        Resend OTP
                    </button>
                </div>

                <Alert
                    className="border rounded-xl"
                    style={{ backgroundColor: theme.lightYellow, borderColor: theme.borderYellow }}
                >
                    <Info className="w-4 h-4" style={{ color: theme.buttonColor }} />
                    <AlertDescription>
                        <div className="ml-2">
                            <p className="font-medium">Important:</p>
                            <ul className="mt-2 space-y-1 text-sm">
                                <li>OTP is valid for 10 minutes</li>
                                <li>Make sure to check your SMS inbox</li>
                                <li>Do not share OTP with anyone</li>
                            </ul>
                        </div>
                    </AlertDescription>
                </Alert>
            </CardContent>
        </Card>
    );
// Updated SelfieStep component
const SelfieStep = () => (
  <Card>
      <CardContent className="p-6 space-y-6">
          <div className="mx-auto w-64 h-64 border-2 border-dashed rounded-xl overflow-hidden relative"
              style={{
                  borderColor: theme.buttonColor,
                  backgroundColor: selfieImage ? "transparent" : theme.lightYellow,
              }}>
              {!selfieImage && (
                  <div className="relative w-full h-full">
                      <video 
                          ref={videoRef}
                          autoPlay 
                          playsInline 
                          className="w-full h-full object-cover rounded-xl"
                          style={{ transform: 'scaleX(-1)' }} // Mirror effect
                      />
                      <button
                          onClick={takeSelfie}
                          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full text-white"
                          style={{ backgroundColor: theme.buttonColor }}
                      >
                          Capture
                      </button>
                  </div>
              )}
              {selfieImage && (
                  <img 
                      src={selfieImage} 
                      alt="Selfie" 
                      className="w-full h-full object-cover rounded-xl"
                      style={{ transform: 'scaleX(-1)' }} // Keep consistent with video
                  />
              )}
          </div>

          <Alert
              className="border rounded-xl"
              style={{ backgroundColor: theme.lightYellow, borderColor: theme.borderYellow }}
          >
              <Info className="w-4 h-4" style={{ color: theme.buttonColor }} />
              <AlertDescription>
                  <div className="ml-2">
                      <p className="font-medium">Selfie Guidelines:</p>
                      <ul className="mt-2 space-y-1 text-sm">
                          <li>Ensure good lighting</li>
                          <li>Look directly at the camera</li>
                          <li>Keep a neutral expression</li>
                          <li>Remove any face coverings</li>
                      </ul>
                  </div>
              </AlertDescription>
          </Alert>

          {selfieImage && (
              <button
                  onClick={() => {
                      setSelfieImage(null);
                      startCamera();
                  }}
                  style={{ color: theme.buttonColor }}
                  className="w-full hover:opacity-80"
              >
                  Retake Selfie
              </button>
          )}
      </CardContent>
  </Card>
);

    const stepComponents = [<PrerequisitesStep />, <AadhaarStep />, <OtpStep />, <SelfieStep />];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-2xl mx-auto p-6">
                {/* Header */}
                <div className="flex items-center mb-6">
                    <button onClick={handleBack} className="p-2 hover:bg-gray-100 rounded-full">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-xl font-semibold text-center flex-1">DigiLocker Verification</h1>
                </div>

                {/* Step Indicator */}
                <div className="mb-8 relative">
                    <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200">
                        <div
                            className="h-full transition-all duration-300"
                            style={{
                                width: `${(currentStep / (steps.length - 1)) * 100}%`,
                                backgroundColor: theme.buttonColor,
                            }}
                        />
                    </div>

                    <div className="relative flex justify-between">
                        {steps.map((step, idx) => (
                            <div key={idx} className="flex flex-col items-center">
                                <div
                                    className={`
                  w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300
                  ${idx <= currentStep ? "text-white" : "bg-white text-gray-400 border-2 border-gray-200"}
                `}
                                    style={{
                                        backgroundColor: idx <= currentStep ? theme.buttonColor : "white",
                                    }}
                                >
                                    {idx < currentStep ? <CheckCircle2 className="w-5 h-5" /> : <span>{idx + 1}</span>}
                                </div>
                                <span
                                    className={`
                  mt-2 text-sm font-medium
                  ${idx === currentStep ? "text-yellow-600" : "text-gray-500"}
                `}
                                    style={{
                                        color: idx === currentStep ? theme.buttonColor : undefined,
                                    }}
                                >
                                    {step}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Current Step Content */}
                <div className="mb-8">{stepComponents[currentStep]}</div>

                {/* Action Button */}
                <button
                    onClick={handleNext}
                    disabled={isLoading || (currentStep === 0 && !hasPrerequisites)}
                    className={`
            w-full py-3 px-4 rounded-xl font-medium text-white transition-colors duration-300
            ${isLoading || (currentStep === 0 && !hasPrerequisites) ? "bg-gray-400" : "hover:opacity-90"}
          `}
                    style={{
                        backgroundColor:
                            isLoading || (currentStep === 0 && !hasPrerequisites) ? undefined : theme.buttonColor,
                    }}
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : (
                        getButtonText()
                    )}
                </button>
            </div>
        </div>
    );
};

export default DigiLockerVerification;
