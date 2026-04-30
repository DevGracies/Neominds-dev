import { Briefcase, UserCircle } from 'lucide-react'

function ReassignRole() {
  return (
    <div>
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Briefcase size={20} className="text-brand-accent" /> Reassign Staff Role
                  </h3>
                  
                  <form className="space-y-5">
                    <div className="grid grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">New Job Title</label>
                        <select className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:border-brand-accent">
                          <option>Select new role...</option>
                          <option>Branch Head</option>
                          <option>F & B Manager</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">New Branch</label>
                        <select className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:border-brand-accent">
                          <option>Select branch...</option>
                          <option>Abuja - Wuse</option>
                          <option>Lagos - Victoria Island</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Effective Date</label>
                      <input type="date" className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:border-brand-accent" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Reason for Reassignment</label>
                      <textarea 
                        rows={4} 
                        className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:border-brand-accent resize-none"
                        placeholder="Provide detailed context for this change..."
                      ></textarea>
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                      <button type="button" className="px-5 py-2.5 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl font-medium transition">
                        Cancel
                      </button>
                      <button type="submit" className="px-5 py-2.5 bg-brand-primary text-white rounded-xl font-medium shadow-soft hover:bg-blue-900 transition flex items-center gap-2">
                        <UserCircle size={18} /> Update Assignment
                      </button>
                    </div>
                  </form>
    </div>
  )
}

export default ReassignRole