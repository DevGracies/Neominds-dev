"use client";

import { useState } from "react";
import { motion } from "framer-motion";


function PersonalInfo() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Personal Information</h2>

      <div className="grid grid-cols-2 gap-4">
        <input className="input" placeholder="Surname" />
        <input className="input" placeholder="First Name" />
        <input className="input" placeholder="Last Name" />
        <input className="input" type="date" />
      </div>

      <input className="input" placeholder="Address" />

      <div className="grid grid-cols-2 gap-4">
        <input className="input" placeholder="Phone Number" />
        <input className="input" placeholder="Alternative Number" />
      </div>

      <input className="input" placeholder="Email Address" />

      {/* Upload */}
      <div className="border-2 border-dashed p-6 rounded-xl text-center cursor-pointer hover:bg-gray-50">
        <p className="text-gray-500">Drag & drop passport photograph</p>
      </div>
    </div>
  );
}

function Identification({ married, setMarried }: any) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Identification</h2>

      <select className="input">
        <option>Driver’s License</option>
        <option>International Passport</option>
        <option>National ID</option>
        <option>Voter’s Card</option>
      </select>

      <input className="input" placeholder="ID Number" />
      <input className="input" type="date" />

      {/* Marital */}
      <h2 className="text-lg font-semibold mt-6">Marital Status</h2>

      <div className="flex gap-4">
        <button
          onClick={() => setMarried(false)}
          className={`px-4 py-2 rounded-lg ${
            !married ? "bg-secondary text-white" : "border"
          }`}
        >
          Single
        </button>

        <button
          onClick={() => setMarried(true)}
          className={`px-4 py-2 rounded-lg ${
            married ? "bg-secondary text-white" : "border"
          }`}
        >
          Married
        </button>
      </div>

      {/* Conditional */}
      {married && (
        <div className="grid grid-cols-2 gap-4">
          <input className="input" placeholder="Spouse Name" />
          <input className="input" placeholder="Spouse Employer" />
          <input className="input" placeholder="Spouse Phone Number" />
        </div>
      )}
    </div>
  );
}

function Education() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Education</h2>

      <select className="input">
        <option>MSc</option>
        <option>BSc</option>
        <option>HND</option>
        <option>OND</option>
        <option>SSCE</option>
      </select>

      <input className="input" placeholder="School Name" />
      <input className="input" placeholder="Graduation Year" />
      <input className="input" placeholder="Class of Degree" />
    </div>
  );
}

function Financial() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Financial Info</h2>

      <input className="input" placeholder="Bank Name" />
      <input className="input" placeholder="Account Number" />
      <input className="input" placeholder="Account Name" />

      <h2 className="text-lg font-semibold mt-6">Next of Kin</h2>

      <input className="input" placeholder="Name" />
      <input className="input" placeholder="Address" />
      <input className="input" placeholder="Telephone" />
      <input className="input" placeholder="Relationship" />
    </div>
  );
}

function Guarantor() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Guarantor</h2>

      <div className="border-2 border-dashed p-6 rounded-xl text-center">
        Upload Guarantor Form
      </div>

      <div className="bg-green-50 p-4 rounded-lg text-green-600">
        Review all information before submitting
      </div>
    </div>
  );
}

export default function StaffForm() {
  const [step, setStep] = useState(1);
  const [married, setMarried] = useState(false);

  const next = () => setStep((s) => Math.min(s + 1, 5));
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <div className="bg-white p-8 rounded-2xl shadow-soft">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Add New Staff</h1>
        <p className="text-gray-500 text-sm">
          Fill in the employee details carefully
        </p>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-2 bg-secondary rounded-full transition-all"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* Animated Steps */}
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
        className="space-y-6"
      >
        {step === 1 && <PersonalInfo />}
        {step === 2 && <Identification married={married} setMarried={setMarried} />}
        {step === 3 && <Education />}
        {step === 4 && <Financial />}
        {step === 5 && <Guarantor />}
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between mt-10">
        <button
          onClick={prev}
          className="px-4 py-2 rounded-lg border"
        >
          Back
        </button>

        {step < 5 ? (
          <button
            onClick={next}
            className="bg-secondary text-white px-6 py-2 rounded-lg"
          >
            Next
          </button>
        ) : (
          <button className="bg-primary text-white px-6 py-2 rounded-lg">
            Submit
          </button>
        )}
      </div>
    </div>
  );
}

