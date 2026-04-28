// components/ui/FormPrimitives.tsx
import { motion, AnimatePresence } from 'framer-motion';

export const SectionCard = ({ title, icon: Icon, children, id }: any) => (
  <section id={id} className="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 mb-8">
    <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
      <div className="p-2 bg-teal-50 text-teal-600 rounded-lg">
        <Icon size={20} />
      </div>
      <h2 className="text-xl font-bold text-[#0B1F3B]">{title}</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {children}
    </div>
  </section>
);

export const InputField = ({ label, placeholder, type = "text", ...props }: any) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-semibold text-slate-700 ml-1">{label}</label>
    <input 
      type={type}
      placeholder={placeholder}
      className="px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all duration-200 placeholder:text-slate-400"
      {...props}
    />
  </div>
);