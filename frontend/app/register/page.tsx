// app/register/page.tsx
"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { 
  User, ShieldCheck, Phone, Heart, GraduationCap, 
  Wallet, Users, CloudUpload, CheckCircle2, Loader2 
} from 'lucide-react';
import { SectionCard, InputField } from '@/components/ui/FormPrimitives';
import { registerStaff } from '@/services/staff.service';
import { toast, Toaster } from 'react-hot-toast';

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

  const [previews, setPreviews] = useState({ passport: '', guarantor: '' });

  // --- Handlers ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

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
    if (!form.email || !form.surname || !files.passportPhoto) {
      toast.error("Please fill in required fields and upload your passport.");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();

    // Append text fields (exactly matching the Backend Zod/Mongoose schema)
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    
    // Append Files
    if (files.passportPhoto) formData.append('passportPhoto', files.passportPhoto);
    if (files.guarantorForm) formData.append('guarantorForm', files.guarantorForm);

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
    <div className="p-8 max-w-7xl mx-auto space-y-8 font-sans">
      <Toaster position="top-right" />
      {/* Top Progress Bar */}
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-1.5 bg-brand-accent origin-left z-50" />

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-brand-primary">Staff Registration</h1>
          <p className="text-slate-500 mt-1">Onboarding Experience</p>
        </div>
      </div>

      <main className="flex gap-12">
        
        {/* Left: Sticky Navigation */}
        <nav className="hidden lg:block w-64 h-fit sticky top-12 space-y-2">
          {SECTIONS.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white hover:shadow-sm text-slate-500 hover:text-brand-accent transition-all group">
              <s.icon size={18} className="group-hover:scale-110 transition-transform" />
              <span className="font-medium">{s.label}</span>
            </a>
          ))}
        </nav>

        {/* Right: Form Content */}
        <div className="flex-1 max-w-3xl">
          
          {/* Section: Personal Info */}
          <SectionCard title="Personal Information" icon={User} id="personal">
            <InputField label="Surname" placeholder="Enter surname" onChange={handleInputChange} value={form.surname} />
            <InputField label="First Name" placeholder="Enter first name" onChange={handleInputChange} value={form.firstName} />
            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-slate-700 block mb-2">Passport Photograph</label>
              <input 
                type="file" className="hidden" ref={passportInputRef} 
                 onChange={(e) => handleFileChange(e, 'passport')} 
                 accept="image/*" 
               />
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-100 hover:border-brand-accent transition-colors cursor-pointer group" onClick={() => passportInputRef.current?.click()}>
                  {previews.passport ? (
                  <img src={previews.passport} alt="Preview" className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg" />
                 ) : (
                   <CloudUpload className="text-brand-accent" />
                 )}
                <p className="mt-3 text-sm text-slate-600">Drag and drop or <span className="text-brand-accent font-bold">browse</span></p>
                <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 5MB</p>
              </div>
            </div>
          </SectionCard>

          {/* Section: Identification */}
          <SectionCard title="Identification" icon={ShieldCheck} id="id">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700">Means of ID</label>
              <select className="px-4 py-3 rounded-xl border border-slate-200 bg-white outline-none focus:border-brand-accent">
                <option>International Passport</option>
                <option>National ID Card (NIN)</option>
                <option>Driver's License</option>
              </select>
            </div>
            <InputField label="ID Number" placeholder="Ex: A00123456" />
          </SectionCard>

          {/* Section: Marital Status (Conditional Logic) */}
          <SectionCard title="Marital Information" icon={Heart} id="marital">
            <div className="md:col-span-2 flex p-1 bg-slate-100 rounded-xl w-fit">
              <button 
                onClick={() => setMaritalStatus('single')}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${maritalStatus === 'single' ? 'bg-white shadow-sm text-brand-accent' : 'text-slate-500'}`}
              >Single</button>
              <button 
                onClick={() => setMaritalStatus('married')}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${maritalStatus === 'married' ? 'bg-white shadow-sm text-brand-accent' : 'text-slate-500'}`}
              >Married</button>
            </div>
            
            {maritalStatus === 'married' && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }}
                className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 pt-6 border-t border-slate-100"
              >
                <InputField label="Spouse Name" placeholder="Full legal name" />
                <InputField label="Spouse Telephone" placeholder="+234..." />
                <div className="md:col-span-2">
                  <InputField label="Spouse Employer" placeholder="Company name" />
                </div>
              </motion.div>
            )}
          </SectionCard>

          {/* Financial Section */}
          <SectionCard title="Financial Details" icon={Wallet} id="finance">
            <InputField label="Bank Name" placeholder="Select bank" />
            <InputField label="Account Number" placeholder="10 digits" />
            <div className="md:col-span-2">
               <InputField label="Account Name" placeholder="Verified account name" />
            </div>
          </SectionCard>

          {/* Submission Area */}
          <div className="mt-12 p-8 bg-brand-primary rounded-3xl shadow-soft border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white text-xl font-bold">Ready to join?</h3>
              <p className="text-slate-300 text-sm">Please review all information for accuracy.</p>
            </div>
            <button
            disabled={isSubmitting} 
              onClick={() => setIsSubmitting(true)}
              className="w-full md:w-auto px-10 py-4 bg-brand-accent hover:bg-teal-500 text-white font-bold rounded-xl shadow-soft transition-all active:scale-95 flex items-center justify-center gap-2"
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