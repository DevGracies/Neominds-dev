// app/register/page.tsx
"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { 
  User, ShieldCheck, Phone, Heart, GraduationCap, 
  Wallet, Users, CloudUpload, CheckCircle2, Loader2 ,BookUser,
  Contact,
} from 'lucide-react';
import { SectionCard, InputField } from '@/components/ui/FormPrimitives';
import { registerStaff } from '@/services/staff.service';
import { toast, Toaster } from 'react-hot-toast';
import { json } from 'stream/consumers';

const SECTIONS = [
  { id: 'personal', label: 'Personal', icon: User },
  { id: 'id', label: 'Identification', icon: ShieldCheck },
  { id: 'contact', label: 'Contact', icon: Phone },
  { id: 'marital', label: 'Marital', icon: Heart },
  { id: 'edu', label: 'Education', icon: GraduationCap },
  { id: 'finance', label: 'Financial', icon: Wallet },
  { id: 'nok', label: 'Next of Kin', icon: Users },
  { id: 'guarantor', label: 'Guarantor', icon: CloudUpload },
];

export default function StaffRegistration() {
  const passportInputRef = useRef<HTMLInputElement>(null);
  const guarantorInputRef = useRef<HTMLInputElement>(null);

  const [maritalStatus, setMaritalStatus] = useState('single');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const [form, setForm] = useState({
    surname: '', firstName: '', lastName: '', address: '', dateOfBirth: '',
    idType: 'International Passport', idNumber: '', issueDate: '',
    email: '', phoneNumber: '', alternativeNumber: '',
    maritalStatus: 'Single',
    spouseName: '', spousePhone: '', spouseEmployer: '',
    qualification: 'BSc', schoolName: '', graduationYear: '', degreeClass: '',
    bankName: '', accountNumber: '', accountName: '',
    nextOfKinName: '', nextOfKinAddress: '', nextOfKinPhone: '', relationship: ''
  });

  const [files, setFiles] = useState<{ passportPhoto: File | null; guarantorForm: File | null }>({
    passportPhoto: null,
    guarantorForm: null
  });

  const qualifications = [
  { value: "SSCE", label: "SSCE (Senior Secondary School Certificate)" },
  { value: "OND", label: "OND (Ordinary National Diploma)" },
  { value: "HND", label: "HND (Higher National Diploma)" },

  { value: "BSc", label: "BSc (Bachelor of Science)" },
  { value: "BA", label: "BA (Bachelor of Arts)" },
  { value: "BEng", label: "BEng (Bachelor of Engineering)" },
  { value: "BTech", label: "B.Tech (Bachelor of Technology)" },

  { value: "MSc", label: "MSc (Master of Science)" },
  { value: "MA", label: "MA (Master of Arts)" },
  { value: "MBA", label: "MBA (Master of Business Administration)" },

  { value: "PhD", label: "PhD (Doctor of Philosophy)" },
];
  const [previews, setPreviews] = useState({ passport: '', guarantor: '' });

  // --- Handlers ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
const handleMarried=()=>{
  setMaritalStatus('Married')
  form.maritalStatus='Married'
  console.log(form)
  
}
 const handleFileChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  type: string
) => {
  const file = e.target.files?.[0];

  if (file) {
    if (type === "passport") {
      setFiles((prev) => ({ ...prev, passportPhoto: file }));
    } else if (type === "id") {
      setFiles((prev) => ({ ...prev, idCard: file }));
    }
  }
};

  const handleSubmit = async () => {
    // if (!form.email || !form.surname || !files.passportPhoto) {
    //   toast.error("Please fill in required fields and upload your passport.");
    //   return;
    // }

    setIsSubmitting(true);
    const formData = new FormData();

    // Append text fields (exactly matching the Backend Zod/Mongoose schema)
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    console.log(form)
    
    // Append Files
    if (files.passportPhoto) formData.append('passportPhoto', files.passportPhoto);
    if (files.guarantorForm) formData.append('guarantorForm', files.guarantorForm);

    console.log(form)
    try {
      await registerStaff(formData);
      toast.success("Registration Successful! Welcome to the team.");
      // Optional: Reset form or redirect
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">
      <Toaster position="top-right" />
      {/* Top Progress Bar */}
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-1.5 bg-teal-500 origin-left z-50" />

      <main className="max-w-6xl mx-auto px-6 py-12 flex gap-12">
        
        {/* Left: Sticky Navigation */}
        <nav className="hidden lg:block w-64 h-fit sticky top-12 space-y-2">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[#0B1F3B]">Staff Portal</h1>
            <p className="text-slate-500 text-sm">Onboarding Experience</p>
          </div>
          {SECTIONS.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white hover:shadow-sm text-slate-500 hover:text-teal-600 transition-all group">
              <s.icon size={18} className="group-hover:scale-110 transition-transform" />
              <span className="font-medium">{s.label}</span>
            </a>
          ))}
        </nav>

        {/* Right: Form Content */}
        <div className="flex-1 max-w-3xl">
          
          {/* Section: Personal Info */}
          <SectionCard title="Personal Information" icon={User} id="personal">
            <InputField label="First Name" name="firstName" placeholder="Enter first name" onChange={handleInputChange} value={form.firstName} />
            <InputField label="last Name" name="lastName" placeholder="Enter last name" onChange={handleInputChange} value={form.lastName} />
            <InputField label="surName" name="surname" placeholder="Enter sur name" onChange={handleInputChange} value={form.surname} />
            
            <InputField label="Date of birth" name="dateOfBirth" type="date" placeholder="Enter your date of birth" onChange={handleInputChange} value={form.dateOfBirth} />
            <div className="md:col-span-2">
            <InputField label="Address" name="address" placeholder="Enter address" onChange={handleInputChange} value={form.address} />
            
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-slate-700 block mb-2">Passport Photograph</label>
              <input 
                type="file" className="hidden" ref={passportInputRef} 
                 onChange={(e) => handleFileChange(e, 'passport')} 
                 accept="image/*" 
               />
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-teal-50/30 hover:border-teal-200 transition-colors cursor-pointer group" onClick={() => passportInputRef.current?.click()}>
                  {previews.passport ? (
                  <img src={previews.passport} alt="Preview" className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg" />
                 ) : (
                   <CloudUpload className="text-teal-600" />
                 )}
                <p className="mt-3 text-sm text-slate-600">Drag and drop or <span className="text-teal-600 font-bold">browse</span></p>
                <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 5MB</p>
              </div>
            </div>
          </SectionCard>

          {/* section: contact */}
          <SectionCard title="contact" icon={Contact} id="contact">
            <InputField label="Phone Number" type="number" onChange={handleInputChange} name="phoneNumber" placeholder="enter phone number" />
            <InputField label="alternative Number" type="number" onChange={handleInputChange} name="alternativeNumber" placeholder="enter alt phone number" />
            <div className="md:col-span-2">
               <InputField label="email" type="email" onChange={handleInputChange} name="email" placeholder="enter your email address" />
            </div>
          </SectionCard>

          {/* Section: Identification */}
          <SectionCard title="Identification" icon={ShieldCheck} id="id">
            <div className="flex flex-col ">
              <label className="text-sm font-semibold text-slate-700  mb-[0.45rem]">Means of ID</label>
              <select name="idType" onChange={handleInputChange}  className="px-4 py-[0.8rem]  rounded-xl border border-slate-200 bg-white outline-none focus:border-teal-500">
                <option value={"International Passport"}>International Passport</option>
                <option value={"National ID Card (NIN)"}>National ID Card (NIN)</option>
                <option value={"Driver's License"}>Driver's License</option>
              </select>
            </div>
            <InputField label="ID Number" name="idNumber" onChange={handleInputChange} placeholder="Ex: A00123456" />
               <div className="md:col-span-2">
                <InputField label="issue date" name="issueDate" type="date" placeholder="Enter the issued date" onChange={handleInputChange} value={form.issueDate} />
            </div>   
          </SectionCard>

          {/* Section: Marital Status (Conditional Logic) */}
          <SectionCard title="Marital Information" icon={Heart} id="marital">
            <div className="md:col-span-2 flex p-1 bg-slate-100 rounded-xl w-fit">
              <button 
                onClick={() => setMaritalStatus('Single')}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${maritalStatus === 'Single' ? 'bg-white shadow-sm text-teal-600' : 'text-slate-500'}`}
              >Single</button>
              <button 
                onClick={handleMarried}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${maritalStatus === 'Married' ? 'bg-white shadow-sm text-teal-600' : 'text-slate-500'}`}
              >Married</button>
            </div>
            
            {maritalStatus === 'Married' && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }}
                className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 pt-6 border-t border-slate-100"
              >
                <InputField label="Spouse Name"  onChange={handleInputChange} name="spouseName" placeholder="Full legal name" />
                <InputField label="Spouse Telephone"  onChange={handleInputChange} name="spousePhone" placeholder="+234..." />
                <div className="md:col-span-2">
                  <InputField label="Spouse Employer"  onChange={handleInputChange} name="spouseEmployer" placeholder="Company name" />
                </div>
              </motion.div>
            )}
          </SectionCard>
            {/* Section: Qualification */}
            
          <SectionCard title="Education" icon={GraduationCap} id="edu">
            <div className="flex flex-col ">
            <label className="text-sm font-semibold text-slate-700 ml-1 mb-[0.45rem]">Degree</label>

            <select
              name="qualification"
              onChange={handleInputChange}
              className="px-4 py-[0.8rem] rounded-xl border border-slate-200 bg-white outline-none focus:border-teal-500"
            >
              <option value="">Select Qualification</option>

              {qualifications.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
           
            <InputField label="School Name" name="schoolName" placeholder="Enter name of institution" onChange={handleInputChange} value={form.schoolName} />
            <InputField
            label="Year of Graduation" 
            name="graduationYear"
              type="number"
              value={form.graduationYear} 
              min="1900"
              max={new Date().getFullYear()}
              step="1"
              placeholder="Enter year (e.g. 2024)"
              onChange={handleInputChange}
            />
            <div className="flex flex-col ">
            <label className="text-sm font-semibold text-slate-700 mb-[0.45rem]">Degree Class</label>

            <select
              name="degreeClass"
              onChange={handleInputChange}
              className="px-4 py-[0.8rem]  rounded-xl border border-slate-200 bg-white outline-none focus:border-teal-500"
            >
              <option value="">Select Degree Class</option>

              <option value="First Class">First Class Honours</option>
              <option value="Second Class Upper">Second Class Upper (2:1)</option>
              <option value="Second Class Lower">Second Class Lower (2:2)</option>
              <option value="Third Class">Third Class</option>
              <option value="Pass">Pass</option>

              <option value="Distinction">Distinction (for HND/NCE where applicable)</option>
              <option value="Merit">Merit</option>
            </select>
            </div>
          </SectionCard>
          {/* Financial Section */}
          <SectionCard title="Financial Details" icon={Wallet} id="finance">
            <InputField label="Bank Name"  onChange={handleInputChange} name="bankName" placeholder="Select bank" />
            <InputField label="Account Number"  onChange={handleInputChange} name="accountNumber" placeholder="10 digits" />
            <div className="md:col-span-2">
               <InputField label="Account Name"  onChange={handleInputChange} name="accountName" placeholder="Verified account name" />
            </div>
          </SectionCard>
                
          {/* Section: Next of KIn */}
          <SectionCard title="Next of Kin Information" icon={Users} id="nok">
            <InputField label="Name" name="nextOfKinName" placeholder="Enter name of next of kin" onChange={handleInputChange} value={form.nextOfKinName} />
            <InputField label="Relationship" name="relationship" placeholder="Enter relationship" onChange={handleInputChange} value={form.relationship} />
            <InputField label="Address" name="nextOfKinAddress" placeholder="Enter address of next of kin" onChange={handleInputChange} value={form.nextOfKinAddress} />
            <InputField label=" Phone number" name="nextOfKinPhone" type="number" placeholder="Enter phone number of next of kin" onChange={handleInputChange}  />
            {/* <InputField label="Phone Number" type="number" onChange={handleInputChange} name="phoneNumber" placeholder="enter phone number" /> */}
            
            <div className="md:col-span-2">
            
            </div>
          
          </SectionCard>

          {/* Submission Area */}
          <div className="mt-12 p-8 bg-[#0B1F3B] rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white text-xl font-bold">Ready to join?</h3>
              <p className="text-slate-400 text-sm">Please review all information for accuracy.</p>
            </div>
            <button
            disabled={isSubmitting} 
              onClick={handleSubmit}
              className="w-full md:w-auto px-10 py-4 bg-teal-500 hover:bg-teal-400 text-[#0B1F3B] font-bold rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              {isSubmitting ? "Processing..." : "Submit Registration"}
              {!isSubmitting && <CheckCircle2 size={18} />}
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}


// // app/register/page.tsx
// "use client";
// import React, { useState, useRef } from 'react';
// import { motion, useScroll, useSpring } from 'framer-motion';
// import { User, ShieldCheck, Phone, Heart, GraduationCap, Wallet, Users, CloudUpload, CheckCircle2, Loader2 } from 'lucide-react';
// import { SectionCard, InputField } from '@/components/ui/FormPrimitives';
// import { registerStaff } from '@/services/staff.service';
// import { toast, Toaster } from 'react-hot-toast';

// export default function StaffRegistration() {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const passportInputRef = useRef<HTMLInputElement>(null);
//   const guarantorInputRef = useRef<HTMLInputElement>(null);

//   // --- Form State ---
//   const [form, setForm] = useState({
//     surname: '', firstName: '', lastName: '', address: '', dateOfBirth: '',
//     idType: 'International Passport', idNumber: '', issueDate: '',
//     email: '', phoneNumber: '', alternativeNumber: '',
//     maritalStatus: 'Single',
//     spouseName: '', spousePhone: '', spouseEmployer: '',
//     qualification: 'BSc', schoolName: '', graduationYear: '', degreeClass: '',
//     bankName: '', accountNumber: '', accountName: '',
//     nextOfKinName: '', nextOfKinAddress: '', nextOfKinPhone: '', relationship: ''
//   });

//   const [files, setFiles] = useState<{ passportPhoto: File | null; guarantorForm: File | null }>({
//     passportPhoto: null,
//     guarantorForm: null
//   });

//   const [previews, setPreviews] = useState({ passport: '', guarantor: '' });

//   // --- Handlers ---
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, [name]: value }));
//   };

//  const handleFileChange = (
//   e: React.ChangeEvent<HTMLInputElement>,
//   type: string
// ) => {
//   const file = e.target.files?.[0];

//   if (file) {
//     if (type === "passport") {
//       setFiles((prev) => ({ ...prev, passportPhoto: file }));
//     } else if (type === "id") {
//       setFiles((prev) => ({ ...prev, idCard: file }));
//     }
//   }
// };

//   const handleSubmit = async () => {
//     if (!form.email || !form.surname || !files.passportPhoto) {
//       toast.error("Please fill in required fields and upload your passport.");
//       return;
//     }

//     setIsSubmitting(true);
//     const formData = new FormData();

//     // Append text fields (exactly matching the Backend Zod/Mongoose schema)
//     Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    
//     // Append Files
//     if (files.passportPhoto) formData.append('passportPhoto', files.passportPhoto);
//     if (files.guarantorForm) formData.append('guarantorForm', files.guarantorForm);

//     try {
//       await registerStaff(formData);
//       toast.success("Registration Successful! Welcome to the team.");
//       // Optional: Reset form or redirect
//     } catch (err: any) {
//       toast.error(err.message);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#F8FAFC]">
//       <Toaster position="top-right" />
//       {/* ... Navigation and Progress code from previous part ... */}

//       <main className="max-w-6xl mx-auto px-6 py-12 flex gap-12">
//         {/* Navigation Sidebar Hidden for brevity */}
        
//         <div className="flex-1 max-w-3xl">
//           <SectionCard title="Personal Information" icon={User} id="personal">
//             <InputField label="Surname" name="surname" onChange={handleInputChange} value={form.surname} />
//             <InputField label="First Name" name="firstName" onChange={handleInputChange} value={form.firstName} />
            
//             <div className="md:col-span-2">
//               <label className="text-sm font-semibold text-slate-700 block mb-2">Passport Photograph</label>
//               <input 
//                 type="file" className="hidden" ref={passportInputRef} 
//                 onChange={(e) => handleFileChange(e, 'passport')} 
//                 accept="image/*" 
//               />
//               <div 
//                 onClick={() => passportInputRef.current?.click()}
//                 className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-teal-50/30 transition-all cursor-pointer group"
//               >
//                 {previews.passport ? (
//                   <img src={previews.passport} alt="Preview" className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg" />
//                 ) : (
//                   <CloudUpload className="text-teal-600" />
//                 )}
//                 <p className="mt-3 text-sm text-slate-600">Click to upload passport</p>
//               </div>
//             </div>
//           </SectionCard>

//           {/* Marital Status Section with Conditional Sync */}
//           <SectionCard title="Marital Information" icon={Heart} id="marital">
//             <div className="md:col-span-2 flex p-1 bg-slate-100 rounded-xl w-fit">
//               {['Single', 'Married'].map((status) => (
//                 <button 
//                   key={status}
//                   onClick={() => setForm(prev => ({ ...prev, maritalStatus: status }))}
//                   className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${form.maritalStatus === status ? 'bg-white shadow-sm text-teal-600' : 'text-slate-500'}`}
//                 >
//                   {status}
//                 </button>
//               ))}
//             </div>
            
//             {form.maritalStatus === 'Married' && (
//               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
//                 <InputField label="Spouse Name" name="spouseName" onChange={handleInputChange} value={form.spouseName} />
//                 <InputField label="Spouse Telephone" name="spousePhone" onChange={handleInputChange} value={form.spousePhone} />
//               </motion.div>
//             )}
//           </SectionCard>

//           {/* Financial Section */}
//           <SectionCard title="Financial Details" icon={Wallet} id="finance">
//             <InputField label="Bank Name" name="bankName" onChange={handleInputChange} />
//             <InputField label="Account Number" name="accountNumber" onChange={handleInputChange} />
//           </SectionCard>

//           {/* Submit Action */}
//           <div className="mt-12 p-8 bg-[#0B1F3B] rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
//             <div className="text-white">
//               <h3 className="text-xl font-bold">Submit Registration</h3>
//               <p className="text-slate-400 text-sm">Review your data before proceeding.</p>
//             </div>
//             <button 
//               disabled={isSubmitting}
//               onClick={handleSubmit}
//               className={`w-full md:w-auto px-10 py-4 bg-teal-500 text-[#0B1F3B] font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-teal-400 active:scale-95'}`}
//             >
//               {isSubmitting ? <Loader2 className="animate-spin" /> : "Submit Now"}
//               {!isSubmitting && <CheckCircle2 size={18} />}
//             </button>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }