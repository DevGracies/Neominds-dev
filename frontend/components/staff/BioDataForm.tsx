// components/staff/BioDataForm.tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = ["Personal", "Identification", "Education", "Financial", "Guarantor"];

export function BioDataForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [maritalStatus, setMaritalStatus] = useState("single");

  return (
    <div className="bg-white rounded-2xl shadow-premium border border-gray-100 overflow-hidden">
      {/* Progress Header */}
      <div className="flex border-b border-gray-100 bg-gray-50/50">
        {steps.map((step, idx) => (
          <div 
            key={step}
            className={`flex-1 py-4 px-6 text-sm font-medium transition-colors ${
              idx === currentStep ? "text-brand-teal border-b-2 border-brand-teal bg-white" : "text-gray-400"
            }`}
          >
            0{idx + 1}. {step}
          </div>
        ))}
      </div>

      <div className="p-10">
        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <motion.div 
              initial={{ opacity: 0, x: 10 }} 
              animate={{ opacity: 1, x: 0 }} 
              className="grid grid-cols-2 gap-8"
            >
              {/* Passport Upload */}
              <div className="col-span-2 flex items-center gap-6 mb-4">
                <div className="w-24 h-24 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:border-brand-teal cursor-pointer transition-all">
                  <span className="text-xs">Photo</span>
                </div>
                <div>
                  <h4 className="font-semibold text-brand-navy">Profile Photograph</h4>
                  <p className="text-sm text-gray-500">PNG or JPG up to 5MB</p>
                </div>
              </div>

              <InputField label="Surname" placeholder="Enter surname" />
              <InputField label="First Name" placeholder="Enter first name" />
              
              <div className="col-span-1">
                <label className="block text-sm font-semibold text-brand-navy mb-2">Marital Status</label>
                <select 
                  onChange={(e) => setMaritalStatus(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-teal/20 outline-none"
                >
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                </select>
              </div>

              {/* Conditional Spouse Fields */}
              {maritalStatus === "married" && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="col-span-2 grid grid-cols-2 gap-8 pt-4 border-t border-gray-50"
                >
                  <InputField label="Spouse Name" />
                  <InputField label="Spouse Employer" />
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-12 flex justify-between">
          <button 
            disabled={currentStep === 0}
            onClick={() => setCurrentStep(prev => prev - 1)}
            className="px-6 py-2.5 text-gray-600 font-medium hover:bg-gray-50 rounded-lg transition-all"
          >
            Back
          </button>
          <button 
            onClick={() => setCurrentStep(prev => prev + 1)}
            className="px-8 py-2.5 bg-brand-navy font-medium rounded-lg hover:bg-brand-navy/90 shadow-lg shadow-brand-navy/20 transition-all"
          >
            Save & Next
          </button>
        </div>
      </div>
    </div>
  );
}

const InputField = ({ label, placeholder }: { label: string, placeholder?: string }) => (
  <div className="space-y-1.5">
    <label className="text-sm font-semibold text-brand-navy">{label}</label>
    <input 
      type="text" 
      placeholder={placeholder}
      className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50/30 focus:bg-white focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal outline-none transition-all" 
    />
  </div>
);