
import React from 'react';
import { Operation, Message } from '../types';

interface Props {
  operation: Operation;
  messages: Message[];
}

export const OperationCard: React.FC<Props> = ({ operation, messages }) => {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="bg-white border-b border-slate-50 px-8 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <i className={`fas ${operation.initiator === 'Charge Point' ? 'fa-arrow-up' : 'fa-arrow-down'} text-lg`}></i>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{operation.title}</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mt-1">
              <span className="text-indigo-600">{operation.profile}</span>
              <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
              <span>{operation.initiator} Initiated</span>
            </p>
          </div>
        </div>
      </div>
      
      <div className="p-8">
        <div className="mb-10 text-slate-600 text-lg leading-relaxed border-l-4 border-indigo-500 pl-6 py-1">
          {operation.description}
        </div>

        <div className="grid grid-cols-1 gap-8">
          {messages.map((msg, msgIdx) => (
            <div key={msg.id} className="relative">
              {/* Connector line for sequence visual */}
              {msgIdx < messages.length - 1 && (
                <div className="absolute left-6 top-14 bottom-0 w-0.5 bg-slate-100 hidden md:block"></div>
              )}
              
              <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-100 group hover:bg-white hover:border-indigo-100 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${msg.type === 'Request' ? 'bg-indigo-100 text-indigo-600' : 'bg-emerald-100 text-emerald-600'}`}>
                      <i className={`fas ${msg.type === 'Request' ? 'fa-share' : 'fa-reply'} text-sm`}></i>
                    </div>
                    <div>
                      <h4 className="font-mono font-black text-slate-800 tracking-tighter">{msg.name}</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{msg.type}</p>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-slate-500 mb-6 font-medium italic">"{msg.description}"</p>
                
                {msg.fields.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-200">
                          <th className="pb-3 pr-4">Property</th>
                          <th className="pb-3 pr-4">Type</th>
                          <th className="pb-3 pr-4 text-center">Card.</th>
                          <th className="pb-3">Definition</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {msg.fields.map((field, idx) => (
                          <tr key={idx} className="group/row">
                            <td className="py-4 pr-4 align-top">
                              <span className="font-mono text-xs font-bold text-indigo-600 group-hover/row:text-indigo-800">{field.name}</span>
                            </td>
                            <td className="py-4 pr-4 align-top">
                              <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">{field.type}</span>
                            </td>
                            <td className="py-4 pr-4 align-top text-center">
                              <span className="text-[10px] font-mono font-bold text-slate-400">{field.cardinality}</span>
                            </td>
                            <td className="py-4 align-top">
                              <p className="text-xs text-slate-600 leading-relaxed font-medium">{field.description}</p>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="bg-slate-200/50 rounded-xl p-4 text-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">No fields (Empty Body)</span>
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
