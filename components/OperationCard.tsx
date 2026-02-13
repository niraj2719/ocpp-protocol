
import React from 'react';
import { Operation, Message } from '../types';

interface Props {
  operation: Operation;
  messages: Message[];
}

export const OperationCard: React.FC<Props> = ({ operation, messages }) => {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-500">
      <div className="bg-white border-b border-slate-50 px-8 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className={`w-14 h-14 ${operation.initiator === 'Charge Point' ? 'bg-amber-500' : 'bg-indigo-600'} text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100`}>
              <i className={`fas ${operation.initiator === 'Charge Point' ? 'fa-charging-station' : 'fa-server'} text-xl`}></i>
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
              <i className={`fas ${operation.initiator === 'Charge Point' ? 'fa-arrow-right text-amber-500' : 'fa-arrow-left text-indigo-600'} text-[10px]`}></i>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">{operation.title}</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mt-1">
              <span className="text-indigo-600">{operation.profile}</span>
              <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
              <span>Initiated by {operation.initiator}</span>
            </p>
          </div>
        </div>
      </div>
      
      <div className="p-8">
        <div className="mb-10 text-slate-600 text-lg leading-relaxed border-l-4 border-slate-200 pl-6 py-1 font-medium">
          {operation.description}
        </div>

        <div className="grid grid-cols-1 gap-10">
          {messages.map((msg, msgIdx) => (
            <div key={msg.id} className="relative group">
              {msgIdx < messages.length - 1 && (
                <div className="absolute left-7 top-16 bottom-0 w-0.5 border-l-2 border-dashed border-slate-100 hidden md:block"></div>
              )}
              
              <div className="bg-slate-50/40 rounded-3xl p-7 border border-slate-100 group-hover:bg-white group-hover:border-indigo-100 group-hover:shadow-lg transition-all duration-400">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${msg.type === 'Request' ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600'}`}>
                      <i className={`fas ${msg.type === 'Request' ? 'fa-paper-plane' : 'fa-check-double'} text-sm`}></i>
                    </div>
                    <div>
                      <h4 className="font-mono font-black text-slate-800 tracking-tighter text-lg">{msg.name}</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{msg.type} Message</p>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-slate-500 mb-6 font-medium bg-white/50 p-3 rounded-xl border border-slate-50">{msg.description}</p>
                
                {msg.fields.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-200">
                          <th className="pb-4 pr-4">Property</th>
                          <th className="pb-4 pr-4">Type</th>
                          <th className="pb-4 pr-4 text-center">Card.</th>
                          <th className="pb-4">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {msg.fields.map((field, idx) => (
                          <tr key={idx} className="group/row">
                            <td className="py-5 pr-4 align-top">
                              <span className="font-mono text-xs font-bold text-indigo-600 px-2 py-1 bg-indigo-50/50 rounded-lg group-hover/row:bg-indigo-600 group-hover/row:text-white transition-colors">{field.name}</span>
                            </td>
                            <td className="py-5 pr-4 align-top">
                              <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">{field.type}</span>
                            </td>
                            <td className="py-5 pr-4 align-top text-center">
                              <span className="text-[10px] font-mono font-bold text-slate-400">{field.cardinality}</span>
                            </td>
                            <td className="py-5 align-top">
                              <p className="text-xs text-slate-600 leading-relaxed font-semibold">{field.description}</p>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="bg-slate-100/50 rounded-2xl p-6 text-center border-2 border-dashed border-slate-200">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Standard Header Only (Empty Body)</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
